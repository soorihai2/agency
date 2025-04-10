#!/bin/bash

# Create git directory
mkdir -p git

# Copy configuration files
cp package.json git/
cp package-lock.json git/
cp svelte.config.js git/
cp vite.config.js git/
cp tailwind.config.js git/
cp postcss.config.js git/
cp jsconfig.json git/
cp .npmrc git/
cp .gitignore git/
cp vercel.json git/
cp README.md git/

# Copy source code
cp -r src git/

# Create static directory structure
mkdir -p git/static/images
mkdir -p git/static/images/schemes

# Copy static assets (excluding videos)
cp static/favicon.ico git/static/
cp static/favicon.png git/static/
cp static/favicon.svg git/static/
cp static/icon.svg git/static/

# Copy images
cp static/images/*.jpg git/static/images/
cp static/images/schemes/*.jpg git/static/images/schemes/

echo "Files prepared for GitHub in the 'git' folder"
echo "You can now upload the contents of the 'git' folder to GitHub" 