# 🔬 API Test Command

Purpose: Create **automated API tests** for given endpoints.

## Test Structure
- Happy Path:
  - Valid request & expected response
- Error Handling:
  - Invalid payload
  - Auth failures
- Edge Cases:
  - Large payload
  - Timeout
- Security & Rate limits

## Output
- Save tests in /tests/api/{endpoint-name}.test.ts

💡 Tip: Ensures API is always working as expected. Automate repetitive testing!