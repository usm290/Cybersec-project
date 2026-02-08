#!/bin/bash
# Quick Start Commands - Copy & Paste Ready!

echo "================================================================"
echo "🚀 The Essential Five - Backend Quick Start"
echo "================================================================"
echo ""

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}STEP 1: Install Dependencies${NC}"
echo "Run this command:"
echo "  cd /home/abdulbaqi/gem/backend && npm install"
echo ""

echo -e "${BLUE}STEP 2: Configure Environment${NC}"
echo "Copy the example .env file:"
echo "  cp /home/abdulbaqi/gem/backend/.env.example /home/abdulbaqi/gem/backend/.env"
echo ""
echo "Edit the .env file (it has sensible defaults):"
echo "  nano /home/abdulbaqi/gem/backend/.env"
echo ""

echo -e "${BLUE}STEP 3: Setup MongoDB${NC}"
echo "Choose one:"
echo ""
echo "  Option A - macOS (requires Homebrew):"
echo "    brew services start mongodb-community"
echo ""
echo "  Option B - Linux:"
echo "    sudo systemctl start mongod"
echo ""
echo "  Option C - Docker:"
echo "    docker run -d -p 27017:27017 --name mongodb mongo"
echo ""
echo "  Option D - MongoDB Atlas (Cloud) - Free:"
echo "    1. Visit https://www.mongodb.com/cloud/atlas"
echo "    2. Create cluster and get connection string"
echo "    3. Update MONGODB_URI in .env"
echo ""

echo -e "${BLUE}STEP 4: Start Backend Server${NC}"
echo "Run this in the backend directory:"
echo "  cd /home/abdulbaqi/gem/backend && npm run dev"
echo ""
echo "You should see:"
echo -e "  ${GREEN}✅ MongoDB Connected${NC}"
echo -e "  ${GREEN}🚀 Server running on http://localhost:5000${NC}"
echo ""

echo -e "${BLUE}STEP 5: Test the Backend${NC}"
echo "In a new terminal:"
echo ""
echo "  # Health check"
echo "  curl http://localhost:5000/api/health"
echo ""
echo "  # Register user"
echo '  curl -X POST http://localhost:5000/api/auth/register \'
echo '    -H "Content-Type: application/json" \'
echo "    -d '{\"name\":\"Test\",\"email\":\"test@example.com\",\"password\":\"Test123\"}'\"  "
echo ""
echo "  # Or run automated tests:"
echo "  cd /home/abdulbaqi/gem/backend && bash api-test.sh"
echo ""

echo -e "${BLUE}STEP 6: Start Frontend${NC}"
echo "In another terminal:"
echo "  cd /home/abdulbaqi/gem"
echo "  python -m http.server 3000"
echo ""
echo "Then visit: http://localhost:3000"
echo ""

echo "================================================================"
echo -e "${GREEN}🎉 You're ready to go!${NC}"
echo "================================================================"
echo ""
echo "Available Resources:"
echo "  📖 Full API Docs: /home/abdulbaqi/gem/backend/README.md"
echo "  🏗️  Architecture:   /home/abdulbaqi/gem/backend/ARCHITECTURE.md"
echo "  📋 Guide:          /home/abdulbaqi/gem/BACKEND_GUIDE.md"
echo "  ✅ Project Status: /home/abdulbaqi/gem/PROJECT_COMPLETE.md"
echo ""
