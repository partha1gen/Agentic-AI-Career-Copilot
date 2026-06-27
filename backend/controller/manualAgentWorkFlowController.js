import { runAgent } from "../agents/careerAgent.js";
import dbConnect from "../services/mongooseService.js";

export const manualAgentWorkFlow = async (req, res) => {
  try {
    //connect to mongodb
    await dbConnect();

    const { queryString, sessionId } = req.body;
    const answer = await runAgent(queryString, sessionId);
    res.status(200).json({ answer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
