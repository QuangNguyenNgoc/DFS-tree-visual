export interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  height: number;
  balanceFactor: number;
  id: string;
  x?: number;
  y?: number;
  isHighlighted?: boolean;
  isTraversing?: boolean;
}

export interface TreeState {
  root: TreeNode | null;
  size: number;
}

export interface Operation {
  type: 'insert' | 'delete' | 'search' | 'clear';
  value?: number;
  timestamp: number;
}

export interface HistoryState {
  operations: Operation[];
  currentIndex: number;
  canUndo: boolean;
  canRedo: boolean;
}

export interface AnimationState {
  isAnimating: boolean;
  currentOperation: string | null;
  highlightedNodes: string[];
}

export interface TraversalResult {
  type: 'inorder' | 'preorder' | 'postorder';
  sequence: number[];
  isAnimating: boolean;
}

export type RotationType = 'LL' | 'RR' | 'LR' | 'RL' | null;

export interface NodePosition {
  x: number;
  y: number;
  level: number;
}
