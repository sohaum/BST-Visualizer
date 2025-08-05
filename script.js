// BST Node class
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.x = 0;
        this.y = 0;
        this.id = `node-${value}-${Date.now()}`;
    }
}

// BST class
class BinarySearchTree {
    constructor() {
        this.root = null;
        this.nodeCount = 0;
    }

    insert(value) {
        const newNode = new TreeNode(value);
        if (!this.root) {
            this.root = newNode;
            this.nodeCount++;
            return newNode;
        }

        let current = this.root;
        while (true) {
            if (value < current.value) {
                if (!current.left) {
                    current.left = newNode;
                    this.nodeCount++;
                    return newNode;
                }
                current = current.left;
            } else if (value > current.value) {
                if (!current.right) {
                    current.right = newNode;
                    this.nodeCount++;
                    return newNode;
                }
                current = current.right;
            } else {
                return null; // Value already exists
            }
        }
    }

    delete(value) {
        const result = this.deleteNode(this.root, value);
        if (result.deleted) {
            this.nodeCount--;
        }
        this.root = result.node;
        return result.deleted;
    }

    deleteNode(node, value) {
        if (!node) {
            return { node: null, deleted: false };
        }

        if (value < node.value) {
            const result = this.deleteNode(node.left, value);
            node.left = result.node;
            return { node, deleted: result.deleted };
        } else if (value > node.value) {
            const result = this.deleteNode(node.right, value);
            node.right = result.node;
            return { node, deleted: result.deleted };
        } else {
            // Node to delete found
            if (!node.left && !node.right) {
                return { node: null, deleted: true };
            }
            if (!node.left) {
                return { node: node.right, deleted: true };
            }
            if (!node.right) {
                return { node: node.left, deleted: true };
            }

            // Node has two children
            const successor = this.findMin(node.right);
            node.value = successor.value;
            const result = this.deleteNode(node.right, successor.value);
            node.right = result.node;
            return { node, deleted: true };
        }
    }

    findMin(node) {
        while (node.left) {
            node = node.left;
        }
        return node;
    }

    search(value) {
        let current = this.root;
        const path = [];
        
        while (current) {
            path.push(current);
            if (value === current.value) {
                return { found: true, path };
            } else if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return { found: false, path };
    }

    getHeight(node = this.root) {
        if (!node) return 0;
        return 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    }

    getBalanceFactor(node = this.root) {
        if (!node) return 0;
        return this.getHeight(node.left) - this.getHeight(node.right);
    }

    inorderTraversal(node = this.root, result = []) {
        if (node) {
            this.inorderTraversal(node.left, result);
            result.push(node);
            this.inorderTraversal(node.right, result);
        }
        return result;
    }

    preorderTraversal(node = this.root, result = []) {
        if (node) {
            result.push(node);
            this.preorderTraversal(node.left, result);
            this.preorderTraversal(node.right, result);
        }
        return result;
    }

    postorderTraversal(node = this.root, result = []) {
        if (node) {
            this.postorderTraversal(node.left, result);
            this.postorderTraversal(node.right, result);
            result.push(node);
        }
        return result;
    }

    clear() {
        this.root = null;
        this.nodeCount = 0;
    }
}

// Visualizer class
class BSTVisualizer {
    constructor() {
        this.bst = new BinarySearchTree();
        this.svg = document.getElementById('treeSvg');
        this.traversalInProgress = false;
        this.traversalTimeouts = [];
        
        this.initializeSVG();
        this.updateStats();
    }

    initializeSVG() {
        const rect = this.svg.getBoundingClientRect();
        this.svg.setAttribute('viewBox', `0 0 ${rect.width || 1200} ${rect.height || 600}`);
    }

    calculatePositions(node, x, y, spacing) {
        if (!node) return;

        node.x = x;
        node.y = y;

        if (node.left) {
            this.calculatePositions(node.left, x - spacing, y + 80, spacing * 0.7);
        }
        if (node.right) {
            this.calculatePositions(node.right, x + spacing, y + 80, spacing * 0.7);
        }
    }

