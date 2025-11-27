# Sample GitLab Diff File for Testing

This is an example diff file you can use to test the Pritish Lifesaving Translator 3000.

## Sample Diff Content

```diff
diff --git a/src/locales/fr.json b/src/locales/fr.json
index ad994bab64c4753b5c2671a5519d47232c95a93b..f7a546b201dfc7d15f079e792930af5824ca9f2e 100644
--- a/src/locales/fr.json
+++ b/src/locales/fr.json
@@ -1,10 +1,12 @@
 {
   "Welcome": "Bienvenue",
-  "Hello {{name}}": "Bonjour {{name}}",
+  "Hello {{name}}": "Salut {{name}}",
   "Goodbye": "Au revoir",
+  "New feature": "Nouvelle fonctionnalité",
   "Settings": "Paramètres",
-  "Delete project": "Supprimer le projet",
   "Save changes": "Enregistrer les modifications",
+  "Cancel": "Annuler",
+  "Are you sure?": "Êtes-vous sûr ?",
   "Profile": "Profil"
 }
```

## Sample L2 JSON (Spanish)

If you're translating the above French changes to Spanish, paste this as your current L2 JSON:

```json
{
  "Welcome": "Bienvenido",
  "Hello {{name}}": "Hola {{name}}",
  "Goodbye": "Adiós",
  "Settings": "Configuración",
  "Delete project": "Eliminar proyecto",
  "Save changes": "Guardar cambios",
  "Profile": "Perfil"
}
```

## Expected Results

After processing, you should see:

**Changes:**
1. **Modified**: "Hello {{name}}" → "Hola {{name}}" changes to something like "Saludos {{name}}" (informal greeting)
2. **Added**: "New feature" → "Nueva función" (translated)
3. **Added**: "Cancel" → "Cancelar" (translated)
4. **Added**: "Are you sure?" → "¿Estás seguro?" (translated)
5. **Removed**: "Delete project" (removed from output)

**Orphaned Keys:**
- "Delete project" (existed in L2 but was removed from L1)

## How to Use This Sample

1. Copy the diff content above
2. Select French as L1 (source language)
3. Paste the diff in Step 2
4. Select Spanish as L2 (target language)
5. Paste the L2 JSON in Step 3
6. Click "Start Translation"

This will demonstrate all features:
- ✅ Variable preservation ({{name}})
- ✅ Modified translations
- ✅ New additions
- ✅ Key removal
- ✅ Orphaned key detection
