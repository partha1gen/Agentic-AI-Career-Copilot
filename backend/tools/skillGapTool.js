export async function findSkillGap(candidateSkills, requiredSkills) {
  console.log("findSkillGap called");

  return requiredSkills.filter((skill) => !candidateSkills.includes(skill));
}
