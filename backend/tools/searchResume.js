import { searchByType } from "./searchByTypeTool.js";

export async function searchResume() {
  const resumeText = await searchByType("candidate skills", "resume");

  return resumeText;
}
