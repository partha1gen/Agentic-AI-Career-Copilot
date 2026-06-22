import { runAgent } from "../agents/careerAgent.js";

export const manualAgentWorkFlow = async (req, res) => {
  try {
    const { queryString } = req.body;
    const answer = await runAgent(queryString);
    res.status(200).json({ answer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
