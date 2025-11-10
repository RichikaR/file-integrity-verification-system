# File Integrity Verification System - Project Summary

## Quick Overview

This is a **full-stack web application** that verifies file integrity using cryptographic hashing algorithms (SHA-256 and HMAC-SHA-256), replicating traditional C-based CN projects in a modern web environment.

## What It Does

### Real-World Scenario
Imagine you're sending a file over the internet. How do you know it wasn't corrupted or tampered with during transmission?

**This system solves that problem!**

1. **Sender** uploads the original file → gets a verification code
2. **Receiver** uploads the received file + enters the code → system checks if file is intact
3. If codes match = File is perfect ✅
4. If codes don't match = File was corrupted ❌

## Technical Implementation

### Cryptographic Algorithms Used

**SHA-256 (Secure Hash Algorithm)**
- Converts file into a 256-bit unique fingerprint
- Any tiny change = completely different fingerprint
- Used in Bitcoin, SSL certificates, etc.

**HMAC-SHA-256 (Hash-based Message Authentication Code)**
- Adds a secret key to SHA-256
- Provides authentication + integrity
- Even if someone intercepts the file, they can't forge the code without the key

**Salt (Random Data)**
- 16 random bytes added to each verification
- Prevents rainbow table attacks
- Makes each verification unique

### Security Features Implemented

✓ Timing-safe comparison (prevents timing attacks)
✓ Rate limiting (10 requests/min)
✓ Automatic file deletion (no data retention)
✓ CORS protection
✓ Helmet.js security headers
✓ 50 MB file size limit
✓ Secret HMAC key protection

## Architecture

```
Frontend (React + TypeScript)
    ↓
Backend API (Node.js + Express)
    ↓
Crypto Module (SHA-256 + HMAC)
    ↓
File System (Multer uploads, auto-delete)
```

## Key Files

### Frontend
- `src/App.tsx` - Main application with tabs
- `src/components/SenderMode.tsx` - File upload & code generation
- `src/components/ReceiverMode.tsx` - File verification
- `src/components/ComparisonMode.tsx` - Direct file comparison
- `src/components/LearnModal.tsx` - Educational content
- `src/components/HelpModal.tsx` - Usage instructions
- `src/components/DevelopedByModal.tsx` - Team info

### Backend
- `server/index.js` - Express server with all endpoints
  - POST `/generate-code` - Generate verification code
  - POST `/verify-code` - Verify file integrity
  - POST `/compare-files` - Compare two files
  - POST `/download-report` - Download detailed report

## How to Start

### Terminal 1 (Backend):
```bash
cd server
node index.js
```

### Terminal 2 (Frontend):
Frontend starts automatically in the interface.

### Access:
Frontend: http://localhost:5173
Backend API: http://localhost:3001

## Features Checklist

✅ Sender Mode (upload → generate code)
✅ Receiver Mode (verify with code)
✅ File-to-File Comparison
✅ SHA-256 Hashing
✅ HMAC-SHA-256 with secret key
✅ Salt-based security
✅ Timing-safe comparison
✅ Learn Section (explains algorithms)
✅ Developed By Section (team info)
✅ Help Section (instructions)
✅ Download Report (detailed text report)
✅ Security features (rate limiting, CORS, Helmet)
✅ Error handling
✅ Responsive design
✅ Professional UI

## Testing the Application

### Test Case 1: Same File (Should Match)
1. Sender: Upload `test.txt`
2. Copy verification code and salt
3. Receiver: Upload the same `test.txt`
4. Enter code and salt
5. Result: ✅ **File Integrity Maintained**

### Test Case 2: Different File (Should NOT Match)
1. Sender: Upload `test.txt`
2. Copy verification code and salt
3. Receiver: Upload a modified or different file
4. Enter code and salt
5. Result: ❌ **File Corrupted**

### Test Case 3: Direct Comparison
1. Upload two identical files
2. Result: ✅ **Files Are Identical**

## For Presentation

### Talking Points:
1. **Problem**: How to verify file integrity in network transmission
2. **Solution**: Cryptographic hashing with SHA-256 and HMAC
3. **Innovation**: Web-based implementation vs traditional C-based approach
4. **Security**: Multiple layers (HMAC key, salt, timing-safe comparison)
5. **Real-world**: Used in blockchain, secure communications, software distribution

### Demo Flow:
1. Show the Learn section (explain algorithms)
2. Demonstrate Sender mode (upload file, get code)
3. Demonstrate Receiver mode (verify same file = match)
4. Show corrupted file detection (different file = no match)
5. Download and show the detailed report

## Project Team

- **Richika Rani** (24BCE1498)
- **Nandani** (24BCE1491)
- **Guide**: Dr. Swaminathan A
- **Course**: Computer Networks

## Technologies Used

**Frontend**: React 18, TypeScript, Tailwind CSS, Vite
**Backend**: Node.js, Express, Native Crypto
**Security**: Helmet, CORS, Rate Limiting, Multer
**Icons**: Lucide React

---

**Good luck with your presentation! 🎓**
