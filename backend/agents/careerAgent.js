import OpenAI from "openai";

import { tools } from "./tools.js";
const client = new OpenAI({
  apiKey: process.env.openAi_key,
});

export async function runAgent(question) {
  const messages = [
    {
      role: "system",

      content: `
You are an AI Career Assistant.
`,
    },

    {
      role: "user",
      content: question,
    },
  ];
}
