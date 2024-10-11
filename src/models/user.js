import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorites: {
    type: Array,
  },
});

// If the model exists, use it. If not, create a new one
export default mongoose.models.User || mongoose.model('User', userSchema);
