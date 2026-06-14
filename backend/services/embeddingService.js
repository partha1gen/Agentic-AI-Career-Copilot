import { openAiClient } from "../utils/openai.js";

export const generateEmbedding = async (text) => {
  try {
    const response = await openAiClient.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });

    return response.data[0].embedding;
  } catch (e) {
    throw new Error("from embedding", { cause: e.message });
  }
};
