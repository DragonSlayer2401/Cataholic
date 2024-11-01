import mongoose from 'mongoose';

let cachedConnection = global.mongoose;

if (!cachedConnection) {
  cachedConnection = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
  if (cachedConnection.conn) {
    return cachedConnection.conn;
  }

  if (!cachedConnection.promise) {
    cachedConnection.promise = await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false, // Stops commands from being buffered before connecting
    });
  }

  cachedConnection.conn = await cachedConnection.promise;

  return cachedConnection.conn;
};

export default dbConnect;
