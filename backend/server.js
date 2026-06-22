import express from "express";
import cors from "cors";
import resumeRouter from "./routes/uploadResumeAndSearch.js";
import pdfChatRouter from "./routes/pdfChat.js";
import { searchDocuments } from "./tools/ragTool.js";
import { findSkillGap } from "./tools/skillGapTool.js";
import { generateLearningPlan } from "./tools/learningPlanTool.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/resume-search", resumeRouter);
app.use("/pdf-chat", pdfChatRouter);

app.listen(3000, () => {
  console.log("server started");
});
