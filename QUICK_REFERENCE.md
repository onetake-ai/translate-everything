# Quick Reference Card

## 🚀 5-Step Process

1. **API Key** → Enter DeepL Pro API key
2. **Source (L1)** → Select updated language + paste diff
3. **Target (L2)** → Select target language + paste current JSON
4. **Process** → Click "Start Translation"
5. **Download** → Review, copy, or download result

## 📋 Common Tasks

### Get Your GitLab Diff
```bash
# In your GitLab project
# Go to: Repository → Compare → Select branches
# Copy the diff content
```

### DeepL API Key
- Free Trial: https://www.deepl.com/pro-api
- Location: Account → API Keys
- Type needed: **Pro** (not Free)

### JSON Format
Must be flat structure:
```json
{
  "key": "value",
  "greeting": "Hello {{name}}"
}
```

### Formality Options
- **Automatic**: DeepL decides
- **Informal**: Casual (default) ✓
- **Formal**: Professional

Applies to: DE, FR, IT, ES, PT, NL, PL, RU, JA

## 🎯 What Gets Updated

| Diff Change | App Action |
|------------|------------|
| `+ "key": "new"` | Translates & adds to L2 |
| `- "key": "old"` | Removes from L2 |
| `- "key": "old"`<br>`+ "key": "new"` | Translates & updates in L2 |
| Unchanged keys | Kept as-is in L2 |

## ⚠️ Orphaned Keys

Keys in L2 but removed from L1:
- Shown in warnings section
- **NOT** included in output
- Review manually if needed

## ✅ Variable Preservation

Preserved: `{{count}}`, `{{name}}`, `{{value}}`

App validates variables match between:
- Original L1 text
- Translated L2 text

Warning shown if mismatch detected.

## 📱 PWA Features

### Install as App
- Chrome: Click ⊕ in address bar
- Safari: Share → Add to Home Screen
- Edge: Click ⊕ in address bar

### Offline Use
Works offline after first load (PWA)

### API Key Storage
Optional: Save in browser local storage
- Checkbox in Step 1
- Stored locally only
- Clear via browser settings

## 🔧 Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Copy output | Ctrl/Cmd + C (after selecting) |
| Select all JSON | Ctrl/Cmd + A (in output) |
| Scroll to results | Auto after processing |

## 💾 Output Options

1. **Copy to Clipboard** → Paste in your editor
2. **Download JSON** → Saves as `{lang-code}.json`
3. **Process Another** → Keep same diff, new L2

## 🐛 Quick Fixes

**Error: "Invalid JSON"**
→ Use JSON validator, check commas/quotes

**Error: "API failed"**
→ Check API key, quota, network

**Warning: "Variable mismatch"**
→ Review translation, variables changed

**No results showing**
→ Check browser console, refresh page

## 📊 Progress Indicators

- **Removing keys...** → Deleting removed items
- **Translating new keys...** → Adding new items  
- **Updating modified keys...** → Changing updated items

## 🌍 Language Codes

**Common:**
- EN-US (English)
- FR (French)
- DE (German)
- ES (Spanish)
- IT (Italian)
- PT-BR (Portuguese BR)
- JA (Japanese)
- RU (Russian)

**Full list:** Click "Other" in language selector

## 💡 Pro Tips

1. **Save API Key**: Check the box to avoid re-entering
2. **Test First**: Use SAMPLE_TEST.md to verify setup
3. **Batch Process**: Do multiple L2s with same diff
4. **Review Changes**: Check preview before downloading
5. **Keep Backups**: Download originals before updating

## 📞 Support

- Issues? Check browser console (F12)
- Questions? See full README.md
- Bugs? Create GitHub issue on repo
