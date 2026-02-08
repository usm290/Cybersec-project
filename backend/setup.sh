#!/bin/bash
# Quick Setup Script for Backend Development

echo "================================================"
echo "Cybersecurity Essentials - Backend Setup Guide"
echo "================================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v14 or higher."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ NPM version: $(npm -v)"
echo ""

# Check if MongoDB is running
echo "Checking MongoDB connection..."
if command -v mongosh &> /dev/null || command -v mongo &> /dev/null; then
    echo "✅ MongoDB client found"
else
    echo "⚠️  MongoDB client not found locally"
    echo "   You can still use MongoDB Atlas (cloud)"
fi
echo ""

# Install dependencies
echo "Installing npm dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "================================================"
echo "Setup Complete! 🎉"
echo "================================================"
echo ""
echo "Next Steps:"
echo "1. Configure your .env file with MongoDB credentials"
echo "2. Start MongoDB (if using local):"
echo "   - macOS: brew services start mongodb-community"
echo "   - Linux: sudo systemctl start mongod"
echo "   - Docker: docker run -d -p 27017:27017 mongo"
echo ""
echo "3. Start the development server:"
echo "   npm run dev"
echo ""
echo "4. Test the API:"
echo "   curl http://localhost:5000/api/health"
echo ""
echo "5. See README.md for detailed API documentation"
echo ""
