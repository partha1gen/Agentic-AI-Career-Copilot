import { searchByType } from "./searchByTypeTool.js";

export async function searchJobDescription() {
  const jdText = await searchByType("job requirements", "jd");

  return jdText;
}
