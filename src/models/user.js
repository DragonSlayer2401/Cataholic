import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
        'Invalid Password',
      ],
    },
    favorites: [
      {
        id: { type: String, required: true, index: true },
        src: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

// If the model exists, use it. If not, create a new one
export default mongoose.models.User || mongoose.model('User', userSchema);
