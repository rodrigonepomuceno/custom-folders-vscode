# Custom Folders Extension

This VS Code extension helps you create standardized folder structures for your projects.

# Install
npm run compile && vsce package --allow-missing-repository && code --install-extension custom-folders-0.0.1.vsix --force

# Personalized Folders
In root project create
feature_structure.json 

```
{
  "feature_name": "new_feature",
  "folders": [
    "new_folder/folder1",
    "new_folder/folder2"    
  ]
}```

Or default folders
```
{
  "feature_name": "new_feature",
  "folders": [
    "data/datasources",
    "data/models",
    "data/repositories",
    "domain/entities",
    "domain/repositories",
    "domain/usecases",
    "presentation/cubit",
    "presentation/pages"
  ]
}````