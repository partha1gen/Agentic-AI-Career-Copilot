import ResumeModel from "../model/ResumeModel.js";

export const uploadResumeAndEmbed = async (req, res) => {
  if (!req.file) {
    return res.status(500).json({ message: "file is required" });
  }
  if (req.file) {
    try {
      const pdfText = await ResumeModel.extractPdfText(req.file.path);
      //console.log(pdfText);
      //generate embedding
      const embeddingText =
        await ResumeModel.generateEmbeddingFromText(pdfText);
      //store embedding
      await ResumeModel.storeEmbeddings(
        embeddingText,
        req.file.originalname,
        pdfText,
      );
      res.status(200).json({ message: "embedding  store successful" });
    } catch (e) {
      res.status(500).json({ error: e.message, message: e.cause });
    }
  }
};
