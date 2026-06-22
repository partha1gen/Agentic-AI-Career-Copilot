import { getCollection } from "../services/chromaService.js";
import { generateEmbedding } from "../services/embeddingService.js";

export async function searchByType(question, documentType) {
  const collection = await getCollection();

  const embedding = await generateEmbedding(question);

  const result = await collection.query({
    queryEmbeddings: [embedding],

    where: {
      documentType,
    },

    nResults: 5,
  });

  return result.documents[0].join("\n");
}
