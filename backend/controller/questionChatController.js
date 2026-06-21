import ResumeModel from "../model/ResumeModel.js";
import { ragAnalyzer } from "../services/ragService.js";
import ChatModel from "../model/ChatModel.js";
import promptFunction from "../services/aiPromtService.js";
import dbConnect from "../services/mongooseService.js";
import {
  getRedisResponse,
  saveInRediscache,
} from "../services/redisService.js";

export const questionChat = async (req, res) => {
  try {
    //connect to mongodb
    await dbConnect();

    if (!req.body?.queryString) {
      return res.status(400).json({ message: "question param not present" });
    }
    const { sessionId, queryString } = req.body;
    //before gpt , call redis cache
    const cachedRes = await getRedisResponse(queryString);
    if (cachedRes !== null) {
      console.log("cache hit");

      return res.status(200).json(cachedRes);
    }
    const history = await ChatModel.findExistingSession(sessionId, queryString);

    const messages = promptFunction(history);
    const searchText = queryString;
    const serachResults = await ResumeModel.queryEmbeddingFromSearch(
      searchText,
      true,
    );
    //source attribution
    const sources = serachResults.metadatas[0].map((item) => ({
      source: item.source,
      page: item.page,
    }));
    //build context
    const context = serachResults.documents[0].join("\n");
    const response = await ragAnalyzer(context, searchText, messages);
    // return res.status(200).json({ serachResults });

    //save in redis
    await saveInRediscache(
      queryString,
      response.choices[0].message.content,
      sources,
    );
    //save in db
    await ChatModel.saveHistoryInDb(response.choices[0].message.content);

    return res.status(200).json({
      answer: response.choices[0].message.content,
      sources,
    });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "from chat controller", cause: e.message });
  }
};
