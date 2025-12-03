const fs = require('fs');
const path = require('path');

const certificatesPath = path.join(__dirname, '..', 'uploads', 'certificates');
const certificatesJsonPath = path.join(certificatesPath, 'certificates.json');

function ensure() {
  if (!fs.existsSync(certificatesPath)) fs.mkdirSync(certificatesPath, { recursive: true });
  if (!fs.existsSync(certificatesJsonPath)) fs.writeFileSync(certificatesJsonPath, JSON.stringify([]));
}

function addUrls(urlsOrEntries) {
  ensure();
  const existing = JSON.parse(fs.readFileSync(certificatesJsonPath, 'utf8') || '[]');
  const added = [];
  for (let ent of urlsOrEntries) {
    // ent may be a string URL, or an object {url, title}
    let u = typeof ent === 'string' ? ent.trim() : (ent.url || '').trim();
    const title = typeof ent === 'string' ? '' : (ent.title || '');
    if (!u) continue;
    const existingIndex = existing.findIndex((e) => e.url === u);
    if (existingIndex !== -1) {
      // If title is provided and different, update existing
      if (title && existing[existingIndex].title !== title) {
        existing[existingIndex].title = title;
      }
      continue;
    }
    try {
      const urlObj = new URL(u);
      const queryId = urlObj.searchParams.get('id');
      const filename = queryId ? `gdrive-${queryId}` : path.basename(urlObj.pathname) || `external-${Date.now()}`;
      const entry = { filename, url: u, type: 'external', title: title || '', issuer: ent.issuer || '', year: ent.year || '', description: ent.description || '' };
      existing.push(entry);
      added.push(entry);
    } catch (err) {
      console.error('Invalid URL, skipping:', u);
    }
  }
  fs.writeFileSync(certificatesJsonPath, JSON.stringify(existing, null, 2));
  return added;
}

function main() {
  const input = process.argv[2];
  if (!input) {
    console.error('Usage: node addExternalCertificates.js <file-with-urls.txt>');
    process.exit(1);
  }
  const file = path.isAbsolute(input) ? input : path.join(process.cwd(), input);
  if (!fs.existsSync(file)) {
    console.error('File not found:', file);
    process.exit(1);
  }
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const entries = lines.map((ln) => {
    const parts = ln.split('|').map((p) => p.trim()).filter(Boolean);
    if (parts.length >= 2 && parts[0].startsWith('http')) {
      // parse up to title | issuer | year | description
      const [url, title, issuer, year, ...rest] = parts;
      const description = rest.join(' | ');
      return { url, title: title || '', issuer: issuer || '', year: year || '', description };
    }
    return ln;
  });
  const added = addUrls(entries);
  console.log('Added', added.length, 'entries');
}

if (require.main === module) main();
