# AVL Tree Visualizer

An interactive web application for visualizing AVL (Adelson-Velsky and Landis) trees with smooth animations and intuitive controls.

## Features

### Core Functionality

- **Node Operations**: Add, delete, and search nodes with visual feedback
- **Automatic Rebalancing**: Watch the tree automatically rebalance using LL, RR, LR, and RL rotations
- **Tree Traversals**: Visualize in-order, pre-order, and post-order traversals
- **Undo/Redo**: Track operation history and revert changes
- **Real-time Visualization**: See height and balance factor for each node

### Visual Effects

- **Smooth Animations**: Framer Motion powered transitions for all operations
- **Node Highlighting**: Visual feedback during search and traversal operations
- **Rotation Animations**: Watch tree restructuring during rebalancing
- **Auto-layout**: Intelligent positioning of nodes in tree structure

### User Interface

- **Modern Design**: Clean, minimalist interface with brown/orange color scheme
- **Responsive Layout**: Works on desktop and mobile devices
- **Interactive Controls**: Intuitive buttons and input fields
- **Status Indicators**: Real-time feedback on operations and tree state

## Technology Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Custom AVL Tree Implementation**

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd avl-tree-visualizer
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Usage

### Adding Nodes

1. Enter a numeric value in the "Enter value" field
2. Click "Add" to insert the node
3. Watch the tree automatically rebalance if needed

### Deleting Nodes

1. Enter the value of the node to delete
2. Click "Delete" to remove the node
3. The tree will rebalance automatically

### Searching Nodes

1. Enter the value to search for
2. Click "Search" to highlight the node
3. The node will be highlighted with a glow effect

### Tree Traversals

- **In-order**: Left → Root → Right
- **Pre-order**: Root → Left → Right
- **Post-order**: Left → Right → Root

Click any traversal button to see the sequence of nodes.

### History Operations

- **Undo**: Revert the last operation
- **Redo**: Replay a reverted operation
- **Clear**: Remove all nodes from the tree

## Project Structure

```
src/
├── components/          # React components
│   ├── TreeNode.tsx     # Individual node component
│   ├── TreeCanvas.tsx   # Main tree visualization
│   ├── ControlPanel.tsx # Operation controls
│   └── TraversalDisplay.tsx # Traversal results
├── hooks/              # Custom React hooks
│   └── useTreeState.ts  # Tree state management
├── utils/              # Utility functions
│   ├── avlTree.ts      # AVL tree implementation
│   ├── treeLayout.ts   # Node positioning algorithm
│   └── animations.ts   # Animation configurations
├── types/              # TypeScript interfaces
│   └── index.ts        # Type definitions
└── App.tsx            # Main application component
```

## Key Algorithms

### AVL Tree Implementation

- **Insertion**: Standard BST insertion with automatic rebalancing
- **Deletion**: BST deletion with automatic rebalancing
- **Rotations**: LL, RR, LR, and RL rotation algorithms
- **Height Calculation**: Automatic height and balance factor updates

### Tree Layout

- **Reingold-Tilford Algorithm**: Automatic node positioning
- **Collision Detection**: Prevents node overlaps
- **Dynamic Sizing**: Adapts to tree size and structure

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Acknowledgments

- AVL tree algorithm by Adelson-Velsky and Landis
- Framer Motion for smooth animations
- Tailwind CSS for utility-first styling
- React team for the excellent framework
