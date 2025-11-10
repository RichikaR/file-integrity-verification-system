# Quick Start Instructions

## Running the Application

### Step 1: Start the Backend Server

Open a terminal and run:

```bash
cd server
node index.js
```

You should see: `Server running on port 3001`

**Keep this terminal running!**

### Step 2: Start the Frontend (Development Mode)

The frontend dev server starts automatically in the main interface.

The application will be available at: `http://localhost:5173`

## Using the Application

### For Sender:
1. Click the **Sender Mode** tab
2. Upload your original file (max 50 MB)
3. Click **Generate Verification Code**
4. Copy the **Verification Code** (16 characters)
5. Copy the **Salt** value (32 hex characters)
6. Share both the code and salt with the receiver

### For Receiver:
1. Click the **Receiver Mode** tab
2. Upload the received file
3. Enter the **Verification Code** from sender
4. Enter the **Salt** from sender
5. Click **Verify File**
6. See if the file integrity is maintained ✅ or corrupted ❌

### For Direct Comparison:
1. Click the **File Comparison** tab
2. Upload File 1 (original)
3. Upload File 2 (received)
4. Click **Compare Files**
5. See if files are identical or different

### Download Report:
After any verification, click the **Download** button in the top-right to get a detailed text report.

## Important Notes

- Both backend AND frontend must be running
- Backend runs on port 3001
- Frontend runs on port 5173
- Maximum file size: 50 MB
- Rate limit: 10 requests per minute
- Files are automatically deleted after processing for security

## Troubleshooting

**Backend not starting?**
- Make sure you're in the `server` directory
- Check that port 3001 is available
- Verify Node.js is installed: `node --version`

**Frontend can't connect to backend?**
- Ensure backend is running on port 3001
- Check `.env` file has `VITE_API_URL=http://localhost:3001`

**Rate limit error?**
- Wait 1 minute between requests
- This is a security feature

## For Your Presentation

This project demonstrates:
1. **SHA-256 Hashing** - Cryptographic file fingerprinting
2. **HMAC-SHA-256** - Message authentication with secret key
3. **Salt-based Security** - Random data for uniqueness
4. **Timing-safe Comparison** - Prevents timing attacks
5. **Real-world Network Integrity** - Sender-receiver verification model

Good luck with your Computer Networks project presentation!
