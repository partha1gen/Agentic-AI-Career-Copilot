import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.openAi_key,
});

export async function extractSkills(context) {
  const response = await client.chat.completions.create({
    model: "gpt-5.5",

    response_format: {
      type: "json_object",
    },

    messages: [
      {
        role: "system",

        content: `
Extract technical skills.

Return JSON:

{
 "skills":[]
}
`,
      },

      {
        role: "user",

        content: context,
      },
    ],
  });

  const result = JSON.parse(response.choices[0].message.content);

  return result.skills;
}
