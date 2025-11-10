# Implementation Details - File Integrity Verification System

## Complete Feature Checklist

### ✅ Backend Implementation (Node.js + Express)

#### Security Middleware
- [x] Helmet.js for security headers
- [x] CORS protection with origin whitelist
- [x] Express rate limiter (10 requests/minute)
- [x] File size limit enforcement (50 MB)
- [x] Automatic file cleanup after processing

#### Cryptographic Implementation
- [x] SHA-256 hashing using Node.js crypto module
- [x] HMAC-SHA-256 with secret key (HMAC_KEY environment variable)
- [x] Random salt generation (16 bytes)
- [x] Timing-safe comparison using crypto.timingSafeEqual()

#### API Endpoints

**POST /generate-code**
```javascript
Input: File (multipart/form-data)
Process:
  1. Read file in binary stream
  2. Compute SHA-256 hash
  3. Generate random 16-byte salt
  4. Compute HMAC-SHA-256(key, SHA-256 + salt)
  5. Extract first 16 characters as verification code
Output: {fileName, fileSize, sha256, hmac, salt, verificationCode}
```

**POST /verify-code**
```javascript
Input: File, verification code, salt
Process:
  1. Read file in binary stream
  2. Compute SHA-256 hash
  3. Use provided salt
  4. Compute HMAC-SHA-256(key, SHA-256 + salt)
  5. Extract first 16 characters
  6. Timing-safe compare with provided code
Output: {fileName, fileSize, match, computedCode, sha256, hmac}
```

**POST /compare-files**
```javascript
Input: Two files (multipart/form-data)
Process:
  1. Compute SHA-256 for both files
  2. Compare hash values
Output: {match, file1: {name, sha256, hmac}, file2: {name, sha256, hmac}}
```

**POST /download-report**
```javascript
Input: Report data (JSON)
Process:
  1. Generate detailed text report
  2. Include file info, hashes, verification details
  3. Add technical explanations
  4. Save to temp file
Output: Text file download
```

### ✅ Frontend Implementation (React + TypeScript)

#### Components

**App.tsx**
- Main application container
- Tab navigation (Sender, Receiver, Comparison)
- Modal management
- Report data state management
- Navigation bar with Learn, Developed By, Help, Download

**SenderMode.tsx**
- File upload interface
- Generate verification code button
- Display results: SHA-256, HMAC, salt, verification code
- Copy verification code to clipboard
- Color-coded success display

**ReceiverMode.tsx**
- File upload interface
- Input fields for verification code and salt
- Verify file button
- Color-coded result display (green=match, red=corrupted)
- Show computed hashes and verification status

**ComparisonMode.tsx**
- Dual file upload interface
- Compare files button
- Side-by-side comparison results
- Display hashes for both files

**Modal.tsx**
- Reusable modal component
- Close button
- Scrollable content area

**LearnModal.tsx**
- Educational content about SHA-256
- HMAC-SHA-256 explanation
- Salt-based security concepts
- Visual diagram of verification process
- OpenSSL command equivalents

**DevelopedByModal.tsx**
- Project team information
- Project guide details
- Visual team member cards
- Project overview

**HelpModal.tsx**
- Step-by-step sender workflow
- Step-by-step receiver workflow
- Troubleshooting section
- Common error solutions

### ✅ Cryptographic Algorithms

#### SHA-256 (Secure Hash Algorithm 256-bit)
```
Properties:
- Fixed output size: 256 bits (64 hex characters)
- Deterministic: Same input → Same output
- Collision-resistant: Nearly impossible to find two inputs with same hash
- Avalanche effect: One bit change → Completely different hash

Implementation:
crypto.createHash('sha256')
  .update(fileData)
  .digest('hex')
```

#### HMAC-SHA-256 (Hash-based Message Authentication Code)
```
Formula: HMAC(K, m) = H((K ⊕ opad) || H((K ⊕ ipad) || m))

Where:
- K = Secret key (HMAC_KEY)
- m = Message (SHA-256 hash + salt)
- H = SHA-256 hash function
- opad = Outer padding (0x5c repeated)
- ipad = Inner padding (0x36 repeated)

Implementation:
crypto.createHmac('sha256', HMAC_KEY)
  .update(sha256Hash)
  .update(salt)
  .digest('hex')
```

#### Salt-based Security
```
Purpose:
- Adds randomness to each verification
- Prevents rainbow table attacks
- Ensures unique hashes even for identical files
- Must be shared between sender and receiver

Generation:
crypto.randomBytes(16).toString('hex')
```

#### Timing-Safe Comparison
```
Purpose: Prevents timing attacks

Standard comparison (VULNERABLE):
if (code1 === code2) // Stops at first difference

Timing-safe comparison (SECURE):
crypto.timingSafeEqual(buffer1, buffer2) // Always checks all bytes
```

### ✅ Security Features

1. **HMAC Key Protection**
   - Stored in environment variable
   - Never exposed to client
   - Required for verification code generation

