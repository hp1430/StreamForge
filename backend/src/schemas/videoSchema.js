import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    originalVideoKey: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ['UPLOADING', 'UPLOADED', 'PROCESSING', 'READY', 'FAILED'],
      default: 'UPLOADING'
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Video', videoSchema);
