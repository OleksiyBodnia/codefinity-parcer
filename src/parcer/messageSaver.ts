import { ISaver, IMessage, IFetcher } from "./interfaces";

export class MessageSaver implements ISaver {
  private fetcher: IFetcher;

  constructor(fetcher: IFetcher) {
    this.fetcher = fetcher;
  }

  async saveContent(messages: IMessage[], file: string): Promise<void> {
    const waitGroup: Promise<any>[] = [];
    for (const msg of messages) {
      const promise = new Promise<void>(async (resolve) => {
        await new Promise<void>((r) =>
          setTimeout(r, Math.random() * 5 * 1000)
        );
        await this.fetcher.fetch(file, {
          body: JSON.stringify({
            ...msg,
            type: msg.message.length > 8 ? "long" : "short",
          }),
          method: "POST",
        });
        console.log(
          `Saved message - ${msg.message} to ${file} as ${
            msg.message.length > 8 ? "long" : "short"
          }`
        );
        resolve();
      });
      waitGroup.push(promise);
    }
    await Promise.all(waitGroup);
  }
}
