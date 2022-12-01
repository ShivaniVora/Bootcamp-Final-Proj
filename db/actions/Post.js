import Post from "../models/Post";
import dbConnect from "../dbConnect";

/* 
  The following Post model action is given to you.
  You will have to await dbConnect() at the start of every action
   to access the database.
*/

async function findAllPosts(skip, limit) {
  await dbConnect();
  return await Post.find({}).sort({date: 'desc'}).skip(skip).limit(limit);
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

async function deletePost(id) {
  await dbConnect();
  try {
    return await Post.deleteOne({'_id':id});
  } catch (err) {
    console.log(err);
  }
}

async function updatePost(query, update) {
  await dbConnect();
  try {
    return await Post.findOneAndUpdate(query, update);
  } catch (err) {
    console.log(err);
  }
}

async function linkComment(query, update) {
  await dbConnect();
  try {
    return await Post.findOneAndUpdate(query, update);
  } catch (err) {
    console.log(err);
  }
}

export { findAllPosts, createPost, findPost, deletePost, updatePost, linkComment };
