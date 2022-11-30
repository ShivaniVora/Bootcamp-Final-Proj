import { deleteComments } from "../../../db/actions/Comment";

function handler(req, res) {
  deleteAllFromPost(req, res);
}

async function deleteAllFromPost(req, res) {
  const deleted = await deleteComments(JSON.parse(req.body));
  res.status(200).json(deleted);
}

export default handler;