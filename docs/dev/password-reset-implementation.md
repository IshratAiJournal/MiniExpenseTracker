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