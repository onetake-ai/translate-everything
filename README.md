# The Pritish Lifesaving Translator 3000

A Progressive Web App (PWA) for translating updated JSON language files using DeepL API. Automatically sync translations across multiple languages when you update your i18n files.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌟 Live Demo

[Try it now](https://onetake-ai.github.io/translate-everything/)

## ✨ Key Features

### Translation Quality
- 🎯 **Translation Consistency**: Uses DeepL's context parameter to maintain consistent terminology across all strings
- 🔄 **Batch Processing**: Translates up to 50 keys per API call for speed and efficiency
- 🔍 **Smart Diff Parsing**: Correctly identifies modifications vs. additions/deletions (even consecutive changes)
- 🎨 **Formality Control**: Choose automatic, informal, or formal tone for translations
- ✓ **Variable Preservation**: Automatically validates that `{{variables}}` are maintained in translations

### User Experience
- 📱 **Progressive Web App**: Installable, works offline after first load
- 🌓 **Dark Mode**: Automatic light/dark theme based on system preference
- 📊 **Change Preview**: Side-by-side comparison of old vs. new translations
- 📋 **Collapsible Sections**: Clean UI with expandable/collapsible change previews
- 💾 **Easy Export**: Overlay copy button and download options
- 🔐 **Privacy First**: API key stored locally only (optional), never sent to any server except DeepL

### Technical
- 🚫 **CORS-Free**: Uses BunnyCDN Edge Script as proxy (no backend server needed)
- 🌍 **30+ Languages**: Supports all DeepL target languages
- ⚡ **Fast**: Batch translation with intelligent progress tracking
- 📏 **Key Order Preservation**: Maintains original JSON structure and key positions
- ✅ **JSON Validation**: Validates input and output for safety

## 🚀 Quick Start

### Prerequisites
- DeepL Pro API key ([get one here](https://www.deepl.com/pro-api))
- BunnyCDN account (for proxy setup)
- GitHub account (for hosting)

### Setup (3 Steps)

1. **Deploy BunnyCDN Proxy**
   - See detailed instructions: [BUNNYCDN_SETUP.md](BUNNYCDN_SETUP.md)
   - Copy `bunnycdn-edge-script.js` to your BunnyCDN Edge Rules
   - Trigger path: `/api/deepl`

2. **Configure Proxy URL**
   - Edit line 3 in `app.js`:
   ```javascript
   const BUNNY_PROXY_URL = 'https://your-domain.b-cdn.net/api/deepl';
   ```

3. **Deploy to GitHub Pages**
   - Upload all files to your GitHub repository
   - Settings → Pages → Deploy from `main` branch
   - Wait 2-3 minutes for deployment

## 📖 How to Use

### 1. Prepare Your Files

**Get your GitLab diff:**
```bash
# In GitLab, go to: Repository → Compare → Select branches
# Copy the diff content
```

**What you need:**
- GitLab diff file (shows changes in your L1 language)
- Current L2 JSON file (the language you want to update)

### 2. Use the App

1. **Enter DeepL API Key** (Step 1)
   - Paste your DeepL Pro API key
   - Optionally save it in browser local storage

2. **Source Language - L1** (Step 2)
   - Select the language you updated (e.g., French)
   - Paste the GitLab diff file

3. **Target Language - L2** (Step 3)
   - Select the language to update (e.g., Spanish)
   - Choose formality (Informal/Formal/Automatic)
   - Paste current L2 JSON

4. **Process** (Step 4)
   - Click "Start Translation"
   - Watch real-time progress
   - Review any warnings

5. **Review & Download** (Step 5)
   - Expand "📝 Changes Preview" to see modifications
   - Review the updated JSON (scrollable, max 500px)
   - Click overlay "📋 Copy" button or download JSON

### 3. Process More Languages

- Click "🔄 Process Another Language"
- Reuse the same diff with a different L2
- Repeat for all languages you need

## 🧪 Test with Sample Data

Want to try it first? Use the sample data in [SAMPLE_TEST.md](SAMPLE_TEST.md):
- Contains example diff file
- Includes sample L2 JSON
- Demonstrates all features (modifications, additions, deletions)

## 🎯 How It Works

### The Translation Flow

```
1. Parse GitLab Diff
   ↓
2. Identify Changes
   - Added keys
   - Modified keys  
   - Removed keys
   ↓
3. Batch Translation (50 keys at a time)
   - Context: All texts concatenated
   - DeepL translates with consistency
   ↓
4. Build Updated JSON
   - Remove deleted keys
   - Update modified keys (in place)
   - Add new keys (at end)
   ↓
5. Validate & Export
   - Check JSON validity
   - Verify variable preservation
   - Download or copy result
```

### Translation Consistency (Context Parameter)

The app automatically provides context to DeepL for **consistent terminology**:

**Without Context:**
```
"video editing" → "montage vidéo"     (batch 1)
"video editing" → "édition vidéo"     (batch 2) ❌ Inconsistent!
"video editing" → "assemblage vidéo"  (batch 3) ❌ Different again!
```

**With Context (automatic):**
```
"video editing" → "montage vidéo"  (batch 1)
"video editing" → "montage vidéo"  (batch 2) ✅ Consistent!
"video editing" → "montage vidéo"  (batch 3) ✅ Consistent!
```

**How:** All source texts in a batch are concatenated and sent as context to DeepL. This helps maintain consistent terminology throughout your translations at no additional cost (context is free!).

## 📊 Supported Languages

### Primary Languages (Quick Select)
- English (EN-US)
- French (FR)
- German (DE)
- Portuguese Brazilian (PT-BR)
- Spanish (ES)
- Italian (IT)
- Japanese (JA)
- Russian (RU)

### All Supported Languages (via "Other" option)
Arabic, Bulgarian, Czech, Danish, Dutch, Estonian, Finnish, Greek, Hungarian, Indonesian, Korean, Lithuanian, Latvian, Norwegian, Polish, Portuguese (PT), Romanian, Slovak, Slovenian, Swedish, Turkish, Ukrainian, Chinese (Simplified)

**Note:** Formality settings only apply to: German, French, Italian, Spanish, Portuguese, Dutch, Polish, Russian, Japanese

## 🔧 Technical Details

### File Structure

```
.
├── app.js                      # Main application logic
├── index.html                  # UI and styling
├── manifest.json               # PWA configuration
├── sw.js                       # Service worker (offline support)
├── bunnycdn-edge-script.js     # Proxy for CORS-free DeepL access
├── BUNNYCDN_SETUP.md           # Proxy deployment guide
├── SAMPLE_TEST.md              # Test data
├── README.md                   # This file
└── LICENSE                     # MIT License
```

### JSON Structure

Works with **flat JSON** structure:

```json
{
  "key1": "value1",
  "key2": "value with {{variable}}",
  "key3": "another value"
}
```

### Diff Format

Expects standard unified diff format from GitLab:

```diff
diff --git a/src/locales/fr.json b/src/locales/fr.json
@@ -351,7 +351,8 @@
   "key1": "value1",
-  "key2": "old value",
+  "key2": "new value",
+  "key3": "added value",
```

### Smart Diff Parsing

The app intelligently handles:
- **Consecutive modifications**: Multiple updated lines shown as "MODIFIED" (not separate removals + additions)
- **Key order preservation**: Modified keys stay in original position, new keys added at end
- **Context awareness**: All strings in a batch used as context for consistent translations

## 🔐 Privacy & Security

- ✅ **API Key**: Stored in browser local storage only (optional)
- ✅ **No Backend**: All processing happens client-side in your browser
- ✅ **Proxy**: BunnyCDN proxy only forwards requests, doesn't store data
- ✅ **No Tracking**: No analytics, no data collection
- ✅ **HTTPS**: All communication encrypted
- ✅ **Open Source**: Full transparency - review the code yourself

**Your DeepL API key is:**
- Never stored on any server
- Only sent to BunnyCDN proxy → forwarded to DeepL API
- Optionally saved in browser local storage (you control this)
- Can be cleared anytime via browser settings

## 🐛 Troubleshooting

### Common Issues

**"Failed to connect to proxy"**
- ✅ Verify `BUNNY_PROXY_URL` in `app.js` is correct
- ✅ Check BunnyCDN Edge Script is deployed
- ✅ Test proxy URL directly with curl (see BUNNYCDN_SETUP.md)

**"Invalid JSON"**
- ✅ Validate your JSON at [jsonlint.com](https://jsonlint.com)
- ✅ Check for missing commas, quotes, or brackets
- ✅ Ensure proper UTF-8 encoding

**"Variable mismatch" warning**
- ✅ App detected variables changed during translation
- ✅ Review the specific key mentioned
- ✅ Usually rare - DeepL preserves `{{variables}}` well

**Translation inconsistencies**
- ✅ Context parameter should prevent this
- ✅ If still occurring, check batch size (should be ≤50)
- ✅ Ensure updated `app.js` is deployed

**"Proxy error (403)"**
- ✅ Your DeepL API key is invalid or expired
- ✅ Get a new key from [DeepL dashboard](https://www.deepl.com/account/summary)

## 💡 Tips & Best Practices

### For Best Results

1. **Keep batches under 50 keys** - App does this automatically
2. **Review changes before downloading** - Use the preview section
3. **Test with sample data first** - See [SAMPLE_TEST.md](SAMPLE_TEST.md)
4. **Use Pro API key** - Free API keys won't work (different endpoint)
5. **Process one language at a time** - Better for reviewing changes

### DeepL API Usage

- **Context is free**: Doesn't count toward billing
- **Only `text` parameter is billed**: Context costs nothing
- **Batch translations are efficient**: Up to 50 texts per request
- **Variables are preserved**: DeepL handles `{{variables}}` well

### Workflow Tips

```
1. Update your source language (e.g., English)
2. Get GitLab diff of changes
3. Use app to update each target language
4. Review changes in preview
5. Download and commit updated files
6. Repeat for all languages
```

## 📈 Performance

- **Load Time**: < 1 second (after service worker cache)
- **Translation Speed**: Depends on DeepL API (typically 1-2 seconds per batch)
- **Batch Size**: 50 keys per API call
- **Offline**: Works offline after first load (PWA)
- **File Size**: ~50KB total (uncompressed)

## 🤝 Contributing

This is an open-source project. Contributions welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 👨‍💻 Author

**Sébastien Night**
- Website: [onetake.ai](https://www.onetake.ai/team/sebastien-night)
- GitHub: [@onetake-ai](https://github.com/onetake-ai)

## 🙏 Acknowledgments

- **DeepL**: For their excellent translation API
- **BunnyCDN**: For Edge Script proxy capabilities
- **GitLab**: For comprehensive diff generation

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/onetake-ai/translate-everything/issues)
- **Documentation**: See individual .md files in repository
- **Setup Help**: See [BUNNYCDN_SETUP.md](BUNNYCDN_SETUP.md)

---

**Made with ❤️ for the i18n community**

*This is a non-commercial personal project. The code is open source and MIT-licensed.*
