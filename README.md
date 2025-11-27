# The Pritish Lifesaving Translator 3000

A Progressive Web App (PWA) for translating updated JSON language files using DeepL API.

## Features

- 🌍 Supports 30+ languages via DeepL API
- 📝 Parses GitLab diff files to detect changes
- ✨ Automatically translates new/modified strings
- 🔍 Variable preservation validation ({{variables}})
- 📊 Side-by-side change comparison
- ⚠️ Orphaned key detection
- 💾 JSON validation and download
- 🌓 Dark mode support
- 📱 Responsive design
- 💪 Works offline (PWA)

## Deployment to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it something like `translator-3000`
3. Make it public
4. Don't initialize with README (we have files ready)

### Step 2: Upload Files

Upload these files to your repository:
- `index.html`
- `app.js`
- `sw.js`
- `manifest.json`
- `README.md`

You can do this via:
- GitHub web interface (Upload files button)
- Git command line:
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  git branch -M main
  git remote add origin https://github.com/YOUR-USERNAME/translator-3000.git
  git push -u origin main
  ```

### Step 3: Enable GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select "Deploy from a branch"
4. Select the `main` branch and `/ (root)` folder
5. Click "Save"
6. Wait a few minutes for deployment

Your app will be available at: `https://YOUR-USERNAME.github.io/translator-3000/`

## Usage

### 1. DeepL API Key

- Get a DeepL API Pro key from [DeepL](https://www.deepl.com/pro-api)
- Enter the key in Step 1
- Optionally save it in browser local storage

### 2. Source Language (L1)

- Select the language you've updated (e.g., French)
- Paste the GitLab diff file

### 3. Target Language (L2)

- Select the language you want to update (e.g., Spanish)
- Choose formality level (Informal is default)
- Paste the current JSON for that language

### 4. Process

- Click "Start Translation"
- Wait for the process to complete
- Review changes and orphaned keys

### 5. Download

- Review the generated JSON
- Copy to clipboard or download as file
- Optionally process another language with the same diff

## Diff File Format

The app expects standard unified diff format from GitLab:

```diff
diff --git a/src/locales/fr.json b/src/locales/fr.json
index abc123..def456 100644
--- a/src/locales/fr.json
+++ b/src/locales/fr.json
@@ -351,7 +351,8 @@
   "key1": "value1",
-  "key2": "old value",
+  "key2": "new value",
+  "key3": "added value",
```

## JSON Structure

The app works with flat JSON structure:

```json
{
  "key1": "value1",
  "key2": "value with {{variable}}",
  "key3": "another value"
}
```

## Supported Languages

### Primary Languages (shown first)
- English
- French
- German
- Portuguese (BR)
- Spanish
- Italian
- Japanese
- Russian

### All Supported Languages (via "Other" option)
Arabic, Bulgarian, Czech, Danish, German, Greek, English (British), English (American), Spanish, Estonian, Finnish, French, Hungarian, Indonesian, Italian, Japanese, Korean, Lithuanian, Latvian, Norwegian, Dutch, Polish, Portuguese (Brazilian), Portuguese (European), Romanian, Russian, Slovak, Slovenian, Swedish, Turkish, Ukrainian, Chinese (Simplified)

## Features Explained

### Variable Preservation
The app validates that variables like `{{count}}`, `{{name}}` are preserved in translations.

### Orphaned Keys Detection
Shows keys that exist in L2 but were removed from L1, helping you identify outdated translations.

### Change Preview
Side-by-side comparison of old and new values for modified keys.

### Formality Settings
- **Automatic**: DeepL chooses appropriate formality
- **Informal**: Casual tone (default)
- **Formal**: Professional tone

Note: Formality is only applied to supported languages (German, French, Italian, Spanish, Portuguese, Dutch, Polish, Russian, Japanese).

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Privacy

- All processing happens in your browser
- API key can be saved locally (optional)
- No data is sent to any server except DeepL API
- No tracking or analytics

## Troubleshooting

### API Errors
- Verify your DeepL API key is correct
- Check you have sufficient API quota
- Ensure you're using a Pro API key (not Free)

### Invalid JSON
- Validate your JSON using a JSON validator
- Check for missing commas or quotes
- Ensure proper escaping of special characters

### Variables Not Preserved
- The app will warn you if variables mismatch
- Review the translation manually
- You can edit the output JSON before downloading

## License

MIT License - Free to use and modify

## Support

For issues or questions, create an issue on the GitHub repository.
