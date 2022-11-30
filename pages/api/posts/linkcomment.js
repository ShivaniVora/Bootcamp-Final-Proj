import { linkComment } from "../../../db/actions/Post";

function handler(req, res) {
    linkCommentById(req, res);
}

async function linkCommentById(req, res) {
  const query = JSON.parse(req.body)["query"];
  const update = JSON.parse(req.body)["update"];
  const newPost = await linkComment(query, update);
  res.status(200).json(newPost);
}

export default handler;