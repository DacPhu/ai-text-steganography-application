import { Parser } from "./IParser";

class PDFParser implements Parser {
  parse(filePath: string): string {
    // Implement PDF parsing logic here
    return `Parsed content from PDF file at ${filePath}`;
  }
}

export default PDFParser;
