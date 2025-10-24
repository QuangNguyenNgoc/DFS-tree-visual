@echo off
echo 🌳 Building AVL Tree Visualizer for GitHub Pages...

echo 📦 Installing dependencies...
npm install

echo 🔨 Building project...
npm run build

echo 🚀 Deploying to GitHub Pages...
npm run deploy

echo ✅ Deployment complete!
echo 🌐 Your app should be available at: https://yourusername.github.io/DFS-tree-visual/
pause