    render() {
        // Clear previous render
        while (this.svg.lastChild && this.svg.lastChild.tagName !== 'defs') {
            this.svg.removeChild(this.svg.lastChild);
        }

        if (!this.bst.root) {
            this.updateStats();
            return;
        }

        const svgRect = this.svg.getBoundingClientRect();
        const centerX = (svgRect.width || 1200) / 2;
        const startY = 60;
        const initialSpacing = Math.min(200, (svgRect.width || 1200) / 6);

        this.calculatePositions(this.bst.root, centerX, startY, initialSpacing);
        this.renderEdges(this.bst.root);
        this.renderNodes(this.bst.root);
        this.updateStats();
    }

    renderEdges(node) {
        if (!node) return;

        if (node.left) {
            this.createEdge(node, node.left);
            this.renderEdges(node.left);
        }
        if (node.right) {
            this.createEdge(node, node.right);
            this.renderEdges(node.right);
        }
    }

    createEdge(parent, child) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', parent.x);
        line.setAttribute('y1', parent.y);
        line.setAttribute('x2', child.x);
        line.setAttribute('y2', child.y);
        line.setAttribute('stroke', 'rgba(255, 255, 255, 0.6)');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('class', 'tree-edge');
        line.setAttribute('id', `edge-${parent.id}-${child.id}`);
        this.svg.appendChild(line);
    }

    renderNodes(node) {
        if (!node) return;

        this.createNode(node);
        
        if (node.left) this.renderNodes(node.left);
        if (node.right) this.renderNodes(node.right);
    }

    createNode(node) {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('class', 'tree-node fade-in');
        group.setAttribute('id', node.id);
        group.setAttribute('transform', `translate(${node.x}, ${node.y})`);

        // Node circle with glassmorphism effect
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('r', '25');
        circle.setAttribute('fill', 'url(#nodeGradient)');
        circle.setAttribute('stroke', 'rgba(255, 255, 255, 0.5)');
        circle.setAttribute('stroke-width', '2');
        circle.setAttribute('filter', 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))');

