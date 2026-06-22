import { searchDocuments } from "../tools/ragTool.js";
import { extractSkills } from "../tools/extractSkillsTool.js";
import { searchByType } from "../tools/searchByTypeTool.js";

//const result = await searchDocuments("What skills does candidate have?");

const result = await searchByType("requirements", "jd");

console.log(result);
