import { NeynarAPIClient, Configuration } from "@neynar/nodejs-sdk";

class NeynarClientSingleton {
  private static instance: NeynarAPIClient;

  private constructor() {} 

  public static getInstance(): NeynarAPIClient {
    if (!this.instance) {
      const apiKey = process.env.NEYNAR_API_KEY;

      if (!apiKey) {
        throw new Error("Missing NEYNAR_API_KEY environment variable");
      }

      const config = new Configuration({ apiKey });
      this.instance = new NeynarAPIClient(config);
    }

    return this.instance;
  }
}

export default NeynarClientSingleton;
