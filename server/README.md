# Server for Project Bolt

This small Node/Express server provides:
- /api/contact -> send contact messages via SMTP
- /api/profile -> upload or replace your profile photo (multipart/form-data field name: 'file')
- /api/certificates -> upload certificate (multipart/form-data field name: 'file')
- /api/certificates (GET) -> list uploaded certificates

Run locally:
```powershell
cd server
npm install
# copy .env.example -> .env and set values if you have an SMTP provider
npm run start:dev
```
If env vars for SMTP are absent, the server will fallback to Ethereal test account and return a preview URL in the contact response.

Deploy to Render/Vercel:
- For a Node service, you can deploy `server` folder as a single Node service and set env vars in the hosting dashboard.
- For Vercel Functions, convert /api endpoints to serverless functions, using similar code.

Deploying to Render (Quick Steps)
1. Create a new Web Service on Render and connect your repo.
2. Set the build command: `npm install` and start command: `npm start` (or use `npm run start:dev` for development).
3. Set environment variables in Render's dashboard (see `.env.example`): `CONTACT_EMAIL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE`.
4. Deploy and note the resulting URL (e.g., https://your-server.onrender.com), then set `VITE_API_BASE` in your frontend deployment to point to that URL so uploads and form submissions use the server.

Security notes for production:
- For persistent reliable file storage, switch to S3/R2 rather than local filesystem.
- Add authentication or an admin-only upload endpoint to avoid unauthorized uploads.

Bulk import external certificate links (Google Drive):
1. Create a text file with one link per line (e.g., `scripts/drive-links.txt`).
2. Run the helper script from the `server` folder:
```powershell
node scripts/addExternalCertificates.js scripts/drive-links.txt
```
3. The script writes these to `uploads/certificates/certificates.json` so they appear in the `GET /api/certificates` listing.

Security & storage:
- For production use, consider using a dedicated S3/Cloud storage (e.g., S3, Cloudflare R2) to store certificate images and profile pictures.
- For a high-end production solution, enable authentication for admin uploads and rate-limiting on the contact form to combat spam.
