import { IParser, IMessage, IFetcher } from "./interfaces";

export class MessageParser implements IParser {
  private fetcher: IFetcher;

  constructor(fetcher: IFetcher) {
    this.fetcher = fetcher;
  }

  async getContent(file: string): Promise<IMessage[]> {
    const res = await this.fetcher.fetch(file);
    const messages = res.split("\n").map((line) => {
      const [message, timestamp] = line.split(":");
      return { message: message.trim(), timestamp: timestamp.trim() };
    });
    return messages;
  }
}
