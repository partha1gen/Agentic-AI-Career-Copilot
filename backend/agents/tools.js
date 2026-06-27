export const tools = [
  {
    type: "function",
    function: {
      name: "searchResume",
      description: "Get candidate resume content",
      parameters: {
        type: "object",
        properties: {},
      },
    },
  },

  {
    type: "function",
    function: {
      name: "searchJobDescription",
      description: "Get job description content",
      parameters: {
        type: "object",
        properties: {},
      },
    },
  },

  {
    type: "function",
    function: {
      name: "extractSkills",
      description: "Extract skills from text",

      parameters: {
        type: "object",

        properties: {
          text: {
            type: "string",
          },
        },

        required: ["text"],
      },
    },
  },

  {
    type: "function",
    function: {
      name: "matchCandidateScore",

      description: "Find match score",

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
      },
    },
  },
  {
    type: "function",
    function: {
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
      },
    },
  },

  {
    type: "function",
    function: {
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
      },
    },
  },
];
