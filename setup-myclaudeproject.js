const fs = require('fs');
const path = require('path');

// =======================
// Define the entire project structure with teaching comments
// =======================
const structure = {
  '.claude': {
    'claude.md': `
# 🧠 Claude Memory - Project Guide

This file stores **persistent knowledge** for Claude AI.
Think of it as your team’s brain that Claude always remembers.

## Core Principles
- Follow SOLID principles for clean code
- Use TypeScript for type safety
- Document all public functions
- Use environment variables for secrets (never hardcode)

## Development Workflow
1. Create a feature branch: feature-[description]
2. Write unit tests before committing
3. Run linter & type checker before commit
4. Update docs when adding features

💡 Tip: This file is global context for Claude AI.
  `.trim(),

    'commands': {
      'code-review.md': `
# 📝 Code Review Command

Purpose: Claude performs **automated code reviews**.

## Process
1. Read example files to learn patterns
2. Check $ARGUMENTS for:
   - Code structure
   - Design patterns
   - Performance & security
   - Maintainability
   - Test coverage

## Output
- Save review as ai-code-reviews/{filename}.review.md
- Include line references, suggestions, rating & refactor effort

💡 Tip: Use this command for consistent code quality every time.
      `.trim(),

      'api-test.md': `
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
      `.trim(),

      'document-feature.md': `
# 📄 Documentation Generator Command

Purpose: Generate **developer & user documentation** automatically.

## Process
1. Accept feature name as input
2. Analyze code files
3. Generate two docs:
   - docs/dev/{feature}-implementation.md
   - docs/user/how-to-{feature}.md
4. Include screenshot placeholders for user guides
5. Link to related docs

💡 Tip: Keeps all docs consistent and saves tons of time.
      `.trim(),
    },
  },

  'docs': {
    'dev': {
      'password-reset-implementation.md': `
# 🔧 Password Reset Feature - Developer Guide

This document is for developers. Learn **how the feature works under the hood**.

## Overview
Explains the password reset feature logic and API endpoints.

## Technical Specs
- API Endpoint: POST /api/password-reset
- Logic:
  1. User enters email
  2. Server generates reset token
  3. Token saved in DB
  4. Email sent with reset link

## Implementation Notes
- Token expires after 1 hour
- Uses JWT for security
- Rate limit: 5 attempts/hour

💡 Tip: Always check this doc before updating the password reset logic.
      `.trim(),
    },

    'user': {
      'how-to-reset-password.md': `
# 🧑‍💻 How to Reset Your Password - User Guide

This is for **end users**, written in simple language.

## Step-by-Step Instructions
1. Go to login page
2. Click "Forgot Password?"
3. Enter your email
4. Check inbox for reset link
5. Click link, set new password
6. Login with new password

![Screenshot Placeholder]

💡 Tip: Keep screenshots updated to help users visually.
      `.trim(),
    },
  },

  'tests': {
    'api': {
      'endpoint-name.test.ts': `
// 🧪 Automated API Tests - Example

describe('Password Reset API', () => {
  describe('POST /api/password-reset', () => {
    it('should send reset link for valid email', async () => {
      // Test implementation
    });

    it('should return 400 for invalid email format', async () => {
      // Test implementation
    });

    it('should rate limit after too many attempts', async () => {
      // Test implementation
    });

    it('should reject invalid token on reset', async () => {
      // Test implementation
    });
  });
});

// 💡 Tip: Each test ensures API behaves as expected.
// Keep adding tests as new endpoints are created.
      `.trim(),
    },
  },
};

// =======================
// Recursive function to create folders & files
// =======================
function createStructure(basePath, obj) {
  for (const name in obj) {
    const fullPath = path.join(basePath, name);

    if (typeof obj[name] === 'string') {
      fs.writeFileSync(fullPath, obj[name], 'utf8');
      console.log(`Created file: ${fullPath}`);
    } else {
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath);
        console.log(`Created folder: ${fullPath}`);
      }
      createStructure(fullPath, obj[name]);
    }
  }
}

// =======================
// Create project root folder
// =======================
const projectRoot = path.join(process.cwd(), 'MyClaudeProject');
if (!fs.existsSync(projectRoot)) fs.mkdirSync(projectRoot);

// =======================
// Build entire project structure
// =======================
createStructure(projectRoot, structure);

console.log('🎉 Next-Level Claude Project structure created successfully!');
