# 🌳 Binary Search Tree Visualizer

A beautiful, interactive Binary Search Tree (BST) visualizer built with vanilla HTML, CSS, and JavaScript. Features modern glassmorphism design, smooth animations, and comprehensive BST operations visualization.

![BST Visualizer Demo](https://img.shields.io/badge/Status-Live-brightgreen) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow) ![CSS3](https://img.shields.io/badge/CSS3-Glassmorphism-blue) ![HTML5](https://img.shields.io/badge/HTML5-Semantic-orange)

## ✨ Features

### 🔧 Core Operations
- **Insert Nodes** - Add new values with animated insertion
- **Delete Nodes** - Remove nodes with smooth deletion animations
- **Search Functionality** - Find nodes with path highlighting
- **Clear Tree** - Reset the entire tree structure

### 🎯 Tree Traversals
- **Inorder Traversal** - Left → Root → Right with step-by-step animation
- **Preorder Traversal** - Root → Left → Right with visual progression
- **Postorder Traversal** - Left → Right → Root with highlight sequence
- **Real-time Results** - See traversal output as it progresses

### 📊 Analytics & Stats
- **Node Count** - Total number of nodes in the tree
- **Tree Height** - Maximum depth of the tree
- **Balance Factor** - Left subtree height - Right subtree height
- **Live Updates** - Statistics update in real-time

### 🎨 Modern UI/UX
- **Glassmorphism Design** - Beautiful frosted glass effects
- **Smooth Animations** - CSS cubic-bezier transitions
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Interactive Feedback** - Hover effects and visual confirmations
- **Color-coded Messages** - Success, warning, and error notifications

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required!

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/bst-visualizer.git

# Navigate to project directory
cd bst-visualizer

# Open in browser (choose one method)
# Method 1: Direct file opening
open index.html

# Method 2: Using Python's built-in server
python -m http.server 8000
# Then visit: http://localhost:8000

# Method 3: Using Node.js http-server
npx http-server
# Then visit: http://localhost:8080

# Method 4: Using Live Server (VS Code extension)
# Right-click on index.html → "Open with Live Server"
```

### Project Structure
```
bst-visualizer/
├── index.html          # Main HTML structure
├── styles.css          # Glassmorphism styling & animations
├── script.js           # BST logic & visualization
└── README.md           # This file
```

## 🎮 Usage Guide

### Basic Operations
```bash
# Insert a node
1. Enter a number (1-999) in the input field
2. Click "Insert" or press Enter

# Delete a node
1. Enter the value to delete
2. Click "Delete"

# Generate random tree
Click "Random Tree" to create a sample BST with 8-12 nodes

# Clear everything
Click "Clear Tree" to remove all nodes
```

### Tree Traversals
```bash
# Start traversal animations
Click "Inorder"    # Shows: Left → Root → Right
Click "Preorder"   # Shows: Root → Left → Right  
Click "Postorder"  # Shows: Left → Right → Root

# Stop current traversal
Click "Stop" or press 'S' key
```

### Keyboard Shortcuts
```bash
C       # Clear tree
R       # Generate random tree
I       # Inorder traversal
P       # Preorder traversal
T       # Postorder traversal
S       # Stop traversal
ESC     # Stop traversal
```

## 🛠️ Technical Implementation

### BST Algorithm Complexity
```bash
# Time Complexities
Insert:     O(log n) average, O(n) worst case
Delete:     O(log n) average, O(n) worst case  
Search:     O(log n) average, O(n) worst case
Traversal:  O(n) for all types

# Space Complexity
Overall:    O(n) for storing n nodes
Recursion:  O(h) where h is tree height
```

### Technology Stack
- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3 with Glassmorphism effects
- **Graphics**: SVG for tree visualization
- **Animation**: CSS transitions + JavaScript timing
- **Architecture**: Object-oriented design patterns

### Core Classes
```javascript
class TreeNode {
    // Individual BST node with value and children
}

class BinarySearchTree {
    // BST data structure with core operations
}

class BSTVisualizer {
    // Handles rendering and animations
}
```

## 🎨 Customization

### Modify Colors
```css
/* Edit styles.css */
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --glass-bg: rgba(255, 255, 255, 0.1);
    --accent-color: #ffd700;
}
```

### Adjust Animation Speed
```javascript
// Edit script.js
const ANIMATION_DURATION = 1000; // milliseconds
const TRAVERSAL_DELAY = 800;     // milliseconds between highlights
```

### Change Tree Layout
```javascript
// Modify node positioning in calculatePositions()
const NODE_SPACING = 200;        // horizontal spacing
const LEVEL_HEIGHT = 80;         // vertical spacing between levels
```

## 📱 Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 60+     | ✅ Full Support |
| Firefox | 55+     | ✅ Full Support |
| Safari  | 12+     | ✅ Full Support |
| Edge    | 79+     | ✅ Full Support |
| Mobile  | Modern  | ✅ Responsive |

## 🤝 Contributing

### Development Setup
```bash
# Fork the repository
git clone https://github.com/yourusername/bst-visualizer.git
cd bst-visualizer

# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and test
# Open index.html in browser to test

# Commit changes
git add .
git commit -m "Add amazing feature"

# Push to branch
git push origin feature/amazing-feature

# Open Pull Request on GitHub
```


## 🐛 Known Issues & Solutions

### Common Problems
```bash
# Animation not smooth?
Solution: Check browser hardware acceleration is enabled

# SVG not rendering properly?
Solution: Ensure viewport meta tag is present in HTML

# Mobile touch not working?
Solution: Verify touch event listeners are properly attached

# Glassmorphism effects not visible?
Solution: Update to modern browser with backdrop-filter support
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by computer science education tools
- Glassmorphism design trend
- Modern web development best practices
- Open source community feedback

## ⭐ Show Your Support

If you found this project helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs and issues
- 💡 Suggesting new features
- 🤝 Contributing to the codebase
- 📢 Sharing with others

---

<div align="center">

**[🌐 Live Demo](https://yourusername.github.io/bst-visualizer)** | **[🐛 Report Bug](https://github.com/sohaum/BST-Visualizer/issues)**

Made with ❤️ and lots of ☕

</div>
