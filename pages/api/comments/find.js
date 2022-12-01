import { findCommentsByPost } from "../../../db/actions/Comment";

function handler(req, res) {
  findCommentsById(req, res);
}

async function findCommentsById(req, res) {
  const comments = await findCommentsByPost(JSON.parse(req.body));
  res.status(200).json(comments);
}

export default handler;