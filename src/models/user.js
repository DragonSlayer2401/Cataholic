import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^(?![_.-])[a-zA-Z0-9._%+-]{1,64}(?<![_.-])@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/,
        'Invalid Email',
      ],
    },
    password: {
      type: String,
      required: true,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        'Invalid Password',
      ],
    },
    favorites: [
      {
        id: { type: String, required: true, index: true },
        alt: { type: String, required: true },
        src: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

// If the model exists, use it. If not, create a new one
export default mongoose.models.User || mongoose.model('User', userSchema);
