// DeepL supported target languages with their codes
const DEEPL_TARGET_LANGUAGES = {
    'AR': 'Arabic',
    'BG': 'Bulgarian',
    'CS': 'Czech',
    'DA': 'Danish',
    'DE': 'German',
    'EL': 'Greek',
    'EN-GB': 'English (British)',
    'EN-US': 'English (American)',
    'ES': 'Spanish',
    'ET': 'Estonian',
    'FI': 'Finnish',
    'FR': 'French',
    'HU': 'Hungarian',
    'ID': 'Indonesian',
    'IT': 'Italian',
    'JA': 'Japanese',
    'KO': 'Korean',
    'LT': 'Lithuanian',
    'LV': 'Latvian',
    'NB': 'Norwegian (Bokmål)',
    'NL': 'Dutch',
    'PL': 'Polish',
    'PT-BR': 'Portuguese (Brazilian)',
    'PT-PT': 'Portuguese (European)',
    'RO': 'Romanian',
    'RU': 'Russian',
    'SK': 'Slovak',
    'SL': 'Slovenian',
    'SV': 'Swedish',
    'TR': 'Turkish',
    'UK': 'Ukrainian',
    'ZH': 'Chinese (Simplified)'
};

// Primary languages shown initially
const PRIMARY_LANGUAGES = {
    'EN-US': 'English',
    'FR': 'French',
    'DE': 'German',
    'PT-BR': 'Portuguese (BR)',
    'ES': 'Spanish',
    'IT': 'Italian',
    'JA': 'Japanese',
    'RU': 'Russian'
};

// Application state
let state = {
    apiKey: '',
    l1Language: '',
    l2Language: '',
    diffContent: '',
    l2Json: null,
    parsedDiff: null,
    outputJson: null,
    changes: [],
    orphanedKeys: []
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadSavedApiKey();
    renderLanguageSelectors();
    attachEventListeners();
});

// Load saved API key from localStorage
function loadSavedApiKey() {
    const savedKey = localStorage.getItem('deeplApiKey');
    if (savedKey) {
        document.getElementById('apiKey').value = savedKey;
        document.getElementById('saveApiKey').checked = true;
        state.apiKey = savedKey;
    }
}

// Render language selection grids
function renderLanguageSelectors() {
    renderLanguageGrid('l1LanguageGrid', 'l1', PRIMARY_LANGUAGES);
    renderLanguageGrid('l2LanguageGrid', 'l2', PRIMARY_LANGUAGES);
    
    // Populate custom language dropdowns
    populateCustomDropdown('l1Custom');
    populateCustomDropdown('l2Custom');
}

function renderLanguageGrid(containerId, prefix, languages) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    Object.entries(languages).forEach(([code, name]) => {
        const option = document.createElement('div');
        option.className = 'language-option';
        option.textContent = name;
        option.dataset.code = code;
        option.addEventListener('click', () => selectLanguage(prefix, code, name, option));
        container.appendChild(option);
    });
    
    // Add "Other" option
    const otherOption = document.createElement('div');
    otherOption.className = 'language-option';
    otherOption.textContent = '🌐 Other...';
    otherOption.addEventListener('click', () => showCustomLanguageDropdown(prefix));
    container.appendChild(otherOption);
}

function populateCustomDropdown(selectId) {
    const select = document.getElementById(selectId);
    select.innerHTML = '<option value="">Select a language...</option>';
    
    Object.entries(DEEPL_TARGET_LANGUAGES).forEach(([code, name]) => {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = `${name} (${code})`;
        select.appendChild(option);
    });
}

