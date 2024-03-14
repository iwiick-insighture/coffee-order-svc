import { Redis } from "ioredis";
import configData from "../configs/config";

export class RedisService {
  private static redisClient: Redis;
  private constructor() {}

  public static getClient() {
    if (!RedisService.redisClient) {
      RedisService.redisClient = new Redis({
        host: configData.redis.host,
        port: configData.redis.port,
      });
      console.log(`RedisService Client Initialized`);
    }

    return RedisService.redisClient;
  }
}
