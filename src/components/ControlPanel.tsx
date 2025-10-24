import React from 'react';
import { motion } from 'framer-motion';

interface ControlPanelProps {
  inputValue: string;
  searchValue: string;
  onInputChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onInsert: () => void;
  onDelete: () => void;
  onSearch: () => void;
  onClear: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onTraversal: (type: 'inorder' | 'preorder' | 'postorder') => void;
  canUndo: boolean;
  canRedo: boolean;
  isAnimating: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  inputValue,
  searchValue,
  onInputChange,
  onSearchChange,
  onInsert,
  onDelete,
  onSearch,
  onClear,
  onUndo,
  onRedo,
  onTraversal,
  canUndo,
  canRedo,
  isAnimating
}) => {
  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-brown-800 mb-2">AVL Tree Visualizer</h2>
        <p className="text-brown-600">Interactive AVL tree with animations</p>
      </div>

      {/* Node Operations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-brown-700">Node Operations</h3>
        
        <div className="flex gap-2">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Enter value"
            className="input-field flex-1"
            disabled={isAnimating}
          />
          <motion.button
            className="btn-primary"
            onClick={onInsert}
            disabled={isAnimating || !inputValue}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Add
          </motion.button>
          <motion.button
            className="btn-danger"
            onClick={onDelete}
            disabled={isAnimating || !inputValue}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Delete
          </motion.button>
        </div>

        <div className="flex gap-2">
          <input
            type="number"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search value"
            className="input-field flex-1"
            disabled={isAnimating}
          />
          <motion.button
            className="btn-secondary"
            onClick={onSearch}
            disabled={isAnimating || !searchValue}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Search
          </motion.button>
        </div>
      </div>

      {/* History Operations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-brown-700">History</h3>
        
        <div className="flex gap-2">
          <motion.button
            className="btn-primary flex-1"
            onClick={onUndo}
            disabled={!canUndo || isAnimating}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            ↶ Undo
          </motion.button>
          <motion.button
            className="btn-primary flex-1"
            onClick={onRedo}
            disabled={!canRedo || isAnimating}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            ↷ Redo
          </motion.button>
        </div>

        <motion.button
          className="btn-danger w-full"
          onClick={onClear}
          disabled={isAnimating}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Clear Tree
        </motion.button>
      </div>

      {/* Traversal Operations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-brown-700">Traversals</h3>
        
        <div className="grid grid-cols-1 gap-2">
          <motion.button
            className="btn-secondary"
            onClick={() => onTraversal('inorder')}
            disabled={isAnimating}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            In-order Traversal
          </motion.button>
          <motion.button
            className="btn-secondary"
            onClick={() => onTraversal('preorder')}
            disabled={isAnimating}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Pre-order Traversal
          </motion.button>
          <motion.button
            className="btn-secondary"
            onClick={() => onTraversal('postorder')}
            disabled={isAnimating}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Post-order Traversal
          </motion.button>
        </div>
      </div>

      {/* Status */}
      {isAnimating && (
        <motion.div
          className="text-center text-brown-600 bg-orange-100 rounded-lg p-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="animate-spin w-4 h-4 border-2 border-brown-600 border-t-transparent rounded-full mx-auto mb-2"></div>
          Processing...
        </motion.div>
      )}
    </div>
  );
};