function selectLanguage(prefix, code, name, element) {
    // Remove selection from all options
    const container = element.parentElement;
    container.querySelectorAll('.language-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Select this option
    element.classList.add('selected');
    
    // Update state
    if (prefix === 'l1') {
        state.l1Language = { code, name };
    } else {
        state.l2Language = { code, name };
    }
    
    // Hide custom dropdown
    document.getElementById(`${prefix}CustomContainer`).style.display = 'none';
}

function showCustomLanguageDropdown(prefix) {
    const container = document.getElementById(`${prefix}CustomContainer`);
    container.style.display = 'block';
    
    const select = document.getElementById(`${prefix}Custom`);
    select.addEventListener('change', (e) => {
        const code = e.target.value;
        const name = DEEPL_TARGET_LANGUAGES[code];
        if (code && name) {
            if (prefix === 'l1') {
                state.l1Language = { code, name };
            } else {
                state.l2Language = { code, name };
            }
            
            // Clear grid selection
            document.getElementById(`${prefix}LanguageGrid`).querySelectorAll('.language-option').forEach(opt => {
                opt.classList.remove('selected');
            });
        }
    });
}

// Attach event listeners
function attachEventListeners() {
    document.getElementById('apiKey').addEventListener('input', (e) => {
        state.apiKey = e.target.value;
    });
    
    document.getElementById('saveApiKey').addEventListener('change', (e) => {
        if (e.target.checked && state.apiKey) {
            localStorage.setItem('deeplApiKey', state.apiKey);
        } else {
            localStorage.removeItem('deeplApiKey');
        }
    });
    
    document.getElementById('diffFile').addEventListener('input', (e) => {
        state.diffContent = e.target.value;
    });
    
    document.getElementById('l2Json').addEventListener('input', (e) => {
        try {
            state.l2Json = JSON.parse(e.target.value);
        } catch (err) {
            // Will be validated on process
        }
    });
    
    document.getElementById('processBtn').addEventListener('click', processTranslation);
    document.getElementById('resetBtn').addEventListener('click', resetAll);
    document.getElementById('copyBtn').addEventListener('click', copyToClipboard);
    document.getElementById('downloadBtn').addEventListener('click', downloadJson);
    document.getElementById('anotherBtn').addEventListener('click', processAnother);
}

// Validate inputs
function validateInputs() {
    const errors = [];
    
    if (!state.apiKey.trim()) {
        errors.push('DeepL API key is required');
    }
    
    if (!state.l1Language.code) {
        errors.push('Please select a source language (L1)');
    }
    
    if (!state.diffContent.trim()) {
        errors.push('Please provide a DIFF file');
    }
    
    if (!state.l2Language.code) {
        errors.push('Please select a target language (L2)');
    }
    
    const l2JsonText = document.getElementById('l2Json').value.trim();
    if (!l2JsonText) {
        errors.push('Please provide the current L2 JSON');
    } else {
        try {
            state.l2Json = JSON.parse(l2JsonText);
        } catch (err) {
            errors.push('L2 JSON is invalid: ' + err.message);
        }
    }
    
    return errors;
}

// Parse the diff file
function parseDiff(diffContent) {
    const changes = {
        added: [],
        removed: [],
        modified: []
    };
    
    const lines = diffContent.split('\n');
    let inJsonSection = false;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Check if we're in a JSON section (after @@)
        if (line.startsWith('@@')) {
            inJsonSection = true;
            continue;
        }
        
        if (!inJsonSection) continue;
        
        // Parse added lines
        if (line.startsWith('+') && !line.startsWith('+++')) {
            const content = line.substring(1).trim();
            if (content && content !== '{' && content !== '}') {
                const keyValue = parseJsonLine(content);
                if (keyValue) {
                    // Check if this is a modification (there's a corresponding - line)
                    const prevLine = i > 0 ? lines[i - 1] : '';
                    if (prevLine.startsWith('-') && !prevLine.startsWith('---')) {
                        const prevContent = prevLine.substring(1).trim();
                        const prevKeyValue = parseJsonLine(prevContent);
                        if (prevKeyValue && prevKeyValue.key === keyValue.key) {
                            changes.modified.push({
                                key: keyValue.key,
                                oldValue: prevKeyValue.value,
                                newValue: keyValue.value
                            });
                            continue;
                        }
                    }
                    changes.added.push(keyValue);
                }
            }
        }
        
        // Parse removed lines
        if (line.startsWith('-') && !line.startsWith('---')) {
            const content = line.substring(1).trim();
            if (content && content !== '{' && content !== '}') {
                const keyValue = parseJsonLine(content);
                if (keyValue) {
                    // Check if this is not part of a modification
                    const nextLine = i < lines.length - 1 ? lines[i + 1] : '';
                    if (!nextLine.startsWith('+') || nextLine.startsWith('+++')) {
                        changes.removed.push(keyValue);
                    }
                }
            }
        }
    }
    
    return changes;
}

