
## VSCode插件

### Auto Close Tag

> 自动添加HTML/XML关闭标签
> [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)

<img src="https://github.com/formulahendry/vscode-auto-close-tag/raw/master/images/usage.gif" width="100%" />  


### Auto Rename Tag
### Better Comments
### Bracket Pair Colorizer
### Code Runner
### Code Spell Checker
### Color Highlight
### Color Info
### CSS Peek
### cssrem
### ESLint
### filesize
### Git History
### GitLens — Git supercharged
### HTML CSS Support
### HTML Snippets
### HTMLHint
### IntelliSense for CSS class names in HTML
### Import Cost
### JS JSX Snippets
### Markdown Preview Enhanced
### npm Intellisense
### Path Intellisense
### Project Manager
### Pug (Jade) snippets
### TODO Highlight
### Settings Sync
### vscode-fileheader
### Vetur
### VueHelper

## VSCode配置

```
{
  "editor.tabSize": 2,
  "editor.fontSize": 13,
  "files.associations": {
    "*.vue": "vue",
    "*.js": "javascript"
  },
  "eslint.autoFixOnSave": true,
  "eslint.options": {
    "extensions": [
      ".js",
      ".vue"
    ]
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue",
    "vue-html"
  ],
  "search.exclude": {
    "**/node_modules": true,
    "**/bower_components": true,
    "**/dist": true
  },
  "emmet.syntaxProfiles": {
    "JavaScript React": "jsx",
    "javascript": "jsx",
    "vue": "html",
    "vue-html": "html"
  },
  "editor.renderWhitespace": "boundary",
  "editor.cursorBlinking": "smooth",
  "workbench.colorTheme": "One Dark Pro Vivid",
  "window.zoomLevel": 1,
  "fileheader.Author": "zhanghao",
  "fileheader.LastModifiedBy": "zhanghao",
  "editor.formatOnSave": true,
  "editor.formatOnType": true,
  "prettier.singleQuote": true,
  "prettier.semi": false, // 尾部分号
  "emmet.triggerExpansionOnTab": true,
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "javascript.validate.enable": false,
  "cssrem.autoRemovePrefixZero": true,
  "cssrem.rootFontSize": 108,
  "git.enableSmartCommit": true,
  "explorer.confirmDelete": false,
  "explorer.confirmDragAndDrop": false,
  "gitlens.advanced.messages": {
    "suppressCommitHasNoPreviousCommitWarning": false,
    "suppressCommitNotFoundWarning": false,
    "suppressFileNotUnderSourceControlWarning": true,
    "suppressGitVersionWarning": false,
    "suppressLineUncommittedWarning": false,
    "suppressNoRepositoryWarning": false,
    "suppressResultsExplorerNotice": true,
    "suppressShowKeyBindingsNotice": true,
    "suppressUpdateNotice": true,
    "suppressWelcomeNotice": false
  },
  "git.autofetch": true,
  "editor.fontFamily": "Fira Code",
  "editor.fontLigatures": true,
  "git.confirmSync": false,
  "files.autoSave": "afterDelay",
  "gitlens.keymap": "alternate",
  "workbench.activityBar.visible": true,
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "workbench.iconTheme": "material-icon-theme",
  "material-icon-theme.activeIconPack": "react_redux",
  "material-icon-theme.folders.theme": "classic",
  "material-icon-theme.folders.color": "#90a4ae",
  "material-icon-theme.hidesExplorerArrows": false,
  "material-icon-theme.files.associations": {},
  "material-icon-theme.folders.associations": {},
  "material-icon-theme.languages.associations": {},
  "gitlens.historyExplorer.enabled": true
}
```
