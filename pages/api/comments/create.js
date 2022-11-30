import { createComment } from "../../../db/actions/Comment";

function handler(req, res) {
  createNewComment(req, res);
}

async function createNewComment(req, res) {
  const newComment = await createComment(JSON.parse(req.body));
  res.status(200).json(newComment);
}

export default handler;