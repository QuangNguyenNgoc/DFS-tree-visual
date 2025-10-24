import { TreeNode, RotationType } from '../types';

export class AVLTree {
  private nodeIdCounter = 0;

  private generateId(): string {
    return `node-${this.nodeIdCounter++}`;
  }

  private createNode(value: number): TreeNode {
    return {
      value,
      left: null,
      right: null,
      height: 1,
      balanceFactor: 0,
      id: this.generateId(),
    };
  }

  private getHeight(node: TreeNode | null): number {
    return node ? node.height : 0;
  }

  private getBalanceFactor(node: TreeNode | null): number {
    if (!node) return 0;
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  private updateHeight(node: TreeNode): void {
    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    node.balanceFactor = this.getBalanceFactor(node);
  }

  private rightRotate(y: TreeNode): TreeNode {
    const x = y.left!;
    const T2 = x.right;

    // Perform rotation
    x.right = y;
    y.left = T2;

    // Update heights
    this.updateHeight(y);
    this.updateHeight(x);

    return x;
  }

  private leftRotate(x: TreeNode): TreeNode {
    const y = x.right!;
    const T2 = y.left;

    // Perform rotation
    y.left = x;
    x.right = T2;

    // Update heights
    this.updateHeight(x);
    this.updateHeight(y);

    return y;
  }

  private getRotationType(node: TreeNode): RotationType {
    const balance = this.getBalanceFactor(node);

    if (balance > 1) {
      // Left heavy
      if (this.getBalanceFactor(node.left) >= 0) {
        return 'LL';
      } else {
        return 'LR';
      }
    } else if (balance < -1) {
      // Right heavy
      if (this.getBalanceFactor(node.right) <= 0) {
        return 'RR';
      } else {
        return 'RL';
      }
    }
    return null;
  }

  insert(root: TreeNode | null, value: number): TreeNode {
    // Perform standard BST insertion
    if (!root) {
      return this.createNode(value);
    }

    if (value < root.value) {
      root.left = this.insert(root.left, value);
    } else if (value > root.value) {
      root.right = this.insert(root.right, value);
    } else {
      // Duplicate values not allowed
      return root;
    }

    // Update height of this ancestor node
    this.updateHeight(root);

    // Get the balance factor to check if this node became unbalanced
    const balance = this.getBalanceFactor(root);

    // Left Left Case
    if (balance > 1 && value < root.left!.value) {
      return this.rightRotate(root);
    }

    // Right Right Case
    if (balance < -1 && value > root.right!.value) {
      return this.leftRotate(root);
    }

    // Left Right Case
    if (balance > 1 && value > root.left!.value) {
      root.left = this.leftRotate(root.left!);
      return this.rightRotate(root);
    }

    // Right Left Case
    if (balance < -1 && value < root.right!.value) {
      root.right = this.rightRotate(root.right!);
      return this.leftRotate(root);
    }

    return root;
  }

  delete(root: TreeNode | null, value: number): TreeNode | null {
    if (!root) return root;

    if (value < root.value) {
      root.left = this.delete(root.left, value);
    } else if (value > root.value) {
      root.right = this.delete(root.right, value);
    } else {
      // Node to be deleted found
      if (!root.left || !root.right) {
        const temp = root.left || root.right;
        if (!temp) {
          return null;
        }
        return temp;
      } else {
        // Node with two children: get the inorder successor
        const temp = this.getMinValueNode(root.right);
        root.value = temp.value;
        root.right = this.delete(root.right, temp.value);
      }
    }

    // Update height
    this.updateHeight(root);

    // Get the balance factor
    const balance = this.getBalanceFactor(root);

    // Left Left Case
    if (balance > 1 && this.getBalanceFactor(root.left) >= 0) {
      return this.rightRotate(root);
    }

    // Left Right Case
    if (balance > 1 && this.getBalanceFactor(root.left) < 0) {
      root.left = this.leftRotate(root.left!);
      return this.rightRotate(root);
    }

    // Right Right Case
    if (balance < -1 && this.getBalanceFactor(root.right) <= 0) {
      return this.leftRotate(root);
    }

    // Right Left Case
    if (balance < -1 && this.getBalanceFactor(root.right) > 0) {
      root.right = this.rightRotate(root.right!);
      return this.leftRotate(root);
    }

    return root;
  }

  private getMinValueNode(node: TreeNode): TreeNode {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  search(root: TreeNode | null, value: number): TreeNode | null {
    if (!root || root.value === value) {
      return root;
    }

    if (value < root.value) {
      return this.search(root.left, value);
    } else {
      return this.search(root.right, value);
    }
  }

  inorderTraversal(root: TreeNode | null): number[] {
    const result: number[] = [];
    this.inorderHelper(root, result);
    return result;
  }

  private inorderHelper(node: TreeNode | null, result: number[]): void {
    if (node) {
      this.inorderHelper(node.left, result);
      result.push(node.value);
      this.inorderHelper(node.right, result);
    }
  }

  preorderTraversal(root: TreeNode | null): number[] {
    const result: number[] = [];
    this.preorderHelper(root, result);
    return result;
  }

  private preorderHelper(node: TreeNode | null, result: number[]): void {
    if (node) {
      result.push(node.value);
      this.preorderHelper(node.left, result);
      this.preorderHelper(node.right, result);
    }
  }

  postorderTraversal(root: TreeNode | null): number[] {
    const result: number[] = [];
    this.postorderHelper(root, result);
    return result;
  }

  private postorderHelper(node: TreeNode | null, result: number[]): void {
    if (node) {
      this.postorderHelper(node.left, result);
      this.postorderHelper(node.right, result);
      result.push(node.value);
    }
  }

  getSize(root: TreeNode | null): number {
    if (!root) return 0;
    return 1 + this.getSize(root.left) + this.getSize(root.right);
  }

  clear(): TreeNode | null {
    return null;
  }

  // Helper method to clone tree for undo/redo
  cloneTree(root: TreeNode | null): TreeNode | null {
    if (!root) return null;
    
    const cloned = this.createNode(root.value);
    cloned.height = root.height;
    cloned.balanceFactor = root.balanceFactor;
    cloned.left = this.cloneTree(root.left);
    cloned.right = this.cloneTree(root.right);
    
    return cloned;
  }
}
