import { Parser } from "./IParser";
import PDFParser from "./PDFParser";
import TextParser from "./TextParser";
import ImageParser from "./ImageParser";

class ParserFactory {
  static getParser(fileType: string): Parser {
    switch (fileType) {
      case "pdf":
        return new PDFParser();
      case "txt":
        return new TextParser();
      case "png":
        return new ImageParser();
      default:
        throw new Error(`Unsupported file type: ${fileType}`);
    }
  }
}

export default ParserFactory;
