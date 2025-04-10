#!/bin/bash

# For GitHub Pages deployment
if [ "$1" = "github" ]; then
  echo "Building for GitHub Pages deployment..."
  USE_GITHUB_PAGES=true npm run build
  echo "Build complete! Deploy the dist folder to GitHub Pages."
  exit 0
fi

# For regular production build
echo "Building for regular production deployment..."
npm run build

echo "Starting server from dist directory..."
cd dist
python3 -m http.server 8000
