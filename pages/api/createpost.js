import { createPost } from "../../db/actions/Post";

function handler(req, res) {
  createNewPost(req, res);
}

async function createNewPost(req, res) {
  const newPost = await createPost(JSON.parse(req.body));
  res.status(200).json(newPost);
}

export default handler;