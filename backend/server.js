import express from "express";
import cors from "cors";
import { upload } from "./middleware/multer.js";
import { uploadResumeAndEmbed } from "./controller/uploadresumeController.js";
import { queryEmbedding } from "./controller/queryEmbeddingsController.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/upload-resume", upload.single("resume"), uploadResumeAndEmbed);
app.post("/search", queryEmbedding);

app.listen(3000, () => {
  console.log("server started");
});
