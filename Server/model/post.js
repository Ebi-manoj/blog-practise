import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: String,
    default: Date.now,
  },
});

const Post = mongoose.model('Post', PostSchema);

export default Post;