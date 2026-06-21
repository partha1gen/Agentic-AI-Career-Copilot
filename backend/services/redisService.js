import { createClient } from "redis";
const redis = createClient();

export const getRedisResponse = async (question) => {
  if (!redis.isOpen) {
    await redis.connect();
  }
  const cacheKey = question;

  const cached = await redis.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  } else {
    return null;
  }
};

export const saveInRediscache = async (cacheKey, answer, sources) => {
  await redis.set(
    cacheKey,

    JSON.stringify({
      answer,
      sources,
    }),

    {
      EX: 3600,
    },
  );
};
