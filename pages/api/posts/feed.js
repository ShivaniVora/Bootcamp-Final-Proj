import { findAllPosts } from "../../../db/actions/Post";

function handler(req, res) {
  getAllPosts(req, res);
}

async function getAllPosts(req, res) {
  const limit = JSON.parse(req.body)["limit"];
  const skip = JSON.parse(req.body)["skip"];
  const feed = await findAllPosts(skip, limit);
  res.status(200).json(feed);
}

export default handler;
