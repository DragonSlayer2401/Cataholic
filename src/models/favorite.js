import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    id: { type: String, required: true, index: true },
    alt: { type: String, required: true },
    src: { type: String, required: true },
  },
  { timestamps: true }
);

// If the model exists, use it. If not, create a new one
export default mongoose.models.Favorite ||
  mongoose.model('Favorite', favoriteSchema);
