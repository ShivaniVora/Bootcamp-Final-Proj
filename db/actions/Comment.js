import Comment from "../models/Comment";
import dbConnect from "../dbConnect";

async function findCommentsByPost() {}

async function createComment(body) {
  await dbConnect();
  try {
    return await Comment.create(body);
  } catch (err) {
    console.log(err);
  }
}

async function deleteComments(body) {
  await dbConnect();
  try {
    return await Comment.deleteMany(body);
  } catch (err) {
    console.log(err);
  }
}

export { findCommentsByPost, createComment, deleteComments };
