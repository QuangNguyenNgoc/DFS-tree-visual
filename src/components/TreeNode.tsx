import React from 'react';
import { motion } from 'framer-motion';
import { TreeNode as TreeNodeType } from '../types';
import { animationConfig, colors } from '../utils/animations';

interface TreeNodeProps {
  node: TreeNodeType;
  position: { x: number; y: number };
  isHighlighted?: boolean;
  isTraversing?: boolean;
  onClick?: (node: TreeNodeType) => void;
}

export const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  position,
  isHighlighted = false,
  isTraversing = false,
  onClick
}) => {
  const getNodeColor = () => {
    if (isTraversing) return colors.node.traversing;
    if (isHighlighted) return colors.node.highlighted;
    return colors.node.default;
  };

  const getNodeVariants = () => {
    if (isTraversing) {
      return {
        ...animationConfig.nodeTraverse,
        animate: {
          ...animationConfig.nodeTraverse.animate,
          backgroundColor: colors.node.traversing
        }
      };
    }
    if (isHighlighted) {
      return animationConfig.nodeHighlight;
    }
    return {
      initial: { scale: 1 },
      animate: { scale: 1 },
      transition: { duration: 0.2 }
    };
  };

  return (
    <motion.div
      className="absolute flex items-center justify-center w-15 h-15 rounded-full border-2 border-brown-800 cursor-pointer select-none"
      style={{
        left: position.x - 30,
        top: position.y - 30,
        backgroundColor: getNodeColor(),
        color: 'white',
        fontSize: '14px',
        fontWeight: 'bold',
        boxShadow: isHighlighted ? '0 0 20px rgba(255, 107, 53, 0.6)' : '0 2px 8px rgba(0,0,0,0.2)'
      }}
      variants={getNodeVariants()}
      initial="initial"
      animate="animate"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick?.(node)}
      layout
    >
      <div className="text-center">
        <div className="text-sm font-bold">{node.value}</div>
        <div className="text-xs opacity-75">
          h:{node.height}
        </div>
        <div className="text-xs opacity-75">
          bf:{node.balanceFactor}
        </div>
      </div>
    </motion.div>
  );
};
