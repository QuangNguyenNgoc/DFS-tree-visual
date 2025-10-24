import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { TreeNode as TreeNodeType } from '../types';
import { TreeNode } from './TreeNode';
import { TreeLayout } from '../utils/treeLayout';
import { animationConfig } from '../utils/animations';

interface TreeCanvasProps {
  root: TreeNodeType | null;
  highlightedNodes: string[];
  traversingNodes: string[];
  onNodeClick?: (node: TreeNodeType) => void;
}

export const TreeCanvas: React.FC<TreeCanvasProps> = ({
  root,
  highlightedNodes,
  traversingNodes,
  onNodeClick
}) => {
  const { positions, connections, bounds } = useMemo(() => {
    const positions = TreeLayout.calculatePositions(root);
    const connections = TreeLayout.getConnections(root, positions);
    const bounds = TreeLayout.getTreeBounds(positions);
    
    return { positions, connections, bounds };
  }, [root]);

  const renderConnections = () => {
    return connections.map((connection, index) => (
      <motion.line
        key={`connection-${index}`}
        x1={connection.from.x}
        y1={connection.from.y}
        x2={connection.to.x}
        y2={connection.to.y}
        stroke="#8B4513"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      />
    ));
  };

  const renderNodes = () => {
    if (!root) return null;

    const renderNode = (node: TreeNodeType | null): React.ReactNode => {
      if (!node) return null;

      const position = positions.get(node.id);
      if (!position) return null;

      const isHighlighted = highlightedNodes.includes(node.id);
      const isTraversing = traversingNodes.includes(node.id);

      return (
        <TreeNode
          key={node.id}
          node={node}
          position={position}
          isHighlighted={isHighlighted}
          isTraversing={isTraversing}
          onClick={onNodeClick}
        />
      );
    };

    const collectAllNodes = (node: TreeNodeType | null): TreeNodeType[] => {
      if (!node) return [];
      return [node, ...collectAllNodes(node.left), ...collectAllNodes(node.right)];
    };

    return collectAllNodes(root).map(renderNode);
  };

  if (!root) {
    return (
      <div className="flex items-center justify-center h-full bg-orange-50 rounded-lg border-2 border-dashed border-brown-300">
        <div className="text-center text-brown-600">
          <div className="text-2xl mb-2">🌳</div>
          <div className="text-lg font-medium">Empty Tree</div>
          <div className="text-sm opacity-75">Add some nodes to get started!</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-orange-50 rounded-lg border border-brown-200 overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ minHeight: Math.max(bounds.height, 400) }}
      >
        {renderConnections()}
      </svg>
      <div className="relative w-full h-full" style={{ minHeight: Math.max(bounds.height, 400) }}>
        {renderNodes()}
      </div>
    </div>
  );
};
