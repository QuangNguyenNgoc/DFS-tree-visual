import React from 'react';
import { motion } from 'framer-motion';
import { useTreeState } from './hooks/useTreeState';
import { TreeCanvas } from './components/TreeCanvas';
import { ControlPanel } from './components/ControlPanel';
import { TraversalDisplay } from './components/TraversalDisplay';

function App() {
  const {
    treeState,
    historyState,
    animationState,
    traversalState,
    inputValue,
    searchValue,
    setInputValue,
    setSearchValue,
    insertNode,
    deleteNode,
    searchNode,
    clearTree,
    undo,
    redo,
    performTraversal
  } = useTreeState();

  const handleInsert = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      insertNode(value);
      setInputValue('');
    }
  };

  const handleDelete = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      deleteNode(value);
      setInputValue('');
    }
  };

  const handleSearch = () => {
    const value = parseInt(searchValue);
    if (!isNaN(value)) {
      searchNode(value);
      setSearchValue('');
    }
  };

  const handleTraversal = (type: 'inorder' | 'preorder' | 'postorder') => {
    performTraversal(type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-brown-800 mb-4">
            AVL Tree Visualizer
          </h1>
          <p className="text-lg text-brown-600 max-w-2xl mx-auto">
            Interactive visualization of AVL (Adelson-Velsky and Landis) trees with 
            automatic rebalancing, node operations, and traversal animations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Control Panel */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ControlPanel
              inputValue={inputValue}
              searchValue={searchValue}
              onInputChange={setInputValue}
              onSearchChange={setSearchValue}
              onInsert={handleInsert}
              onDelete={handleDelete}
              onSearch={handleSearch}
              onClear={clearTree}
              onUndo={undo}
              onRedo={redo}
              onTraversal={handleTraversal}
              canUndo={historyState.canUndo}
              canRedo={historyState.canRedo}
              isAnimating={animationState.isAnimating}
            />
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tree Canvas */}
            <motion.div
              className="bg-white rounded-lg shadow-lg p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-brown-700">Tree Visualization</h2>
                <div className="text-sm text-brown-600">
                  Nodes: {treeState.size}
                </div>
              </div>
              <div className="h-96">
                <TreeCanvas
                  root={treeState.root}
                  highlightedNodes={animationState.highlightedNodes}
                  traversingNodes={[]}
                />
              </div>
            </motion.div>

            {/* Traversal Display */}
            {traversalState.sequence.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <TraversalDisplay traversal={traversalState} />
              </motion.div>
            )}
          </div>
        </div>

        {/* Footer */}
        <motion.div
          className="text-center mt-12 text-brown-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-sm">
            Built with React, TypeScript, Tailwind CSS, and Framer Motion
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
