const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB Atlas...');
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      tlsAllowInvalidCertificates: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn; // Return connection
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    if (error.message.includes('SSL')) {
      console.error('TIP: This might be an SSL/TLS handshake issue. Check your network or VPN.');
    }
    throw error; // Throw so caller can catch
  }
};

module.exports = connectDB;
