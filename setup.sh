#!/bin/bash

# Vue Portfolio Setup Script
# This script helps you set up the Vue.js portfolio project

echo "🚀 Setting up Vue Portfolio Project..."
echo "======================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v16+) first:"
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Display Node.js and npm versions
echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies. Please check the error messages above."
    exit 1
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📝 Next steps:"
echo "   1. Start development server: npm run dev"
echo "   2. Open http://localhost:3000 in your browser"
echo "   3. Edit src/data/portfolio.json to customize your portfolio"
echo ""
echo "📚 Available commands:"
echo "   npm run dev      - Start development server"
echo "   npm run build    - Build for production"
echo "   npm run preview  - Preview production build"
echo "   npm run type-check - Check TypeScript types"
echo ""
echo "🔧 To customize your portfolio:"
echo "   - Edit src/data/portfolio.json for personal information"
echo "   - Edit src/data/navigation.json for menu items"
echo "   - Modify src/assets/main.css for styling"
echo ""
echo "Happy coding! 🚀"
