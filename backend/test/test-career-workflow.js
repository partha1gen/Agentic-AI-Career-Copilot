import dotenv from "dotenv";

import { searchResume } from "../tools/searchResume.js";

import { searchJobDescription } from "../tools/searchJobDescription.js";

import { extractSkills } from "../tools/extractSkillsTool.js";

import { findSkillGap } from "../tools/skillGapTool.js";

import { generateLearningPlan } from "../tools/learningPlanTool.js";
import { matchCandidateScore } from "../tools/matchScoreTool.js";

dotenv.config();

async function runWorkflow() {
  console.log("\nSTEP 1 : SEARCH RESUME\n");

  const resumeText = await searchResume();

  console.log(resumeText);

  console.log("\nSTEP 2 : EXTRACT RESUME SKILLS\n");

  const candidateSkills = await extractSkills(resumeText);

  console.log(candidateSkills);

  console.log("\nSTEP 3 : SEARCH JD\n");

  const jdText = await searchJobDescription();

  console.log(jdText);

  console.log("\nSTEP 4 : EXTRACT JD SKILLS\n");

  const requiredSkills = await extractSkills(jdText);

  console.log(requiredSkills);

  console.log("\nSTEP 5 : FIND Match Score\n");

  const matchScore = await matchCandidateScore(candidateSkills, requiredSkills);

  console.log(matchScore);

  console.log("\nSTEP 6 : FIND GAP\n");

  const missingSkills = await findSkillGap(candidateSkills, requiredSkills);

  console.log(missingSkills);

  console.log("\nSTEP 7: LEARNING PLAN\n");

  const learningPlan = await generateLearningPlan(missingSkills);

  console.log(learningPlan);

  console.log("\nFINAL RESULT\n");

  console.log({
    candidateSkills,
    requiredSkills,
    missingSkills,
    learningPlan,
  });
}

runWorkflow();
