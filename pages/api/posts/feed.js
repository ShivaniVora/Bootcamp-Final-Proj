import { findAllPosts } from "../../../db/actions/Post";

function handler(req, res) {
  getAllPosts(req, res);
}

async function getAllPosts(req, res) {
  const posts = await findAllPosts();
  res.status(200).json(posts);
}

export default handler;
