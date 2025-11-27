# Quick Deployment Guide for GitHub Pages

## Step-by-Step Instructions

### 1. Create GitHub Repository
- Go to https://github.com/new
- Repository name: `translator-3000` (or any name you prefer)
- Make it **Public**
- Don't initialize with any files
- Click "Create repository"

### 2. Upload Files
You have 5 files to upload:
- `index.html` - Main application page
- `app.js` - Application logic
- `sw.js` - Service worker for PWA
- `manifest.json` - PWA configuration
- `README.md` - Documentation

**Option A: Via GitHub Web Interface**
1. Click "uploading an existing file"
2. Drag and drop all 5 files
3. Commit directly to main branch

**Option B: Via Git Command Line**
```bash
cd translator-3000
git init
git add .
git commit -m "Initial commit - Pritish Lifesaving Translator 3000"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/translator-3000.git
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to repository **Settings**
2. Click **Pages** in left sidebar
3. Under "Source":
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. Wait 2-3 minutes for deployment

### 4. Access Your App
Your app will be live at:
```
https://YOUR-USERNAME.github.io/translator-3000/
```

## That's It! 🎉

Your PWA is now:
- ✅ Live on the internet
- ✅ Installable as an app
- ✅ Works offline
- ✅ Responsive on all devices

## First-Time Usage

1. Get a DeepL Pro API key from: https://www.deepl.com/pro-api
2. Enter your API key in the app
3. Follow the 5-step process to translate your JSON files

## Need Help?

Refer to the full README.md for:
- Detailed usage instructions
- Troubleshooting tips
- Supported languages list
- Feature explanations
