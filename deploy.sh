#!/bin/bash

# AVL Tree Visualizer - Deployment Script for GitHub Pages

echo "🌳 Building AVL Tree Visualizer for GitHub Pages..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Deploy to GitHub Pages
echo "🚀 Deploying to GitHub Pages..."
npm run deploy

echo "✅ Deployment complete!"
echo "🌐 Your app should be available at: https://yourusername.github.io/DFS-tree-visual/"
