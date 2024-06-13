import { MockFetcher } from "./";
import { MessageParser } from "./MessageParser";
import { MessageSaver } from "./MessageSaver";
import { FileProcessor } from "./FileProcessor";

const main = async () => {
  const files = {
    "file1.txt": "out1.txt",
    "file2.txt": "out2.txt",
    "file3.txt": "out3.txt",
  };
  const fetcher = new MockFetcher();
  const parser = new MessageParser(fetcher);
  const saver = new MessageSaver(fetcher);
  const processor = new FileProcessor(parser, saver);
  await processor.processFiles(files);
};

main();
