import OpenAI from "openai";
import dotenv from "dotenv";

import { tools } from "./tools.js";

import { searchResume } from "../tools/searchResume.js";

import { searchJobDescription } from "../tools/searchJobDescription.js";

import { extractSkills } from "../tools/extractSkillsTool.js";

import { findSkillGap } from "../tools/skillGapTool.js";

import { generateLearningPlan } from "../tools/learningPlanTool.js";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.openAi_key,
});

async function executeTool(toolName, args) {
  switch (toolName) {
    case "searchResume":
      return await searchResume();

    case "searchJobDescription":
      return await searchJobDescription();

    case "extractSkills":
      return await extractSkills(args.text);

    case "findSkillGap":
      return await findSkillGap(args.candidateSkills, args.requiredSkills);

    case "generateLearningPlan":
      return await generateLearningPlan(args.missingSkills);

    default:
      throw new Error(`Unknown Tool ${toolName}`);
  }
}

export async function runAgent(question) {
  const messages = [
    {
      role: "system",

      content: `
You are an AI Career Coach.

For skill-gap analysis:

1. searchResume

2. extractSkills

3. searchJobDescription

4. extractSkills

5. findSkillGap

6. generateLearningPlan

Then provide final answer.
`,
    },

    {
      role: "user",
      content: question,
    },
  ];

  let iteration = 1;

  while (true) {
    console.log(`Iteration ${iteration}`);

    const response = await client.chat.completions.create({
      model: "gpt-5.5",

      messages,

      tools,
    });

    const message = response.choices[0].message;

    if (!message.tool_calls) {
      return message.content;
    }
    console.log("tool execution order", message.tool_calls);
    messages.push(message);

    for (const toolCall of message.tool_calls) {
      const toolName = toolCall.function.name;

      const args = JSON.parse(toolCall.function.arguments);

      console.log("Tool:", toolName);

      const result = await executeTool(toolName, args);

      console.log("Result:", result);

      messages.push({
        role: "tool",

        tool_call_id: toolCall.id,

        content: JSON.stringify(result),
      });
    }

    iteration++;
  }
}
