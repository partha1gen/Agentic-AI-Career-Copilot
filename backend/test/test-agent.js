import dotenv from "dotenv";

import { runAgent } from "../agents/careerAgent.js";

dotenv.config();

async function test() {
  const answer = await runAgent(
    "Analyze my resume against the job description and create a learning plan.",
  );

  console.log("\nFINAL ANSWER\n");

  console.log(answer);
}

test();
