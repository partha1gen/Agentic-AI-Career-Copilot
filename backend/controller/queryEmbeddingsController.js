import ResumeModel from "../model/ResumeModel.js";

export const queryEmbedding = async (req, res) => {
  console.log(req.body);
  if (!req.body?.query) {
    return res.status(400).json({ message: "query param not present" });
  }
  const searchText = req.body.query;
  console.log(searchText);
  const serachResults = await ResumeModel.queryEmbeddingFromSearch(searchText);
  console.log(serachResults);
  return res.status(200).json({ serachResults });
};
