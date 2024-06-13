import { IProcessor, IParser, ISaver } from "./interfaces";

export class FileProcessor implements IProcessor {
  private parser: IParser;
  private saver: ISaver;

  constructor(parser: IParser, saver: ISaver) {
    this.parser = parser;
    this.saver = saver;
  }

  async processFiles(fileMap: Record<string, string>): Promise<void> {
    const waitGroup: Promise<any>[] = [];
    for (const [input, output] of Object.entries(fileMap)) {
      const promise = this.parser
        .getContent(input)
        .catch((error) => {
          console.error(`Error while getting file ${input} - ${error}`);
          return [];
        })
        .then((messages) => this.saver.saveContent(messages, output))
        .catch((error) => {
          console.error(`Error while saving file ${output} - ${error}`);
        });
      waitGroup.push(promise);
    }
    await Promise.all(waitGroup);
  }
}