2. **Rate Limiting**
   - 10 requests per minute per IP
   - Prevents brute force attacks
   - Prevents resource exhaustion

3. **File Size Limits**
   - Maximum 50 MB per file
   - Prevents memory exhaustion
   - Protects server resources

4. **Automatic File Cleanup**
   - Files deleted immediately after hashing
   - No data retention
   - Privacy protection

5. **CORS Protection**
   - Restricted to frontend origin only
   - Prevents unauthorized API access

6. **Helmet.js Headers**
   - X-Frame-Options: DENY
   - X-Content-Type-Options: nosniff
   - Strict-Transport-Security
   - Content-Security-Policy

### ✅ User Interface Features

1. **Responsive Design**
   - Mobile-friendly layout
   - Tablet optimization
   - Desktop full features

2. **Color-Coded Feedback**
   - Blue: Sender mode
   - Orange: Receiver mode
   - Purple: Comparison mode
   - Green: Success/Match
   - Red: Error/Mismatch

3. **Interactive Elements**
   - Hover effects on buttons
   - Smooth transitions
   - Loading states
   - Copy-to-clipboard functionality

4. **Educational Content**
   - Learn modal with algorithm explanations
   - Visual diagrams
   - OpenSSL command references
   - Help documentation

### ✅ Error Handling

**Frontend**
- File upload validation
- Required field validation
- API error display
- Network error handling
- User-friendly error messages

**Backend**
- Try-catch blocks on all endpoints
- File deletion on errors
- Proper HTTP status codes
- Detailed error logging
- Graceful error responses

### ✅ Report Generation

**Comprehensive Text Report Includes:**
- File information (name, size)
- All cryptographic hashes (SHA-256, HMAC)
- Salt value
- Verification code
- Match/mismatch status
- Step-by-step process explanation
- Technical details about algorithms
- Security features explanation
- Project credits

### ✅ Documentation

1. **README.md** - Complete project documentation
2. **INSTRUCTIONS.md** - Quick start guide
3. **PROJECT_SUMMARY.md** - Overview and testing
4. **START_HERE.txt** - Quick reference guide
5. **IMPLEMENTATION_DETAILS.md** - This file

## Technology Stack Summary

**Frontend**
- React 18.3.1
- TypeScript 5.5.3
- Tailwind CSS 3.4.1
- Vite 5.4.2
- Lucide React 0.344.0

**Backend**
- Node.js (built-in crypto module)
- Express 4.18.2
- Multer 1.4.5 (file uploads)
- Helmet 7.1.0 (security)
- CORS 2.8.5
- Express-rate-limit 7.1.5

## File Structure

```
project/
├── src/
│   ├── components/
│   │   ├── Modal.tsx
│   │   ├── SenderMode.tsx
│   │   ├── ReceiverMode.tsx
│   │   ├── ComparisonMode.tsx
│   │   ├── LearnModal.tsx
│   │   ├── DevelopedByModal.tsx
│   │   └── HelpModal.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── server/
│   ├── index.js
│   └── package.json
├── README.md
├── INSTRUCTIONS.md
├── PROJECT_SUMMARY.md
├── START_HERE.txt
└── IMPLEMENTATION_DETAILS.md
```

## Performance Considerations

1. **File Streaming**
   - Files read in chunks, not loaded entirely in memory
   - Efficient for large files (up to 50 MB)

2. **Immediate Cleanup**
   - Files deleted after processing
   - Prevents disk space issues

3. **Rate Limiting**
   - Prevents server overload
   - Ensures fair resource allocation

4. **Frontend Optimization**
   - Code splitting with React lazy loading
   - Optimized bundle size
   - Tree-shaking unused code

## Testing Recommendations

1. **Same File Test**
   - Upload identical file as sender and receiver
   - Should show: ✅ File Integrity Maintained

2. **Modified File Test**
   - Upload original file as sender
   - Modify even one byte
   - Upload modified file as receiver
   - Should show: ❌ File Corrupted

3. **Different File Test**
   - Upload completely different file as receiver
   - Should show: ❌ File Corrupted

4. **Large File Test**
   - Test with files near 50 MB limit
   - Verify streaming works correctly

5. **Rate Limit Test**
   - Make 11 requests quickly
   - 11th request should be rate-limited

## Future Enhancements (Optional)

- Support for multiple hash algorithms (SHA-512, SHA-3)
- Batch file verification
- File compression before transmission
- QR code generation for verification codes
- Email notification system
- User authentication system
- File history/audit trail
- WebSocket for real-time updates
- Progressive web app (PWA) support
- Docker containerization

## Credits

**Development Team:**
- Richika Rani (24BCE1498)
- Nandani (24BCE1491)

**Project Guide:**
Dr. Swaminathan A

**Course:**
Computer Networks

**Academic Year:**
2024-2025

---

This implementation successfully replicates traditional C-based file integrity verification systems using modern web technologies while maintaining security best practices and providing an intuitive user experience.
