import { findPost } from "../../../db/actions/Post";

function handler(req, res) {
  findSpecificPost(req, res);
}

async function findSpecificPost(req, res) {
  const { id } = req.query;
  const newPost = await findPost(id);
  res.status(200).json(newPost);
}

export default handler;