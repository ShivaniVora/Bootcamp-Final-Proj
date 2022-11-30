import { updatePost } from "../../../db/actions/Post";

function handler(req, res) {
    updatePostById(req, res);
}

async function updatePostById(req, res) {
  const query = JSON.parse(req.body)["query"];
  const update = JSON.parse(req.body)["update"];
  const newPost = await updatePost(query, update);
  res.status(200).json(newPost);
}

export default handler;