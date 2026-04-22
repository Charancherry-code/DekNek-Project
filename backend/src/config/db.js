const dns = require("dns");

const mongoose = require("mongoose");
let hasLoggedMongoError = false;

if (process.env.DNS_SERVERS) {
  const servers = process.env.DNS_SERVERS.split(",").map((server) =>
    server.trim(),
  );
  if (servers.length > 0) {
    dns.setServers(servers);
  }
}

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI_DIRECT || process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("Missing MONGO_URI or MONGO_URI_DIRECT");
    }

    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");
  } catch (error) {
    if (!hasLoggedMongoError) {
      hasLoggedMongoError = true;
      console.error("MongoDB connection error:", error.message);
      console.error(
        "If you are using a mongodb+srv URI and see querySrv EREFUSED, set MONGO_URI_DIRECT to the standard Atlas connection string or use a local MongoDB URI.",
      );
    }
    setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB;
