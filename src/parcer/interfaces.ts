export interface IMessage {
    message: string;
    timestamp: string;
  }
  
  export interface IParser {
    getContent(file: string): Promise<IMessage[]>;
  }
  
  export interface ISaver {
    saveContent(messages: IMessage[], file: string): Promise<void>;
  }
  
  export interface IFetcher {
    fetch(filePath: string, params?: { body: string; method: string }): Promise<string>;
  }
  
  export interface IProcessor {
    processFiles(fileMap: Record<string, string>): Promise<void>;
  }
  