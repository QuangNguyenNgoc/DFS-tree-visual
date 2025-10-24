import React from 'react';
import { motion } from 'framer-motion';
import { TraversalResult } from '../types';

interface TraversalDisplayProps {
  traversal: TraversalResult;
}

export const TraversalDisplay: React.FC<TraversalDisplayProps> = ({ traversal }) => {
  const getTraversalName = (type: string) => {
    switch (type) {
      case 'inorder': return 'In-order';
      case 'preorder': return 'Pre-order';
      case 'postorder': return 'Post-order';
      default: return type;
    }
  };

  const getTraversalDescription = (type: string) => {
    switch (type) {
      case 'inorder': return 'Left → Root → Right';
      case 'preorder': return 'Root → Left → Right';
      case 'postorder': return 'Left → Right → Root';
      default: return '';
    }
  };

  if (!traversal.sequence.length) {
    return null;
  }

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-3">
        <h3 className="text-lg font-semibold text-brown-700">
          {getTraversalName(traversal.type)} Traversal
        </h3>
        <p className="text-sm text-brown-600">
          {getTraversalDescription(traversal.type)}
        </p>
      </div>

      <div className="space-y-2">
        <div className="text-sm font-medium text-brown-600">Sequence:</div>
        <div className="flex flex-wrap gap-2">
          {traversal.sequence.map((value, index) => (
            <motion.span
              key={`${value}-${index}`}
              className="bg-orange-200 text-brown-800 px-3 py-1 rounded-full text-sm font-medium"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.3
              }}
            >
              {value}
            </motion.span>
          ))}
        </div>
      </div>

      {traversal.isAnimating && (
        <motion.div
          className="mt-3 text-center text-brown-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="animate-pulse">Animating traversal...</div>
        </motion.div>
      )}
    </motion.div>
  );
};
