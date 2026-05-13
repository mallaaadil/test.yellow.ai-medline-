# Medline Sample Page — Yellow AI Chatbot Integration

A sample testing webpage for Medline that embeds the Yellow AI chatbot widget with dynamic payload support (device type, geolocation, user session, and more).

---

## Project Structure

```
medline-chatbot/
│
├── index.html          ← Main webpage (the sample Medline site)
│
├── css/
│   └── styles.css      ← All page styles (colors, layout, fonts)
│
├── js/
│   ├── bot-config.js   ← ⭐ EDIT THIS to change bot settings & payload
│   └── bot-init.js     ← Bot loader (don't touch unless changing init logic)
│
└── README.md           ← This file
```

---

## How to Customize the Bot

### ✅ Change Bot ID or Host
Open `js/bot-config.js` and update:
```js
botId: "x1777284338518",
host: "https://r4.cloud.yellow.ai",
```

### ✅ Add or Remove Payload Fields
Inside `buildPayload()` in `bot-config.js`, add any key-value pairs:
```js
buildPayload: function () {
  return {
    deviceType: /Mobi/i.test(navigator.userAgent) ? "mobile" : "desktop",
    myCustomField: "any value",
    // add more here
  };
}
```

### ✅ Pass Real User Login Data
Replace the stub in `getUserSession()` in `bot-config.js`:
```js
getUserSession: function () {
  const auth = window.__YOUR_AUTH_OBJECT__ || {};
  return {
    isLoggedIn: !!auth.userId,
    userId: auth.userId || null,
    userName: auth.name || null,
    userEmail: auth.email || null,
    userRole: auth.role || "guest",
    accountType: auth.plan || "individual",
  };
},
```

### ✅ Enable / Disable Geolocation
In `bot-config.js`:
```js
enableGeolocation: true,   // set to false to skip location prompt
```

### ✅ Toggle Debug Logging
```js
debug: true,   // open browser console to see payload being sent
```

### ✅ Change Widget Appearance
Uncomment and fill in the `theme` block:
```js
theme: {
  primaryColor: "#0057A8",
  botName: "Medline Assistant",
},
```

---

## Local Development (Preview Before Pushing)

You need a simple local server because browsers block some features on `file://`.

**Option A — VS Code (Recommended)**
1. Install the **Live Server** extension in VS Code
2. Right-click `index.html` → **Open with Live Server**

**Option B — Python (No install needed)**
```bash
cd medline-chatbot
python3 -m http.server 8080
# Open: http://localhost:8080
```

---

## Deploying to GitHub Pages (Step-by-Step for Beginners)

### Prerequisites
- A [GitHub account](https://github.com) (free)
- [Git installed](https://git-scm.com/downloads) on your computer

---

### Step 1 — Create a New Repository on GitHub

1. Go to **https://github.com/new**
2. Fill in:
   - **Repository name:** `medline-chatbot`
   - **Visibility:** Public ✅ (required for free GitHub Pages)
   - Leave everything else default
3. Click **Create repository**
4. **Copy the repository URL** shown on the next page — it looks like:
   `https://github.com/YOUR-USERNAME/medline-chatbot.git`

---

### Step 2 — Open Terminal / Command Prompt

- **Mac:** Press `Cmd + Space`, type `Terminal`, press Enter
- **Windows:** Press `Win + R`, type `cmd`, press Enter
- **VS Code:** Menu → Terminal → New Terminal

---

### Step 3 — Navigate to Your Project Folder

```bash
cd path/to/medline-chatbot
```
Example on Mac: `cd ~/Downloads/medline-chatbot`
Example on Windows: `cd C:\Users\YourName\Downloads\medline-chatbot`

---

### Step 4 — Initialize Git and Push

Run these commands one by one:

```bash
# 1. Initialize a git repository in this folder
git init

# 2. Add all files
git add .

# 3. Save a snapshot (your first commit)
git commit -m "Initial commit: Medline sample page with Yellow AI bot"

# 4. Rename the default branch to 'main'
git branch -M main

# 5. Connect to your GitHub repo (paste YOUR repo URL here)
git remote add origin https://github.com/YOUR-USERNAME/medline-chatbot.git

# 6. Push your files to GitHub
git push -u origin main
```

When prompted, enter your GitHub username and password.
> 💡 If password doesn't work, use a **Personal Access Token** instead:
> GitHub → Settings → Developer Settings → Personal access tokens → Generate new token (check `repo` scope)

---

### Step 5 — Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab (top menu)
3. In the left sidebar, click **Pages**
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait ~60 seconds, then your site will be live at:
   `https://YOUR-USERNAME.github.io/medline-chatbot/`

---

### Step 6 — Set Up Custom Domain (test.yellow.ai/medline)

To make the page accessible at `test.yellow.ai/medline`, the DNS/domain configuration needs to be done by whoever controls `test.yellow.ai`. Share this with your Yellow AI team:

**Option A — GitHub Pages Custom Domain**
1. In GitHub Pages settings, enter `test.yellow.ai` as the custom domain
2. Ask Yellow AI IT to add a CNAME DNS record:
   ```
   test.yellow.ai  CNAME  YOUR-USERNAME.github.io
   ```

**Option B — Subdirectory Proxy**
If the root domain already has a site, ask IT to set up a reverse proxy so:
```
https://test.yellow.ai/medline  →  https://YOUR-USERNAME.github.io/medline-chatbot/
```

---

## Updating the Site After Changes

Whenever you make a change to any file, run:

```bash
git add .
git commit -m "Brief description of what you changed"
git push
```

GitHub Pages will automatically update within ~30 seconds.

---

## Common Issues

| Problem | Fix |
|---|---|
| Bot doesn't appear | Open browser console (F12) and check for errors. Ensure `debug: true` in bot-config.js |
| Geolocation not working | User must click "Allow" when browser asks for location permission |
| Push rejected | Run `git pull origin main --rebase` first, then push again |
| Page shows 404 | Wait 1-2 minutes after enabling GitHub Pages and refresh |

---

## Tech Stack

- Pure HTML / CSS / Vanilla JS — no frameworks, no build tools needed
- Yellow AI Widget v2 (loaded from CDN)
- Geolocation via Browser API + Nominatim (OpenStreetMap) reverse geocoding — no API key needed
