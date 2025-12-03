# Project Bolt (Vite + React + TypeScript)

This is a Vite + React + TypeScript portfolio site. Below are quick steps to run the project and how to replace the profile image.

## Run locally

```powershell
cd "C:\Users\hp\Downloads\project-bolt-sb1-y1iyzxxq\project"
npm install
npm run dev
```

Visit http://localhost:5173/ in your browser.

## Replace the Profile Photo

- Add a `profile.jpg` image to the `public/` folder. The `Hero` component will attempt to load `/profile.jpg` first and will fallback to `profile.svg` if the file does not exist.
- The photo should be square for best results (e.g. 400x400 or 800x800).
	- Alternatively, you can upload the image from the site itself (opens a small uploader overlay near the avatar in the Hero section) and the server will save it under `/uploads/profile.jpg` (server must be running).
	- To add the image locally instead of uploading, place the file named `profile.jpg` in the `public/` folder.
		- To automate adding / resizing the image, you can use the included PowerShell helper script:
			```powershell
			# From the project root
			.\scripts\add-profile.ps1 -SourcePath "C:\Users\hp\OneDrive\Desktop\New folder\1750911740638.jpeg" -Size 800
			```
			The script will resize the image to a square of the requested size if ImageMagick (`magick`) is available, otherwise it will copy the file as-is.

## Notes

- `public/profile.svg` contains the placeholder image included by default. Replace it if you prefer SVG.
- The background shapes animation has been removed; `CursorEffect` is still included by default for interactivity.

## Contact form behavior

- The contact form currently opens the user's default email client using a `mailto:` link (no server required) so visitors can email you directly. The form will prefill the recipient email and body based on the input fields.
- If you want server-side email forwarding (to capture messages and send via SMTP) or to store messages, use the optional `server` backend. See `server/README.md` for deployment instructions.

- Note: On some machines/OS configurations clicking a `mailto:` link may not open an email client (if none is configured). The website includes a "Copy email" button next to the email address for convenience so users can easily copy it and paste into their own email client.

## Hosting (Quick Start)

Front-end (Static):
- Recommended: Vercel or Netlify. Connect your repository and set the root to the `project` folder.
- Build command: `npm run build` (Vite will auto-detect and build). Framework: "Other" or "Vite".

Back-end (Optional Server):
- Deploy the `server` folder as a node service to Render or Railway (or convert to serverless functions for Vercel/Netlify Functions).
- Set environment variables in your host (see `server/.env.example`), especially `CONTACT_EMAIL` and SMTP settings if you want emails to be forwarded.

For a simple, low-maintenance option (no backend), keep the `mailto:` contact form and deploy only the frontend.

## Add external certificates (Google Drive links)

The `Certifications` section supports adding external certificates by pasting URLs (one per line). Use this if you host your certificate files in Google Drive, Dropbox, or another shared location.

How to add:
- Go to the `Certifications` section on the site.
- Paste one or multiple links into the 'Add external certificates' textarea (one link per line).
- Press 'Add URLs' to save them. The site will list them as 'External Link' entries.

If you prefer using the server API (e.g., to add multiple entries programmatically), call the endpoint:

POST /api/certificates/external
Body (JSON): {
	"urls": ["https://drive.google.com/open?id=...", "https://..."]
}

If your link points to Google Drive, ensure the file is set to 'Anyone with the link can view' (share settings) so the certificate is accessible publicly.

Editing certificate metadata via UI
- Visit the `Certifications` section; each certificate now has an `Edit` button.
- Click `Edit` to open a modal where you can set:
	- Title (displayed prominently)
	- Issuer (e.g., Coursera, Udemy)
	- Year
	- Short description
- Click `Save` to persist the changes. These fields are stored on the server and shown to recruiters in the Certification list.

Bulk updating metadata (script support)
- For programmatic updates or bulk updates, `server/scripts/addExternalCertificates.js` accepts lines in the following format:
	- `URL | Title | Issuer | Year | Description`
- Run:
```powershell
cd server
node scripts/addExternalCertificates.js scripts/drive-links.txt
```
This updates existing entries and adds new ones if they are not already present.

***

If you want me to wire an upload UI (drag and drop) or allow multiple preset avatars, tell me and I’ll implement it.

## Add this site to your resume

Use the following formats as examples to include the portfolio on your CV or resume:

- Simple link line:
	- Portfolio: https://your-domain-here.com

- Short sentence (for summary or header):
	- Personal portfolio showcasing projects, certifications, and contact information. Built with React + Vite + Tailwind CSS. https://your-domain-here.com

- Experience entry (if you want to credit the site as a project):
	- Personal Portfolio (self-hosted) — Full-stack site built with React, Vite, and Tailwind CSS; includes projects, certifications, and contact form. https://your-domain-here.com

Tip: Add the link near your name/contact info or in the Projects/Portfolio section depending on how prominent you want the site to appear.

## Improvements: Certificates UI

- The `Certifications` section now shows a more attractive card-based layout with small icons or thumbnails for each certificate.
- Each certificate card shows a short AI-style blurb (generated with a heuristic) describing what the certificate demonstrates and how it adds value. You can click `Generate Blurb` to create one for a certificate, or `Generate all blurbs` to create blurbs for all certificates shown.
- When running the optional server, you can save the blurb to server metadata by clicking `Save Blurb` on each certificate or `Save all` to persist generated blurbs for all certs.
- Thumbnails: Local images display as thumbnails if they are images. Otherwise an icon is chosen automatically based on the certificate title/issuer keywords.
 
If you'd like more advanced generation (LLM-powered summaries or auto-tags), tell me and I can add a server-side endpoint to integrate with an LLM provider and safely save the generated text.