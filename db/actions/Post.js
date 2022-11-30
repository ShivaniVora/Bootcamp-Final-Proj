import Post from "../models/Post";
import dbConnect from "../dbConnect";

/* 
  The following Post model action is given to you.
  You will have to await dbConnect() at the start of every action
   to access the database.
*/

async function findAllPosts() {
  await dbConnect();
  return await Post.find({});
}

async function createPost(body) {
  await dbConnect();
  try {
    return await Post.create(body);
  } catch (err) {
    console.log(err);
  }
}

async function findPost(id) {
  await dbConnect();
  try {
    return await Post.find({'_id':id});
  } catch (err) {
    console.log(err);
  }
}

export { findAllPosts, createPost, findPost };
