# Deployment Checklist ✓

## Files to Upload to GitHub (7 files)

- [ ] `index.html` - Main app page
- [ ] `app.js` - Application logic  
- [ ] `sw.js` - Service worker
- [ ] `manifest.json` - PWA config
- [ ] `README.md` - Documentation
- [ ] `.nojekyll` - GitHub Pages config
- [ ] `DEPLOYMENT.md` - Deployment guide (optional)

## Deployment Steps

- [ ] Create new GitHub repository (public)
- [ ] Upload all files
- [ ] Go to Settings → Pages
- [ ] Set Source to: Branch `main`, Folder `/ (root)`
- [ ] Click Save
- [ ] Wait 2-3 minutes
- [ ] Visit `https://YOUR-USERNAME.github.io/REPO-NAME/`

## Before First Use

- [ ] Get DeepL Pro API key from https://www.deepl.com/pro-api
- [ ] Test with the sample data in `SAMPLE_TEST.md`

## Features Included ✓

✅ 30+ languages supported (DeepL)
✅ GitLab diff parsing
✅ Variable preservation ({{variable}})
✅ Orphaned key detection
✅ Side-by-side change preview
✅ JSON validation
✅ Dark/light mode
✅ Responsive design
✅ PWA (installable, offline-capable)
✅ API key storage (optional)
✅ Progress indicators
✅ Download/copy results
✅ Process multiple languages in sequence

## Testing Checklist

- [ ] Open app in browser
- [ ] Enter DeepL API key
- [ ] Paste sample diff (see SAMPLE_TEST.md)
- [ ] Paste sample L2 JSON
- [ ] Click "Start Translation"
- [ ] Verify changes preview
- [ ] Check orphaned keys section
- [ ] Review output JSON
- [ ] Test copy to clipboard
- [ ] Test download JSON
- [ ] Try "Process Another Language"

## Browser Support

✓ Chrome/Edge 90+
✓ Firefox 88+
✓ Safari 14+
✓ Mobile browsers

## Troubleshooting

**App not loading?**
- Check browser console for errors
- Verify all files uploaded correctly
- Clear cache and reload

**Translation failing?**
- Verify DeepL API key is correct
- Check API quota/limits
- Ensure using Pro API (not Free)

**Variables not preserved?**
- App will show warning
- Manually review translations
- Variable format: {{variableName}}

## Security Notes

- API key stored locally only (if enabled)
- No data sent to any server except DeepL
- No tracking or analytics
- All processing client-side

## Need Help?

📖 See README.md for full documentation
🧪 See SAMPLE_TEST.md for test data
🚀 See DEPLOYMENT.md for step-by-step guide