// Parse a JSON line to extract key and value
function parseJsonLine(line) {
    // Remove trailing comma
    line = line.replace(/,$/, '').trim();
    
    // Match "key": "value" pattern
    const match = line.match(/^"([^"]+)":\s*"(.*)"/);
    if (match) {
        return {
            key: match[1],
            value: match[2]
        };
    }
    
    return null;
}

// Extract variables from a string
function extractVariables(text) {
    const matches = text.match(/\{\{[^}]+\}\}/g);
    return matches || [];
}

// Validate that translation preserves variables
function validateVariables(original, translated) {
    const originalVars = extractVariables(original);
    const translatedVars = extractVariables(translated);
    
    // Sort for comparison
    const origSet = [...new Set(originalVars)].sort();
    const transSet = [...new Set(translatedVars)].sort();
    
    return JSON.stringify(origSet) === JSON.stringify(transSet);
}

// Translate multiple texts using DeepL API (batch translation)
async function translateTexts(texts, targetLang, formality) {
    const apiKey = state.apiKey;
    const url = 'https://api.deepl.com/v2/translate';
    
    const payload = {
        text: texts,
        target_lang: targetLang,
        formality: formality
    };
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `DeepL-Auth-Key ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`DeepL API error (${response.status}): ${errorText}`);
        }
        
        const data = await response.json();
        return data.translations.map(t => t.text);
    } catch (error) {
        throw new Error(`Translation failed: ${error.message}`);
    }
}

// Helper function to split array into chunks
function chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

// Process the translation
async function processTranslation() {
    // Clear previous alerts and results
    document.getElementById('alerts').innerHTML = '';
    document.getElementById('step5').classList.add('hidden');
    
    // Validate inputs
    const errors = validateInputs();
    if (errors.length > 0) {
        showAlert('error', errors.join('<br>'));
        return;
    }
    
    // Parse diff
    try {
        state.parsedDiff = parseDiff(state.diffContent);
    } catch (error) {
        showAlert('error', 'Failed to parse diff file: ' + error.message);
        return;
    }
    
    // Start processing
    const processBtn = document.getElementById('processBtn');
    processBtn.disabled = true;
    processBtn.innerHTML = '<span class="spinner"></span><span>Processing...</span>';
    
    const progressContainer = document.getElementById('progressContainer');
    progressContainer.classList.remove('hidden');
    
    const formality = document.querySelector('input[name="formality"]:checked').value;
    
    try {
        // Create a copy of L2 JSON
        const newL2Json = { ...state.l2Json };
        state.changes = [];
        state.orphanedKeys = [];
        
        const totalOperations = state.parsedDiff.added.length + 
                               state.parsedDiff.modified.length + 
                               state.parsedDiff.removed.length;
        let completed = 0;
        
        // Process removed keys
        for (const item of state.parsedDiff.removed) {
            if (newL2Json.hasOwnProperty(item.key)) {
                delete newL2Json[item.key];
                state.changes.push({
                    type: 'removed',
                    key: item.key,
                    oldValue: state.l2Json[item.key]
                });
            }
            completed++;
            updateProgress(completed, totalOperations, 'Removing keys...');
        }
        
        // Process added keys in batches
        if (state.parsedDiff.added.length > 0) {
            const addedChunks = chunkArray(state.parsedDiff.added, 50);
            let addedProcessed = 0;
            
            for (const chunk of addedChunks) {
                try {
                    const textsToTranslate = chunk.map(item => item.value);
                    const translations = await translateTexts(textsToTranslate, state.l2Language.code, formality);
                    
                    // Process each translation
                    chunk.forEach((item, index) => {
                        const translated = translations[index];
                        
                        // Validate variables
                        if (!validateVariables(item.value, translated)) {
                            showAlert('warning', `Variable mismatch in key "${item.key}". Original: ${item.value}, Translated: ${translated}`);
                        }
                        
                        newL2Json[item.key] = translated;
                        state.changes.push({
                            type: 'added',
                            key: item.key,
                            newValue: translated
                        });
                        
                        addedProcessed++;
                        completed++;
                    });
                    
                    updateProgress(completed, totalOperations, `Translating new keys... (${addedProcessed}/${state.parsedDiff.added.length})`);
                    
                    // Small delay between batches
                    if (addedChunks.length > 1) {
                        await sleep(200);
                    }
                } catch (error) {
                    showAlert('error', `Failed to translate batch of keys: ${error.message}`);
                    throw error;
                }
            }
        }
        
        // Process modified keys in batches
        if (state.parsedDiff.modified.length > 0) {
            const modifiedChunks = chunkArray(state.parsedDiff.modified, 50);
            let modifiedProcessed = 0;
            
            for (const chunk of modifiedChunks) {
                try {
                    const textsToTranslate = chunk.map(item => item.newValue);
                    const translations = await translateTexts(textsToTranslate, state.l2Language.code, formality);
                    
                    // Process each translation
                    chunk.forEach((item, index) => {
                        const translated = translations[index];
                        
                        // Validate variables
                        if (!validateVariables(item.newValue, translated)) {
                            showAlert('warning', `Variable mismatch in key "${item.key}". Original: ${item.newValue}, Translated: ${translated}`);
                        }
                        
                        const oldValue = newL2Json[item.key];
                        newL2Json[item.key] = translated;
                        state.changes.push({
                            type: 'modified',
                            key: item.key,
                            oldValue: oldValue,
                            newValue: translated
                        });
                        
                        modifiedProcessed++;
                        completed++;
                    });
                    
                    updateProgress(completed, totalOperations, `Updating modified keys... (${modifiedProcessed}/${state.parsedDiff.modified.length})`);
                    
                    // Small delay between batches
                    if (modifiedChunks.length > 1) {
                        await sleep(200);
                    }
                } catch (error) {
                    showAlert('error', `Failed to translate batch of keys: ${error.message}`);
                    throw error;
                }
            }
        }
        
        // Find orphaned keys (exist in L2 but were removed from L1)
        const allL1Keys = new Set([
            ...state.parsedDiff.added.map(item => item.key),
            ...state.parsedDiff.modified.map(item => item.key),
            ...Object.keys(state.l2Json).filter(key => {
                return !state.parsedDiff.removed.some(item => item.key === key);
            })
        ]);
        
        for (const key of Object.keys(state.l2Json)) {
            if (state.parsedDiff.removed.some(item => item.key === key)) {
                state.orphanedKeys.push(key);
            }
        }
        
        state.outputJson = newL2Json;
        
        // Validate output JSON
        try {
            JSON.stringify(newL2Json);
        } catch (error) {
            throw new Error('Output JSON is invalid: ' + error.message);
        }
        
        // Show results
        showResults();
        showAlert('success', `Translation completed successfully! ${state.changes.length} changes made.`);
        
    } catch (error) {
        showAlert('error', error.message);
    } finally {
        processBtn.disabled = false;
        processBtn.innerHTML = '<span>Start Translation</span>';
        progressContainer.classList.add('hidden');
    }
}

// Update progress bar
function updateProgress(current, total, message) {
    const percent = (current / total) * 100;
    document.getElementById('progressFill').style.width = percent + '%';
    document.getElementById('progressText').textContent = message;
}

// Show results
function showResults() {
    const step5 = document.getElementById('step5');
    step5.classList.remove('hidden');
    
    // Show orphaned keys if any
    if (state.orphanedKeys.length > 0) {
        const commentsContainer = document.getElementById('commentsContainer');
        const commentsList = document.getElementById('commentsList');
        commentsContainer.classList.remove('hidden');
        commentsList.innerHTML = '';
        
        state.orphanedKeys.forEach(key => {
            const li = document.createElement('li');
            li.textContent = key;
            commentsList.appendChild(li);
        });
    }
    
    // Show changes
    if (state.changes.length > 0) {
        const changesContainer = document.getElementById('changesContainer');
        const changesList = document.getElementById('changesList');
        changesContainer.classList.remove('hidden');
        changesList.innerHTML = '';
        
        state.changes.forEach(change => {
            const item = document.createElement('div');
            item.className = 'comparison-item';
            
            const key = document.createElement('div');
            key.className = 'comparison-key';
            key.textContent = `"${change.key}"`;
            item.appendChild(key);
            
            if (change.type === 'removed') {
                const label = document.createElement('div');
                label.className = 'comparison-label';
                label.textContent = 'REMOVED';
                label.style.color = 'var(--error)';
                item.appendChild(label);
                
                const oldDiv = document.createElement('div');
                oldDiv.className = 'comparison-old';
                oldDiv.textContent = change.oldValue;
                item.appendChild(oldDiv);
            } else if (change.type === 'added') {
                const label = document.createElement('div');
                label.className = 'comparison-label';
                label.textContent = 'ADDED';
                label.style.color = 'var(--success)';
                item.appendChild(label);
                
                const newDiv = document.createElement('div');
                newDiv.className = 'comparison-new';
                newDiv.textContent = change.newValue;
                item.appendChild(newDiv);
            } else {
                const values = document.createElement('div');
                values.className = 'comparison-values';
                
                const oldDiv = document.createElement('div');
                oldDiv.className = 'comparison-old';
                oldDiv.innerHTML = `<div class="comparison-label">Old</div>${escapeHtml(change.oldValue)}`;
                
                const newDiv = document.createElement('div');
                newDiv.className = 'comparison-new';
                newDiv.innerHTML = `<div class="comparison-label">New</div>${escapeHtml(change.newValue)}`;
                
                values.appendChild(oldDiv);
                values.appendChild(newDiv);
                item.appendChild(values);
            }
            
            changesList.appendChild(item);
        });
    }
    
    // Show output JSON with syntax highlighting
    const outputJson = document.getElementById('outputJson');
    outputJson.textContent = JSON.stringify(state.outputJson, null, 2);
    
    // Scroll to results
    step5.scrollIntoView({ behavior: 'smooth' });
}

// Show alert
function showAlert(type, message) {
    const alertsContainer = document.getElementById('alerts');
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = message;
    alertsContainer.appendChild(alert);
}

// Copy to clipboard
async function copyToClipboard() {
    const json = JSON.stringify(state.outputJson, null, 2);
    try {
        await navigator.clipboard.writeText(json);
        showAlert('success', 'JSON copied to clipboard!');
    } catch (error) {
        showAlert('error', 'Failed to copy to clipboard: ' + error.message);
    }
}

// Download JSON
function downloadJson() {
    const json = JSON.stringify(state.outputJson, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.l2Language.code.toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showAlert('success', 'JSON file downloaded!');
}

// Process another language
function processAnother() {
    // Clear L2 inputs and results
    document.getElementById('l2Json').value = '';
    document.getElementById('step5').classList.add('hidden');
    document.getElementById('alerts').innerHTML = '';
    
    // Clear L2 language selection
    document.getElementById('l2LanguageGrid').querySelectorAll('.language-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    document.getElementById('l2Custom').value = '';
    
    state.l2Language = '';
    state.l2Json = null;
    state.outputJson = null;
    state.changes = [];
    state.orphanedKeys = [];
    
    // Scroll to L2 section
    document.getElementById('step3').scrollIntoView({ behavior: 'smooth' });
}

// Reset all
function resetAll() {
    if (confirm('Are you sure you want to reset all inputs?')) {
        location.reload();
    }
}

// Helper functions
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Register service worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(err => {
            console.log('Service Worker registration failed:', err);
        });
    });
}
