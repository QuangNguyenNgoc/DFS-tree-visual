import { useState, useCallback, useReducer } from 'react';
import { TreeNode, TreeState, Operation, HistoryState, AnimationState, TraversalResult } from '../types';
import { AVLTree } from '../utils/avlTree';

interface TreeAction {
  type: 'INSERT' | 'DELETE' | 'SEARCH' | 'CLEAR' | 'UNDO' | 'REDO' | 'SET_HIGHLIGHTED' | 'SET_TRAVERSING';
  payload?: any;
}

const initialState: TreeState = {
  root: null,
  size: 0
};

const initialHistory: HistoryState = {
  operations: [],
  currentIndex: -1,
  canUndo: false,
  canRedo: false
};

const initialAnimation: AnimationState = {
  isAnimating: false,
  currentOperation: null,
  highlightedNodes: []
};

const initialTraversal: TraversalResult = {
  type: 'inorder',
  sequence: [],
  isAnimating: false
};

export const useTreeState = () => {
  const [treeState, setTreeState] = useState<TreeState>(initialState);
  const [historyState, setHistoryState] = useState<HistoryState>(initialHistory);
  const [animationState, setAnimationState] = useState<AnimationState>(initialAnimation);
  const [traversalState, setTraversalState] = useState<TraversalResult>(initialTraversal);
  const [inputValue, setInputValue] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');

  const avlTree = new AVLTree();

  const saveToHistory = useCallback((operation: Operation, newRoot: TreeNode | null) => {
    setHistoryState(prev => {
      const newOperations = [...prev.operations.slice(0, prev.currentIndex + 1), operation];
      return {
        operations: newOperations,
        currentIndex: newOperations.length - 1,
        canUndo: newOperations.length > 0,
        canRedo: false
      };
    });
  }, []);

  const insertNode = useCallback((value: number) => {
    if (isNaN(value)) return;

    setAnimationState(prev => ({
      ...prev,
      isAnimating: true,
      currentOperation: 'insert'
    }));

    const newRoot = avlTree.insert(treeState.root, value);
    const newSize = avlTree.getSize(newRoot);

    setTreeState({
      root: newRoot,
      size: newSize
    });

    saveToHistory({ type: 'insert', value, timestamp: Date.now() }, newRoot);

    setTimeout(() => {
      setAnimationState(prev => ({
        ...prev,
        isAnimating: false,
        currentOperation: null
      }));
    }, 500);
  }, [treeState.root, avlTree, saveToHistory]);

  const deleteNode = useCallback((value: number) => {
    if (isNaN(value)) return;

    setAnimationState(prev => ({
      ...prev,
      isAnimating: true,
      currentOperation: 'delete'
    }));

    const newRoot = avlTree.delete(treeState.root, value);
    const newSize = avlTree.getSize(newRoot);

    setTreeState({
      root: newRoot,
      size: newSize
    });

    saveToHistory({ type: 'delete', value, timestamp: Date.now() }, newRoot);

    setTimeout(() => {
      setAnimationState(prev => ({
        ...prev,
        isAnimating: false,
        currentOperation: null
      }));
    }, 500);
  }, [treeState.root, avlTree, saveToHistory]);

  const searchNode = useCallback((value: number) => {
    if (isNaN(value)) return;

    setAnimationState(prev => ({
      ...prev,
      isAnimating: true,
      currentOperation: 'search'
    }));

    const foundNode = avlTree.search(treeState.root, value);
    
    if (foundNode) {
      setAnimationState(prev => ({
        ...prev,
        highlightedNodes: [foundNode.id]
      }));
    }

    saveToHistory({ type: 'search', value, timestamp: Date.now() }, treeState.root);

    setTimeout(() => {
      setAnimationState(prev => ({
        ...prev,
        isAnimating: false,
        currentOperation: null,
        highlightedNodes: []
      }));
    }, 2000);
  }, [treeState.root, avlTree, saveToHistory]);

  const clearTree = useCallback(() => {
    setTreeState({
      root: null,
      size: 0
    });

    saveToHistory({ type: 'clear', timestamp: Date.now() }, null);
  }, [saveToHistory]);

  const undo = useCallback(() => {
    if (historyState.currentIndex > 0) {
      const newIndex = historyState.currentIndex - 1;
      const operation = historyState.operations[newIndex];
      
      // Rebuild tree from history
      let newRoot: TreeNode | null = null;
      for (let i = 0; i <= newIndex; i++) {
        const op = historyState.operations[i];
        if (op.type === 'insert' && op.value !== undefined) {
          newRoot = avlTree.insert(newRoot, op.value);
        } else if (op.type === 'delete' && op.value !== undefined) {
          newRoot = avlTree.delete(newRoot, op.value);
        } else if (op.type === 'clear') {
          newRoot = null;
        }
      }

      setTreeState({
        root: newRoot,
        size: avlTree.getSize(newRoot)
      });

      setHistoryState(prev => ({
        ...prev,
        currentIndex: newIndex,
        canUndo: newIndex > 0,
        canRedo: true
      }));
    }
  }, [historyState, avlTree]);

  const redo = useCallback(() => {
    if (historyState.currentIndex < historyState.operations.length - 1) {
      const newIndex = historyState.currentIndex + 1;
      const operation = historyState.operations[newIndex];
      
      // Rebuild tree from history
      let newRoot: TreeNode | null = null;
      for (let i = 0; i <= newIndex; i++) {
        const op = historyState.operations[i];
        if (op.type === 'insert' && op.value !== undefined) {
          newRoot = avlTree.insert(newRoot, op.value);
        } else if (op.type === 'delete' && op.value !== undefined) {
          newRoot = avlTree.delete(newRoot, op.value);
        } else if (op.type === 'clear') {
          newRoot = null;
        }
      }

      setTreeState({
        root: newRoot,
        size: avlTree.getSize(newRoot)
      });

      setHistoryState(prev => ({
        ...prev,
        currentIndex: newIndex,
        canUndo: true,
        canRedo: newIndex < prev.operations.length - 1
      }));
    }
  }, [historyState, avlTree]);

  const performTraversal = useCallback((type: 'inorder' | 'preorder' | 'postorder') => {
    setTraversalState(prev => ({
      ...prev,
      type,
      isAnimating: true,
      sequence: []
    }));

    let sequence: number[] = [];
    switch (type) {
      case 'inorder':
        sequence = avlTree.inorderTraversal(treeState.root);
        break;
      case 'preorder':
        sequence = avlTree.preorderTraversal(treeState.root);
        break;
      case 'postorder':
        sequence = avlTree.postorderTraversal(treeState.root);
        break;
    }

    setTraversalState(prev => ({
      ...prev,
      sequence,
      isAnimating: false
    }));
  }, [treeState.root, avlTree]);

  return {
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
  };
};
