import mongoose from "mongoose"

const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: {
        type: String,
        unique: true
      },
      description: String,
      createdAt: {
        type: 'Date',
        default: Date.now
      },
      file: {
        name: String,
        key: String
      },
      isPublished: {
        type: Boolean,
        default: false
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
})

const PostModel = mongoose.model('Post',PostSchema)
export default PostModel