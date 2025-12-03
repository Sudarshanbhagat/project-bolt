require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ensure uploads folders exist
const uploadsPath = path.join(__dirname, 'uploads');
const certificatesPath = path.join(uploadsPath, 'certificates');
if (!fs.existsSync(uploadsPath)) fs.mkdirSync(uploadsPath);
if (!fs.existsSync(certificatesPath)) fs.mkdirSync(certificatesPath);
const certificatesJsonPath = path.join(certificatesPath, 'certificates.json');
if (!fs.existsSync(certificatesJsonPath)) fs.writeFileSync(certificatesJsonPath, JSON.stringify([]));

// serve uploads statically
app.use('/uploads', express.static(uploadsPath));

// multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (req.url.includes('/api/profile')) cb(null, uploadsPath);
    else cb(null, certificatesPath);
  },
  filename: function (req, file, cb) {
    if (req.url.includes('/api/profile')) {
      // always save as profile.jpg (or keep original extension)
      const ext = path.extname(file.originalname) || '.jpg';
      cb(null, `profile${ext}`);
    } else {
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e6)}${path.extname(file.originalname)}`;
      cb(null, unique);
    }
  },
});
const upload = multer({ storage });

// Environment variables expected:
// CONTACT_EMAIL - email that receives messages
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS - SMTP configuration

function createTransporter() {
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_PORT ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS
  ) {
    console.warn('SMTP configuration missing, falling back to Ethereal test account');
    return nodemailer.createTestAccount().then((testAccount) => {
      return nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return Promise.resolve(transporter);
}

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const transporter = await createTransporter();
    const toAddress = process.env.CONTACT_EMAIL || process.env.SMTP_USER;
    const info = await transporter.sendMail({
      from: `${name} <${email}>`,
      to: toAddress,
      subject: `Portfolio contact form: ${name}`,
      text: message,
      html: `<p>${message}</p><p>From: ${name} &lt;${email}&gt;</p>`,
    });

    let previewURL;
    if (nodemailer.getTestMessageUrl) {
      previewURL = nodemailer.getTestMessageUrl(info);
    }

    res.json({ ok: true, previewURL });
  } catch (err) {
    console.error('Failed to send email:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// upload profile (single file)
app.post('/api/profile', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const url = `/uploads/${req.file.filename}`;
  return res.json({ ok: true, url });
});

// upload certificate
app.post('/api/certificates', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const url = `/uploads/certificates/${req.file.filename}`;
  return res.json({ ok: true, url, filename: req.file.filename });
});

// add external certificate links (POST body: { urls: [string], filename?: string })
app.post('/api/certificates/external', (req, res) => {
  // Accept either { urls: ['url1','url2'] } or { entries: [{url:'', title:'', issuer:'', year:'', description:''}] }
  let urls = [];
  let entries = [];
  if (Array.isArray(req.body.urls)) urls = req.body.urls;
  if (Array.isArray(req.body.entries)) entries = req.body.entries;
  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    return res.status(400).json({ error: 'No URLs provided' });
  }

  try {
    const existing = JSON.parse(fs.readFileSync(certificatesJsonPath, 'utf8') || '[]');
    let added = [];
    for (let u of urls) {
      if (typeof u !== 'string') continue;
      u = u.trim();
      if (!u) continue;
      // avoid duplicates by URL
      if (existing.some((e) => e.url === u)) continue;
      const urlObj = new URL(u);
      const queryId = urlObj.searchParams.get('id');
      let filename = queryId ? `gdrive-${queryId}` : path.basename(urlObj.pathname) || `external-${Date.now()}`;
      const entry = { filename, url: u, type: 'external', title: '' };
      existing.push(entry);
      added.push(entry);
    }
    for (let e of entries) {
      if (!e || typeof e.url !== 'string') continue;
      let u = e.url.trim();
      if (!u) continue;
      if (existing.some((ex) => ex.url === u)) continue;
      const urlObj = new URL(u);
      const queryId = urlObj.searchParams.get('id');
      let filename = queryId ? `gdrive-${queryId}` : path.basename(urlObj.pathname) || `external-${Date.now()}`;
      const entry = {
        filename,
        url: u,
        type: 'external',
        title: (e.title || '').trim(),
        issuer: (e.issuer || '').trim(),
        year: (e.year || '').trim(),
        description: (e.description || '').trim(),
      };
      existing.push(entry);
      added.push(entry);
    }
    // write back
    fs.writeFileSync(certificatesJsonPath, JSON.stringify(existing, null, 2));
    res.json({ ok: true, added });
  } catch (err) {
    console.error('Failed to add external certificates', err);
    res.status(500).json({ error: 'Failed to add external certificates' });
  }
});

// Update certificate metadata (title / description)
app.patch('/api/certificates/:filename', (req, res) => {
  const { filename } = req.params;
  const { title, description, issuer, year } = req.body || {};
  try {
    const existing = JSON.parse(fs.readFileSync(certificatesJsonPath, 'utf8') || '[]');
    const idx = existing.findIndex((e) => e.filename === filename);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    if (typeof title === 'string') existing[idx].title = title;
    if (typeof description === 'string') existing[idx].description = description;
    if (typeof issuer === 'string') existing[idx].issuer = issuer;
    if (typeof year === 'string') existing[idx].year = year;
    fs.writeFileSync(certificatesJsonPath, JSON.stringify(existing, null, 2));
    res.json({ ok: true, updated: existing[idx] });
  } catch (err) {
    console.error('Failed to update certificate', err);
    res.status(500).json({ error: 'Failed to update certificate' });
  }
});

// Update certificate metadata by URL (body: { url, title, description, issuer, year })
app.patch('/api/certificates', (req, res) => {
  const { url, title, description, issuer, year } = req.body || {};
  if (!url) return res.status(400).json({ error: 'Missing url' });
  try {
    const existing = JSON.parse(fs.readFileSync(certificatesJsonPath, 'utf8') || '[]');
    const idx = existing.findIndex((e) => e.url === url);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    if (typeof title === 'string') existing[idx].title = title;
    if (typeof description === 'string') existing[idx].description = description;
    if (typeof issuer === 'string') existing[idx].issuer = issuer;
    if (typeof year === 'string') existing[idx].year = year;
    fs.writeFileSync(certificatesJsonPath, JSON.stringify(existing, null, 2));
    res.json({ ok: true, updated: existing[idx] });
  } catch (err) {
    console.error('Failed to update certificate', err);
    res.status(500).json({ error: 'Failed to update certificate' });
  }
});

// Delete certificate entry
app.delete('/api/certificates/:filename', (req, res) => {
  const { filename } = req.params;
  try {
    let existing = JSON.parse(fs.readFileSync(certificatesJsonPath, 'utf8') || '[]');
    const idx = existing.findIndex((e) => e.filename === filename);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    const removed = existing.splice(idx, 1)[0];
    fs.writeFileSync(certificatesJsonPath, JSON.stringify(existing, null, 2));
    // if local, also delete file
    if (removed.type !== 'external') {
      const localFilePath = path.join(certificatesPath, removed.filename);
      if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
    }
    res.json({ ok: true, removed });
  } catch (err) {
    console.error('Failed to delete certificate', err);
    res.status(500).json({ error: 'Failed to delete certificate' });
  }
});

// Delete certificate by URL (body: { url })
app.delete('/api/certificates', (req, res) => {
  const { url } = req.body || {};
  if (!url) return res.status(400).json({ error: 'Missing url' });
  try {
    let existing = JSON.parse(fs.readFileSync(certificatesJsonPath, 'utf8') || '[]');
    const idx = existing.findIndex((e) => e.url === url);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    const removed = existing.splice(idx, 1)[0];
    fs.writeFileSync(certificatesJsonPath, JSON.stringify(existing, null, 2));
    if (removed.type !== 'external') {
      const localFilePath = path.join(certificatesPath, removed.filename);
      if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
    }
    res.json({ ok: true, removed });
  } catch (err) {
    console.error('Failed to delete certificate by url', err);
    res.status(500).json({ error: 'Failed to delete certificate' });
  }
});

// list certificates
app.get('/api/certificates', (req, res) => {
  try {
    const files = fs.readdirSync(certificatesPath);
    const localList = files
      .filter((f) => f !== 'certificates.json')
      .map((f) => ({ filename: f, url: `/uploads/certificates/${f}`, type: 'local' }));
    let external = [];
    try {
      external = JSON.parse(fs.readFileSync(certificatesJsonPath, 'utf8') || '[]');
      // ensure shape
      external = (external || []).map((e) => ({ ...e, type: 'external' }));
    } catch (err) {
      external = [];
    }
    const list = [...localList, ...external];
    res.json({ ok: true, certificates: list });
  } catch (err) {
    res.status(500).json({ error: 'Failed to list certificates' });
  }
});

app.get('/', (req, res) => res.send('Contact API running.'));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
