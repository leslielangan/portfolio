#!/bin/bash

# Leslie Langan Portfolio - Quick Setup Script
# This script will set up everything you need

echo "🚀 Setting up Leslie Langan Portfolio..."
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js and npm detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Dependencies installed!"
echo ""

# Create .gitignore
echo "📝 Creating .gitignore..."
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Production
build/
dist/

# Misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor
.vscode/
.idea/
EOF

echo "✅ .gitignore created"
echo ""

echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Run 'npm run dev' to test locally"
echo "2. Open http://localhost:5173 in your browser"
echo "3. Follow the README.md for deployment to Vercel"
echo ""
echo "For questions, refer to README.md"
