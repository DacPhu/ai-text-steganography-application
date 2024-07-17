import { Parser } from "./IParser";

class ImageParser implements Parser {
  parse(filePath: string): string {
    // Implement image file parsing logic here
    return `Parsed content from image file at ${filePath}`;
  }
}

export default ImageParser;
