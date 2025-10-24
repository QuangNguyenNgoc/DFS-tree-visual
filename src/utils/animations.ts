export const animationConfig = {
  // Node animations
  nodeInsert: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  },
  
  nodeDelete: {
    initial: { scale: 1, opacity: 1 },
    animate: { scale: 0, opacity: 0 },
    transition: { duration: 0.3, ease: "easeIn" }
  },
  
  nodeHighlight: {
    initial: { scale: 1 },
    animate: { scale: 1.2 },
    transition: { duration: 0.2, ease: "easeInOut" }
  },
  
  nodeTraverse: {
    initial: { scale: 1, backgroundColor: "#f97316" },
    animate: { scale: 1.1, backgroundColor: "#ea580c" },
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  
  // Rotation animations
  rotation: {
    transition: { duration: 0.8, ease: "easeInOut" }
  },
  
  // Connection line animations
  connection: {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: 0.5, ease: "easeInOut" }
  },
  
  // Button animations
  buttonHover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  
  buttonTap: {
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

export const colors = {
  node: {
    default: "#8B4513",
    highlighted: "#A0522D",
    traversing: "#FF6B35",
    selected: "#D2691E"
  },
  connection: {
    default: "#8B4513",
    highlighted: "#A0522D"
  },
  background: {
    primary: "#FFF7ED",
    secondary: "#FFE5B4"
  }
};