        // Node text
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'central');
        text.setAttribute('fill', 'rgba(0, 0, 0, 0.8)');
        text.setAttribute('font-weight', '600');
        text.setAttribute('font-size', '16');
        text.textContent = node.value;

        group.appendChild(circle);
        group.appendChild(text);
        this.svg.appendChild(group);

        // Add hover effects
        group.addEventListener('mouseenter', () => {
            circle.setAttribute('fill', 'url(#highlightGradient)');
            circle.setAttribute('r', '28');
        });

        group.addEventListener('mouseleave', () => {
            if (!group.classList.contains('highlight')) {
                circle.setAttribute('fill', 'url(#nodeGradient)');
                circle.setAttribute('r', '25');
            }
        });
    }

    insertWithAnimation(value) {
        const existingNode = this.bst.search(value);
        if (existingNode.found) {
            this.showMessage(`Value ${value} already exists!`, 'warning');
            return;
        }

        const insertedNode = this.bst.insert(value);
        if (insertedNode) {
            this.render();
            
            // Add insertion animation
            setTimeout(() => {
                const nodeElement = document.getElementById(insertedNode.id);
                if (nodeElement) {
                    nodeElement.classList.add('inserting');
                    setTimeout(() => {
                        nodeElement.classList.remove('inserting');
                    }, 600);
                }
            }, 50);
            
            this.showMessage(`Inserted ${value}`, 'success');
        }
    }

    deleteWithAnimation(value) {
        const searchResult = this.bst.search(value);
        if (!searchResult.found) {
            this.showMessage(`Value ${value} not found!`, 'warning');
            return;
        }

        const nodeToDelete = searchResult.path[searchResult.path.length - 1];
        const nodeElement = document.getElementById(nodeToDelete.id);
        
        if (nodeElement) {
            nodeElement.classList.add('deleting');
            setTimeout(() => {
                const deleted = this.bst.delete(value);
                if (deleted) {
                    this.render();
                    this.showMessage(`Deleted ${value}`, 'success');
                }
            }, 300);
        }
    }

    async animateTraversal(type) {
        if (this.traversalInProgress) return;
        
        this.clearTraversalHighlights();
        this.traversalInProgress = true;
        
        let traversalOrder = [];
        switch (type) {
            case 'inorder':
                traversalOrder = this.bst.inorderTraversal();
                break;
            case 'preorder':
                traversalOrder = this.bst.preorderTraversal();
                break;
            case 'postorder':
                traversalOrder = this.bst.postorderTraversal();
                break;
        }

        const resultArray = [];
        
        for (let i = 0; i < traversalOrder.length; i++) {
            if (!this.traversalInProgress) break;
            
            const node = traversalOrder[i];
            const nodeElement = document.getElementById(node.id);
            
            if (nodeElement) {
                nodeElement.classList.add('highlight');
                resultArray.push(node.value);
                
                // Update traversal result in real-time
                document.getElementById('traversalResult').textContent = `[${resultArray.join(', ')}]`;
                
                // Highlight connecting edges
                this.highlightPathToNode(node);
                
                await new Promise(resolve => {
                    const timeout = setTimeout(resolve, 1000);
                    this.traversalTimeouts.push(timeout);
                });
                
                if (nodeElement) {
                    nodeElement.classList.remove('highlight');
                }
            }
        }
        
        this.traversalInProgress = false;
        this.clearTraversalHighlights();
    }

    highlightPathToNode(targetNode) {
        const path = this.bst.search(targetNode.value).path;
        
        for (let i = 0; i < path.length - 1; i++) {
            const currentNode = path[i];
            const nextNode = path[i + 1];
            const edgeId = `edge-${currentNode.id}-${nextNode.id}`;
            const edge = document.getElementById(edgeId);
            
            if (edge) {
                edge.classList.add('highlight');
                setTimeout(() => {
                    edge.classList.remove('highlight');
                }, 1000);
            }
        }
    }

    clearTraversalHighlights() {
        const highlightedNodes = document.querySelectorAll('.tree-node.highlight');
        highlightedNodes.forEach(node => node.classList.remove('highlight'));
        
        const highlightedEdges = document.querySelectorAll('.tree-edge.highlight');
        highlightedEdges.forEach(edge => edge.classList.remove('highlight'));
    }

    stopTraversal() {
        this.traversalInProgress = false;
        this.traversalTimeouts.forEach(timeout => clearTimeout(timeout));
        this.traversalTimeouts = [];
        this.clearTraversalHighlights();
        document.getElementById('traversalResult').textContent = '[]';
    }

    generateRandomTree() {
        this.bst.clear();
        const values = [];
        
        // Generate 8-12 random unique values
        const count = Math.floor(Math.random() * 5) + 8;
        while (values.length < count) {
            const value = Math.floor(Math.random() * 100) + 1;
            if (!values.includes(value)) {
                values.push(value);
            }
        }
        
        // Insert values with slight delays for animation effect
        values.forEach((value, index) => {
            setTimeout(() => {
                this.insertWithAnimation(value);
            }, index * 200);
        });
        
        this.showMessage(`Generated random tree with ${count} nodes`, 'success');
    }

    clearTree() {
        this.bst.clear();
        this.render();
        this.stopTraversal();
        this.showMessage('Tree cleared', 'info');
    }

    updateStats() {
        document.getElementById('nodeCount').textContent = this.bst.nodeCount;
        document.getElementById('treeHeight').textContent = this.bst.getHeight();
        document.getElementById('balanceFactor').textContent = this.bst.getBalanceFactor();
    }

    showMessage(message, type = 'info') {
        // Create or get existing message element
        let messageEl = document.getElementById('message');
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.id = 'message';
            messageEl.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 12px;
                color: white;
                font-weight: 500;
                z-index: 1000;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.3);
                transition: all 0.3s ease;
                transform: translateX(100%);
            `;
            document.body.appendChild(messageEl);
        }

        // Set message and style based on type
        messageEl.textContent = message;
        const colors = {
            success: 'rgba(34, 197, 94, 0.9)',
            warning: 'rgba(245, 158, 11, 0.9)',
            error: 'rgba(239, 68, 68, 0.9)',
            info: 'rgba(59, 130, 246, 0.9)'
        };
        
        messageEl.style.background = colors[type] || colors.info;
        messageEl.style.transform = 'translateX(0)';

        // Hide after 3 seconds
        setTimeout(() => {
            messageEl.style.transform = 'translateX(100%)';
        }, 3000);
    }
}

// Global variables and functions
let visualizer;

// Initialize visualizer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    visualizer = new BSTVisualizer();
    
    // Handle Enter key in input
    document.getElementById('nodeInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            insertNode();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        visualizer.render();
    });
});

// Global functions for button handlers
function insertNode() {
    const input = document.getElementById('nodeInput');
    const value = parseInt(input.value);
    
    if (isNaN(value) || value < 1 || value > 999) {
        visualizer.showMessage('Please enter a valid number (1-999)', 'warning');
        return;
    }
    
    visualizer.insertWithAnimation(value);
    input.value = '';
    input.focus();
}

function deleteNode() {
    const input = document.getElementById('nodeInput');
    const value = parseInt(input.value);
    
    if (isNaN(value)) {
        visualizer.showMessage('Please enter a valid number to delete', 'warning');
        return;
    }
    
    visualizer.deleteWithAnimation(value);
    input.value = '';
    input.focus();
}

function clearTree() {
    visualizer.clearTree();
}

function generateRandomTree() {
    visualizer.generateRandomTree();
}

function animateTraversal(type) {
    if (visualizer.bst.nodeCount === 0) {
        visualizer.showMessage('Tree is empty! Add some nodes first.', 'warning');
        return;
    }
    
    visualizer.animateTraversal(type);
}

function stopTraversal() {
    visualizer.stopTraversal();
}

// Additional utility functions
function searchNode(value) {
    const result = visualizer.bst.search(value);
    if (result.found) {
        // Highlight the found node
        const node = result.path[result.path.length - 1];
        const nodeElement = document.getElementById(node.id);
        if (nodeElement) {
            nodeElement.classList.add('highlight');
            setTimeout(() => {
                nodeElement.classList.remove('highlight');
            }, 2000);
        }
        visualizer.showMessage(`Found ${value}!`, 'success');
    } else {
        visualizer.showMessage(`${value} not found in tree`, 'warning');
    }
}

// Performance optimization: Debounced render function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add some keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    
    switch(e.key) {
        case 'c':
        case 'C':
            if (e.ctrlKey || e.metaKey) return; // Don't interfere with copy
            clearTree();
            break;
        case 'r':
        case 'R':
            generateRandomTree();
            break;
        case 'i':
        case 'I':
            animateTraversal('inorder');
            break;
        case 'p':
        case 'P':
            animateTraversal('preorder');
            break;
        case 't':
        case 'T':
            animateTraversal('postorder');
            break;
        case 's':
        case 'S':
            stopTraversal();
            break;
        case 'Escape':
            stopTraversal();
            break;
    }
});

// Add touch support for mobile devices
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    if (!touchStartX || !touchStartY) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    
    // Detect swipe gestures
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left - could trigger some action
            } else {
                // Swipe right - could trigger some action
            }
        }
    }
    
    touchStartX = 0;
    touchStartY = 0;
});

// Add visual feedback for button interactions
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});