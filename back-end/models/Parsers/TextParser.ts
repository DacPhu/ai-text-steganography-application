import { Parser } from "./IParser";

class TextParser implements Parser {
  parse(filePath: string): string {
    // Implement text file parsing logic here
    return `Parsed content from text file at ${filePath}`;
  }
}

export default TextParser;
