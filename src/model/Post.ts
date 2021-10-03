import {Schema,model,Document} from "mongoose";

export interface IPost extends Document{
  title: string;
  description: string;
  image: string;
}

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Post = model<IPost>("Post", postSchema);
export default Post;