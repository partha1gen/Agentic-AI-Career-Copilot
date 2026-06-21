export async function generateLearningPlan(missingSkills) {
  return missingSkills.map((skill, index) => ({
    week: index + 1,

    skill,
  }));
}
