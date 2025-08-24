#!/bin/bash

echo "🧪 COMPREHENSIVE E-COMMERCE ANALYTICS COPILOT TEST"
echo "=================================================="
echo

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

# Function to run test
run_test() {
    local test_name="$1"
    local test_command="$2"
    local expected_pattern="$3"
    
    echo -n "Testing $test_name... "
    
    result=$(eval $test_command 2>/dev/null)
    if [[ $result =~ $expected_pattern ]]; then
        echo -e "${GREEN}✅ PASSED${NC}"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}❌ FAILED${NC}"
        echo "   Expected pattern: $expected_pattern"
        echo "   Got: $result"
        ((TESTS_FAILED++))
    fi
}

# Test GitHub Repository
echo -e "${BLUE}📍 GITHUB REPOSITORY INFORMATION${NC}"
echo "Repository: https://github.com/AbdulSohail018/E-Commerce-Lakehouse-LLM-Analytics-Copilot"
echo "Branch: $(git branch --show-current)"
echo "Status: $(git status --porcelain | wc -l) uncommitted changes"
echo

# Test Backend API Endpoints
echo -e "${BLUE}🔧 BACKEND API TESTS${NC}"
run_test "Health Check Endpoint" "curl -s http://localhost:8000/health" "healthy"
run_test "Data Overview Endpoint" "curl -s http://localhost:8000/data/overview" "customers.*products.*orders"
run_test "Customer Data Endpoint" "curl -s http://localhost:8000/data/customers" "customer_id"
run_test "Product Data Endpoint" "curl -s http://localhost:8000/data/products" "product_id"
run_test "Order Data Endpoint" "curl -s http://localhost:8000/data/orders" "order_id"
run_test "Dashboard Analytics" "curl -s http://localhost:8000/analytics/dashboard" "revenue_trend.*top_products"
echo

# Test AI Analytics
echo -e "${BLUE}🤖 AI ANALYTICS TESTS${NC}"
run_test "Natural Language Query - Revenue Trends" "curl -s -X POST http://localhost:8000/analytics/query -H 'Content-Type: application/json' -d '{\"query\": \"Show me revenue trends\"}'" "insights.*visualization_type"
run_test "Natural Language Query - Top Products" "curl -s -X POST http://localhost:8000/analytics/query -H 'Content-Type: application/json' -d '{\"query\": \"Top products by sales\"}'" "labels.*values"
run_test "Natural Language Query - Customer Segments" "curl -s -X POST http://localhost:8000/analytics/query -H 'Content-Type: application/json' -d '{\"query\": \"Customer segment distribution\"}'" "visualization_type.*pie"
echo

# Test Frontend
echo -e "${BLUE}🌐 FRONTEND TESTS${NC}"
run_test "Frontend Accessibility" "curl -s http://localhost:3000" "React App"
run_test "Frontend JavaScript Bundle" "curl -s http://localhost:3000" "bundle.js"
echo

# Test Data Quality
echo -e "${BLUE}📊 DATA QUALITY TESTS${NC}"
OVERVIEW=$(curl -s http://localhost:8000/data/overview)
CUSTOMERS=$(echo $OVERVIEW | grep -o '"customers":[0-9]*' | grep -o '[0-9]*')
PRODUCTS=$(echo $OVERVIEW | grep -o '"products":[0-9]*' | grep -o '[0-9]*')
ORDERS=$(echo $OVERVIEW | grep -o '"orders":[0-9]*' | grep -o '[0-9]*')

echo "📈 Data Statistics:"
echo "   Customers: $CUSTOMERS"
echo "   Products: $PRODUCTS"
echo "   Orders: $ORDERS"

if [ "$CUSTOMERS" -gt 900 ]; then
    echo -e "   ${GREEN}✅ Customer data volume: GOOD${NC}"
    ((TESTS_PASSED++))
else
    echo -e "   ${RED}❌ Customer data volume: LOW${NC}"
    ((TESTS_FAILED++))
fi

if [ "$PRODUCTS" -gt 400 ]; then
    echo -e "   ${GREEN}✅ Product data volume: GOOD${NC}"
    ((TESTS_PASSED++))
else
    echo -e "   ${RED}❌ Product data volume: LOW${NC}"
    ((TESTS_FAILED++))
fi

if [ "$ORDERS" -gt 4000 ]; then
    echo -e "   ${GREEN}✅ Order data volume: GOOD${NC}"
    ((TESTS_PASSED++))
else
    echo -e "   ${RED}❌ Order data volume: LOW${NC}"
    ((TESTS_FAILED++))
fi

echo

# Test Performance
echo -e "${BLUE}⚡ PERFORMANCE TESTS${NC}"
START_TIME=$(date +%s%N)
curl -s http://localhost:8000/data/overview > /dev/null
END_TIME=$(date +%s%N)
RESPONSE_TIME=$(( ($END_TIME - $START_TIME) / 1000000 ))

echo "📊 API Response Time: ${RESPONSE_TIME}ms"
if [ "$RESPONSE_TIME" -lt 1000 ]; then
    echo -e "   ${GREEN}✅ API Performance: EXCELLENT${NC}"
    ((TESTS_PASSED++))
elif [ "$RESPONSE_TIME" -lt 3000 ]; then
    echo -e "   ${YELLOW}⚠️  API Performance: GOOD${NC}"
    ((TESTS_PASSED++))
else
    echo -e "   ${RED}❌ API Performance: SLOW${NC}"
    ((TESTS_FAILED++))
fi

echo

# Final Results
echo -e "${BLUE}📋 TEST SUMMARY${NC}"
echo "=============="
TOTAL_TESTS=$((TESTS_PASSED + TESTS_FAILED))
echo "Total Tests: $TOTAL_TESTS"
echo -e "Passed: ${GREEN}$TESTS_PASSED${NC}"
echo -e "Failed: ${RED}$TESTS_FAILED${NC}"

if [ "$TESTS_FAILED" -eq 0 ]; then
    echo -e "\n${GREEN}🎉 ALL TESTS PASSED! SYSTEM IS FULLY OPERATIONAL!${NC}"
    echo
    echo -e "${BLUE}🚀 READY TO USE:${NC}"
    echo "   • Main Dashboard: http://localhost:3000"
    echo "   • API Documentation: http://localhost:8000/docs"
    echo "   • Backend API: http://localhost:8000"
    echo
    echo -e "${BLUE}💡 TRY THESE FEATURES:${NC}"
    echo "   • Visit the dashboard and explore analytics"
    echo "   • Try natural language queries like 'Show me top products'"
    echo "   • Browse customer, product, and order data"
    echo "   • Check out the interactive visualizations"
else
    echo -e "\n${YELLOW}⚠️  SOME TESTS FAILED - PLEASE CHECK THE ISSUES ABOVE${NC}"
fi

echo
echo "🔗 GitHub Repository: https://github.com/AbdulSohail018/E-Commerce-Lakehouse-LLM-Analytics-Copilot"