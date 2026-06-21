import { getCollection } from "../services/chromaService.js";

import { generateEmbedding } from "../services/embeddingService.js";

export async function searchDocuments(question) {
  const collection = await getCollection();

  const queryEmbedding = await generateEmbedding(question);

  const result = await collection.query({
    queryEmbeddings: [queryEmbedding],

    nResults: 5,
  });

  return {
    context: result.documents[0].join("\n"),

    sources: result.metadatas[0],
  };
}
