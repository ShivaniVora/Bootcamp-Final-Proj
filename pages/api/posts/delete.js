import { deletePost } from "../../../db/actions/Post";

function handler(req, res) {
  deleteById(req, res);
}

async function deleteById(req, res) {
  const newPost = await deletePost(JSON.parse(req.body));
  res.status(200).json(newPost);
}

export default handler;