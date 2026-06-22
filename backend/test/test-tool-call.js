import OpenAI from "openai";
import dotenv from "dotenv";

import { tools } from "../agents/tools.js";

import { searchDocuments } from "../tools/ragTool.js";
import { extractSkills } from "../tools/extractSkillsTool.js";
import { searchByType } from "../tools/searchByTypeTool.js";

import { findSkillGap } from "../tools/skillGapTool.js";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.openAi_key,
});

async function runAgent() {
  const messages = [
    {
      role: "system",

      content: `
You are an AI career advisor.

When user asks about skill gaps:

1. Call searchDocuments

2. Then call extractSkills to extract skills 

3. Then call searchByType for job requirements

4. Then call extractSkills again to extract needed skills from job description

5. Then call findSkillGap to identify missing skills

6. Then provide final answer
`,
    },

    {
      role: "user",

      content: "What skills are missing for this role?",
    },
  ];

  let iteration = 1;

  while (true) {
    console.log(`\n=== ITERATION ${iteration} ===`);

    const response = await client.chat.completions.create({
      model: "gpt-5.5",

      messages,

      tools,
    });

    const message = response.choices[0].message;

    if (!message.tool_calls) {
      console.log("\nFINAL ANSWER\n");

      console.log(message.content);

      return;
    }

    messages.push(message);

    for (const toolCall of message.tool_calls) {
      const toolName = toolCall.function.name;

      const args = JSON.parse(toolCall.function.arguments);

      console.log("TOOL:", toolName);

      let result;

      if (toolName === "searchDocuments") {
        result = await searchDocuments(args.question);
      }

      if (toolName === "findSkillGap") {
        result = await findSkillGap(args.candidateSkills, args.requiredSkills);
      }

      console.log("RESULT:", result);

      messages.push({
        role: "tool",

        tool_call_id: toolCall.id,

        content: JSON.stringify(result),
      });
    }

    iteration++;
  }
}

runAgent();
