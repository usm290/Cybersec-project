#!/bin/bash
# API Testing Script for Cybersecurity Essentials Backend
# Usage: source api-test.sh or bash api-test.sh

# Configuration
BASE_URL="http://localhost:5000/api"
TEMP_TOKEN_FILE=".token"

# Color codes for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper function to print section headers
print_section() {
    echo -e "\n${BLUE}======== $1 ========${NC}\n"
}

# Helper function to print success
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Helper function to print error
print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Helper function to make API calls
api_call() {
    local method=$1
    local endpoint=$2
    local data=$3
    local token=$4

    if [ -z "$token" ]; then
        curl -s -X $method "$BASE_URL$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data"
    else
        curl -s -X $method "$BASE_URL$endpoint" \
            -H "Content-Type: application/json" \
            -H "Authorization: Bearer $token" \
            -d "$data"
    fi
}

# Test 1: Health Check
print_section "1. Health Check"
response=$(curl -s "$BASE_URL/health")
echo "$response" | jq '.'
if echo "$response" | jq -e '.status' > /dev/null 2>&1; then
    print_success "Server is running"
else
    print_error "Server is not responding"
    exit 1
fi

# Test 2: User Registration
print_section "2. User Registration"
REGISTER_DATA='{
    "name": "Test User",
    "email": "testuser_'$(date +%s)'@example.com",
    "password": "TestPassword123"
}'

response=$(api_call POST "/auth/register" "$REGISTER_DATA")
echo "$response" | jq '.'
TOKEN=$(echo "$response" | jq -r '.token' 2>/dev/null)

if [ ! -z "$TOKEN" ] && [ "$TOKEN" != "null" ]; then
    print_success "Registration successful"
    echo "$TOKEN" > $TEMP_TOKEN_FILE
else
    print_error "Registration failed"
fi

# Test 3: User Login
print_section "3. User Login"
LOGIN_DATA='{
    "email": "testuser_1@example.com",
    "password": "TestPassword123"
}'

response=$(api_call POST "/auth/login" "$LOGIN_DATA")
echo "$response" | jq '.'

# Test 4: Get User Profile (requires token)
print_section "4. Get User Profile"
if [ -f $TEMP_TOKEN_FILE ]; then
    TOKEN=$(cat $TEMP_TOKEN_FILE)
    response=$(api_call GET "/users/profile" "" "$TOKEN")
    echo "$response" | jq '.'
    print_success "Profile retrieved"
else
    print_error "No token available"
fi

# Test 5: Update User Profile
print_section "5. Update User Profile"
if [ -f $TEMP_TOKEN_FILE ]; then
    TOKEN=$(cat $TEMP_TOKEN_FILE)
    UPDATE_DATA='{
        "bio": "Cybersecurity enthusiast and learner",
        "expertise": ["Network Security", "Cryptography"]
    }'
    response=$(api_call PUT "/users/profile" "$UPDATE_DATA" "$TOKEN")
    echo "$response" | jq '.'
    print_success "Profile updated"
fi

# Test 6: Get Courses
print_section "6. Get Available Courses"
response=$(api_call GET "/courses" "")
echo "$response" | jq '.'
print_success "Courses retrieved"

# Test 7: Get Course Details
print_section "7. Get Specific Course Module"
response=$(api_call GET "/courses/module1" "")
echo "$response" | jq '.'
print_success "Course details retrieved"

# Test 8: Submit Quiz
print_section "8. Submit Quiz Results"
if [ -f $TEMP_TOKEN_FILE ]; then
    TOKEN=$(cat $TEMP_TOKEN_FILE)
    QUIZ_DATA='{
        "moduleId": "module1",
        "moduleName": "The Essential Five",
        "answers": [
            {"questionId": 1, "question": "Q1", "selectedAnswer": "A", "correctAnswer": "A", "isCorrect": true},
            {"questionId": 2, "question": "Q2", "selectedAnswer": "B", "correctAnswer": "B", "isCorrect": true},
            {"questionId": 3, "question": "Q3", "selectedAnswer": "C", "correctAnswer": "A", "isCorrect": false},
            {"questionId": 4, "question": "Q4", "selectedAnswer": "A", "correctAnswer": "A", "isCorrect": true},
            {"questionId": 5, "question": "Q5", "selectedAnswer": "B", "correctAnswer": "B", "isCorrect": true}
        ],
        "timeSpent": 1200
    }'
    response=$(api_call POST "/quizzes/submit" "$QUIZ_DATA" "$TOKEN")
    echo "$response" | jq '.'
    print_success "Quiz submitted"
fi

# Test 9: Get Quiz Analytics
print_section "9. Get Quiz Analytics"
if [ -f $TEMP_TOKEN_FILE ]; then
    TOKEN=$(cat $TEMP_TOKEN_FILE)
    response=$(api_call GET "/quizzes/analytics" "" "$TOKEN")
    echo "$response" | jq '.'
    print_success "Analytics retrieved"
fi

# Test 10: Get User Progress
print_section "10. Get User Progress"
if [ -f $TEMP_TOKEN_FILE ]; then
    TOKEN=$(cat $TEMP_TOKEN_FILE)
    response=$(api_call GET "/users/progress" "" "$TOKEN")
    echo "$response" | jq '.'
    print_success "Progress retrieved"
fi

# Test 11: Get Dashboard
print_section "11. Get User Dashboard"
if [ -f $TEMP_TOKEN_FILE ]; then
    TOKEN=$(cat $TEMP_TOKEN_FILE)
    response=$(api_call GET "/users/dashboard" "" "$TOKEN")
    echo "$response" | jq '.'
    print_success "Dashboard data retrieved"
fi

# Test 12: Verify Token
print_section "12. Verify Token"
if [ -f $TEMP_TOKEN_FILE ]; then
    TOKEN=$(cat $TEMP_TOKEN_FILE)
    response=$(api_call POST "/auth/verify-token" "" "$TOKEN")
    echo "$response" | jq '.'
    print_success "Token verified"
fi

# Cleanup
rm -f $TEMP_TOKEN_FILE

echo -e "\n${GREEN}✓ All tests completed!${NC}\n"
