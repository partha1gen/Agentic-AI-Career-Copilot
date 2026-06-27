import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

const skillAnalysis = z.object({
  skills: z.array(z.string()),
});
const client = new OpenAI({
  apiKey: process.env.openAi_key,
});

export async function extractSkills(context) {
  const response = await client.responses.parse({
    model: "gpt-5.5",

    input: [
      {
        role: "system",

        content: `
Analayze the text. Extract
1. skills

`,
      },

      {
        role: "user",

        content: context,
      },
    ],
    text: {
      format: zodTextFormat(skillAnalysis, "skill_analysis"),
    },
  });

  const result = JSON.parse(response.output_text);
  return result.skills;
}
