import OpenAI from "openai";
import dotenv from "dotenv";
import ChatModel from "../model/ChatModel.js";
import { tools } from "./tools.js";

import { searchResume } from "../tools/searchResume.js";

import { searchJobDescription } from "../tools/searchJobDescription.js";

import { extractSkills } from "../tools/extractSkillsTool.js";
import { matchCandidateScore } from "../tools/matchScoreTool.js";

import { findSkillGap } from "../tools/skillGapTool.js";

import { generateLearningPlan } from "../tools/learningPlanTool.js";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.openAi_key,
});

async function executeTool(toolName, args) {
  try {
    switch (toolName) {
      case "searchResume":
        return await searchResume();

      case "searchJobDescription":
        return await searchJobDescription();

      case "extractSkills":
        return await extractSkills(args.text);

      case "findSkillGap":
        return await findSkillGap(args.candidateSkills, args.requiredSkills);

      case "matchCandidateScore":
        return await matchCandidateScore(
          args.candidateSkills,
          args.requiredSkills,
        );

      case "generateLearningPlan":
        return await generateLearningPlan(args.missingSkills);

      default:
        throw new Error(`Unknown Tool ${toolName}`);
    }
  } catch (error) {
    return { error: error.message };
  }
}

export async function runAgent(question, sessionId) {
  //find existing session and chat records
  const history = await ChatModel.findExistingSession(sessionId, question);
  const input = [
    {
      role: "system",

      content: `
You are an AI Career Coach.

For skill-gap analysis:

1. searchResume

2. extractSkills

3. searchJobDescription

4. extractSkills

5. matchCandidateScore

6. findSkillGap

7. generateLearningPlan

Then provide final answer.
`,
    },
  ];
  input.push(...history);

  let iteration = 1;

  while (true) {
    console.log(`Iteration ${iteration}`);

    const response = await client.responses.create({
      model: "gpt-5.5",

      tools,
      input,
    });

    if (response.output_text) {
      //save in db
      await ChatModel.saveHistoryInDb(response.output_text);
      return response.output_text;
    }
    // Preserve model output for the next turn
    input.push(...response.output);

    for (const item of response.output) {
      let output;
      if (item.type !== "function_call") continue;
      const toolName = item.name;

      const args = JSON.parse(item.arguments);

      console.log("Tool:", toolName);

      const result = await executeTool(toolName, args);

      console.log("Result:", result);
      // 4. Provide function call results to the model
      input.push({
        type: "function_call_output",
        call_id: item.call_id,
        output: JSON.stringify(result),
      });
    }

    iteration++;
  }
}
