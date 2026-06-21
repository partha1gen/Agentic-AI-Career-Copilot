export const tools = [
  {
    type: "function",

    function: {
      name: "searchDocuments",

      description: "Retrieve candidate and job skills",

      parameters: {
        type: "object",

        properties: {
          question: {
            type: "string",
          },
        },

        required: ["question"],
      },
    },
  },

  {
    type: "function",

    function: {
      name: "findSkillGap",

      description: "Compare candidate skills and required skills",

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
];
