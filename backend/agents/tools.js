export const tools = [
  {
    type: "function",

    name: "searchResume",
    description: "Get candidate resume content",
    parameters: {
      type: "object",
      properties: {},
    },
  },

  {
    type: "function",

    name: "searchJobDescription",
    description: "Get job description content",
    parameters: {
      type: "object",
      properties: {},
    },
  },

  {
    type: "function",

    name: "extractSkills",
    description: "Extract skills from text",
    strict: true,
    parameters: {
      type: "object",

      properties: {
        text: {
          type: "string",
          description: "the resume or JD text",
        },
      },

      required: ["text"],
      additionalProperties: false,
    },
  },

  {
    type: "function",

    name: "matchCandidateScore",

    description: "Find match score",
    strict: true,
    parameters: {
      type: "object",

      properties: {
        candidateSkills: {
          type: "array",
          items: {
            type: "string",
          },
        },

        requiredSkills: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },

      required: ["candidateSkills", "requiredSkills"],
      additionalProperties: false,
    },
  },
  {
    type: "function",

    name: "findSkillGap",

    description: "Find missing skills",

    parameters: {
      type: "object",

      properties: {
        candidateSkills: {
          type: "array",
          items: {
            type: "string",
          },
        },

        requiredSkills: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },

      required: ["candidateSkills", "requiredSkills"],
      additionalProperties: false,
      strict: true,
    },
  },

  {
    type: "function",

    name: "generateLearningPlan",

    description: "Create learning plan from missing skills",

    parameters: {
      type: "object",

      properties: {
        missingSkills: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },

      required: ["missingSkills"],
      additionalProperties: false,
      strict: true,
    },
  },
];
