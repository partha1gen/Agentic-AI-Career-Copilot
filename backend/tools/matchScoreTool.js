export async function matchCandidateScore(candidateSkills, requiredSkills) {
  console.log("matchScore called");
  const skillsMatched = requiredSkills.filter((skill) =>
    candidateSkills.includes(skill),
  );

  return `${(skillsMatched.length / requiredSkills.length) * 100}%`;
}
