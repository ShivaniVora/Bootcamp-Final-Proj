import { countPosts } from "../../../db/actions/Post";

function handler(req, res) {
  countTotalPosts(req, res);
}

async function countTotalPosts(req, res) {
  console.log("api level");
  const count = await countPosts();
  res.status(200).json(count);
}

export default handler;