# Deployment Guide for GitHub Pages

This guide will help you deploy your AVL Tree Visualizer to GitHub Pages.

## Prerequisites

1. **GitHub Repository**: Your code should be in a GitHub repository
2. **Node.js**: Version 18 or higher installed on your system
3. **Git**: For version control and deployment

## Step-by-Step Deployment

### 1. Prepare Your Repository

1. Make sure all your code is committed and pushed to GitHub:

```bash
git add .
git commit -m "Add AVL Tree Visualizer with deployment configuration"
git push origin main
```

### 2. Update Repository Name in Configuration

**Important**: Update the `base` path in `vite.config.ts` to match your repository name:

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  base: "/your-repository-name/", // Change this to your actual repository name
  // ... rest of config
});
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. Save the settings

### 4. Deploy Using GitHub Actions (Recommended)

The repository includes a GitHub Actions workflow that will automatically deploy your app when you push to the main branch.

1. Push your code to the main branch:

```bash
git push origin main
```

2. Go to the **Actions** tab in your repository
3. You should see a workflow running called "Deploy to GitHub Pages"
4. Wait for it to complete (usually takes 2-3 minutes)
5. Your app will be available at: `https://yourusername.github.io/your-repository-name/`

### 5. Manual Deployment (Alternative)

If you prefer manual deployment:

1. Install dependencies:

```bash
npm install
```

2. Build the project:

```bash
npm run build
```

3. Deploy to GitHub Pages:

```bash
npm run deploy
```

### 6. Windows Users

Use the provided batch file:

```bash
deploy.bat
```

### 7. Linux/Mac Users

Use the provided shell script:

```bash
chmod +x deploy.sh
./deploy.sh
```

## Troubleshooting

### Common Issues

1. **404 Error**: Make sure the `base` path in `vite.config.ts` matches your repository name exactly
2. **Build Fails**: Check that all dependencies are installed with `npm install`
3. **GitHub Actions Fails**: Check the Actions tab for error details

### Checking Deployment Status

1. Go to your repository's **Actions** tab
2. Look for the "Deploy to GitHub Pages" workflow
3. Click on it to see detailed logs
4. Green checkmark means successful deployment

### Updating Your App

To update your deployed app:

1. Make your changes
2. Commit and push to main branch:

```bash
git add .
git commit -m "Update app"
git push origin main
```

3. GitHub Actions will automatically rebuild and redeploy

## Custom Domain (Optional)

If you want to use a custom domain:

1. Create a `CNAME` file in the `public` folder with your domain name
2. Configure your domain's DNS settings to point to GitHub Pages
3. Update your repository settings to use the custom domain

## File Structure After Deployment

Your deployed app will have this structure:

```
your-repository/
├── .github/workflows/deploy.yml  # GitHub Actions workflow
├── public/                       # Static assets
├── src/                         # Source code
├── dist/                        # Built files (created during build)
├── package.json                 # Dependencies
├── vite.config.ts              # Build configuration
└── index.html                  # Entry point
```

## Performance Tips

1. **Optimize Images**: Use WebP format for better compression
2. **Minify Code**: The build process automatically minifies your code
3. **Enable Caching**: GitHub Pages automatically handles caching
4. **Use CDN**: Consider using a CDN for faster global access

## Support

If you encounter issues:

1. Check the GitHub Actions logs
2. Verify your repository name matches the `base` path
3. Ensure all dependencies are properly installed
4. Check that GitHub Pages is enabled in repository settings

Your AVL Tree Visualizer should now be live on GitHub Pages! 🎉
