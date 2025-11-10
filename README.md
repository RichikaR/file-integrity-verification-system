# File Integrity Verification System

A full-stack web application that implements file integrity verification using SHA-256 and HMAC-SHA-256 cryptographic algorithms. This system replicates the functionality of traditional C-based implementations using modern web technologies.

## Project Information

**Course:** Computer Networks
**Academic Year:** 2024-2025

**Development Team:**
- Richika Rani (24BCE1498)
- Nandani (24BCE1491)

**Project Guide:**
Dr. Swaminathan A

## Features

### Core Functionality
- **Sender Mode**: Upload a file to generate a verification code using SHA-256 and HMAC-SHA-256
- **Receiver Mode**: Verify file integrity by uploading the received file and entering the verification code
- **File Comparison**: Direct comparison of two files using cryptographic hashes
- **Report Generation**: Download detailed integrity verification reports

### Security Features
- SHA-256 cryptographic hashing
- HMAC-SHA-256 with secret key authentication
- Random salt generation (16 bytes)
- Timing-safe comparison to prevent timing attacks
- Rate limiting (10 requests per minute)
- File size limit (50 MB)
- Secure file handling with automatic cleanup
- CORS protection
- Helmet.js security headers

### Educational Components
- **Learn Section**: Detailed explanations of SHA-256, HMAC, and salt-based hashing
- **Help Section**: Step-by-step usage instructions and troubleshooting
- **Developed By Section**: Team information and project overview

## Technology Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Vite for build tooling

### Backend
- Node.js with Express
- Native crypto module for hashing
- Multer for file uploads
- Helmet for security headers
- express-rate-limit for rate limiting
- CORS for cross-origin protection

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install frontend dependencies:
```bash
npm install
```

2. Install backend dependencies:
```bash
cd server
npm install
cd ..
```

3. Configure environment variables:
The `.env` file should contain:
```
HMAC_KEY=SECRET_KEY_456
VITE_API_URL=http://localhost:3001
```

### Running the Application

1. Start the backend server (in a separate terminal):
```bash
cd server
node index.js
```
The backend will run on `http://localhost:3001`

2. Start the frontend development server:
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`

### Building for Production

Build the frontend:
```bash
npm run build
```

## How It Works

### Sender Workflow
1. Upload original file
2. System computes SHA-256 hash of file content
3. Random 16-byte salt is generated
4. HMAC-SHA-256 is computed using secret key, hash, and salt
5. First 16 characters of HMAC become the verification code
6. Share verification code and salt with receiver

### Receiver Workflow
1. Upload received file
2. Enter verification code and salt from sender
3. System computes SHA-256 and HMAC using same process
4. Timing-safe comparison checks if codes match
5. Match confirms file integrity; mismatch indicates corruption

## API Endpoints

### POST `/generate-code`
Generates verification code for uploaded file.
- **Input**: File (multipart/form-data)
- **Output**: SHA-256, HMAC, salt, verification code
- **Rate Limit**: 10 requests/minute

### POST `/verify-code`
Verifies file integrity using verification code.
- **Input**: File, verification code, salt
- **Output**: Match status, computed code, hashes
- **Rate Limit**: 10 requests/minute

### POST `/compare-files`
Directly compares two files.
- **Input**: Two files (multipart/form-data)
- **Output**: Match status, both files' hashes
- **Rate Limit**: 10 requests/minute

### POST `/download-report`
Generates and downloads integrity report.
- **Input**: Report data (JSON)
- **Output**: Text file with detailed report

## Security Considerations

- Files are automatically deleted after processing
- Timing-safe comparison prevents timing attacks
- Secret HMAC key is stored securely in environment variables
- Rate limiting prevents abuse
- File size limits prevent resource exhaustion
- CORS restricts access to authorized origins
- Random salt ensures uniqueness for each verification

## Troubleshooting

### File Too Large
Files must be under 50 MB. Compress large files before uploading.

### Verification Code Doesn't Match
Common causes:
- File was modified after sender generated the code
- Wrong file was uploaded
- Network corruption during file transfer
- Incorrect verification code or salt entered

### Rate Limit Exceeded
Wait one minute before trying again. The system limits requests to 10 per minute.

### Server Connection Failed
Ensure the backend server is running on port 3001 and VITE_API_URL in .env is correct.

## OpenSSL Equivalence

This web application replicates OpenSSL command-line functionality:

```bash
# SHA-256 Hash
openssl dgst -sha256 file.txt

# HMAC-SHA-256
openssl dgst -sha256 -hmac "SECRET_KEY_456" file.txt
```

## License

This is an academic project developed for educational purposes.

## Acknowledgments

Special thanks to Dr. Swaminathan A for guidance and support throughout this project.
