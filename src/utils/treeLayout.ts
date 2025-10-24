import { TreeNode, NodePosition } from '../types';

export class TreeLayout {
  private static readonly NODE_WIDTH = 60;
  private static readonly NODE_HEIGHT = 60;
  private static readonly LEVEL_HEIGHT = 100;
  private static readonly MIN_SIBLING_DISTANCE = 80;

  static calculatePositions(root: TreeNode | null): Map<string, NodePosition> {
    const positions = new Map<string, NodePosition>();
    if (!root) return positions;

    // First pass: calculate tree structure and assign preliminary x-coordinates
    const treeInfo = this.calculateTreeInfo(root);
    
    // Second pass: adjust positions to avoid overlaps
    this.adjustPositions(root, positions, treeInfo, 0, 0);

    return positions;
  }

  private static calculateTreeInfo(node: TreeNode | null): any {
    if (!node) return { width: 0, leftWidth: 0, rightWidth: 0 };

    const leftInfo = this.calculateTreeInfo(node.left);
    const rightInfo = this.calculateTreeInfo(node.right);

    const leftWidth = leftInfo.width;
    const rightWidth = rightInfo.width;

    return {
      width: Math.max(leftWidth + rightWidth, this.MIN_SIBLING_DISTANCE),
      leftWidth,
      rightWidth,
      node
    };
  }

  private static adjustPositions(
    node: TreeNode | null,
    positions: Map<string, NodePosition>,
    treeInfo: any,
    x: number,
    level: number
  ): void {
    if (!node) return;

    const y = level * this.LEVEL_HEIGHT + 50;
    
    positions.set(node.id, {
      x: x + this.NODE_WIDTH / 2,
      y,
      level
    });

    // Calculate positions for children
    if (node.left) {
      const leftX = x - treeInfo.leftWidth / 2;
      this.adjustPositions(node.left, positions, treeInfo.leftWidth > 0 ? { width: treeInfo.leftWidth } : { width: 0 }, leftX, level + 1);
    }

    if (node.right) {
      const rightX = x + treeInfo.rightWidth / 2;
      this.adjustPositions(node.right, positions, treeInfo.rightWidth > 0 ? { width: treeInfo.rightWidth } : { width: 0 }, rightX, level + 1);
    }
  }

  static getConnections(root: TreeNode | null, positions: Map<string, NodePosition>): Array<{ from: NodePosition; to: NodePosition }> {
    const connections: Array<{ from: NodePosition; to: NodePosition }> = [];
    
    if (!root) return connections;

    this.addConnections(root, positions, connections);
    return connections;
  }

  private static addConnections(
    node: TreeNode | null,
    positions: Map<string, NodePosition>,
    connections: Array<{ from: NodePosition; to: NodePosition }>
  ): void {
    if (!node) return;

    const nodePos = positions.get(node.id);
    if (!nodePos) return;

    if (node.left) {
      const leftPos = positions.get(node.left.id);
      if (leftPos) {
        connections.push({ from: nodePos, to: leftPos });
        this.addConnections(node.left, positions, connections);
      }
    }

    if (node.right) {
      const rightPos = positions.get(node.right.id);
      if (rightPos) {
        connections.push({ from: nodePos, to: rightPos });
        this.addConnections(node.right, positions, connections);
      }
    }
  }

  static getTreeBounds(positions: Map<string, NodePosition>): { width: number; height: number; minX: number; minY: number } {
    if (positions.size === 0) {
      return { width: 0, height: 0, minX: 0, minY: 0 };
    }

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    for (const pos of positions.values()) {
      minX = Math.min(minX, pos.x);
      maxX = Math.max(maxX, pos.x);
      minY = Math.min(minY, pos.y);
      maxY = Math.max(maxY, pos.y);
    }

    return {
      width: maxX - minX + this.NODE_WIDTH,
      height: maxY - minY + this.NODE_HEIGHT,
      minX,
      minY
    };
  }
}
