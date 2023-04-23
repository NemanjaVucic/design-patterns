import fs from "fs";

interface IFileReader {
  isJSONFile(filePath: string): boolean;
  readTextFile(filePath: string): string;
  readJSONFile(filePath: string): unknown;
}

class DirectoryScraper {
  constructor(public dirPath: string, public reader: IFileReader) {}

  scanFiles() {
    return fs
      .readdirSync(this.dirPath)
      .reduce<Record<string, unknown>>((a, fileName) => {
        if (this.reader.isJSONFile(fileName)) {
          a[fileName] = this.reader.readJSONFile(`${this.dirPath}/${fileName}`);
        } else {
          a[fileName] = this.reader.readTextFile(`${this.dirPath}/${fileName}`);
        }
        return a;
      }, {});
  }
}

class FileReader implements IFileReader {
  isJSONFile(file: string): boolean {
    return file.endsWith(".json");
  }
  readTextFile(file: string): string {
    return fs.readFileSync(file, "utf8").toString();
  }
  readJSONFile(filePath: string): unknown {
    return JSON.parse(fs.readFileSync(filePath, "utf8").toString());
  }
}

const fileReader = new FileReader();
const directoryScraper = new DirectoryScraper("./data", fileReader);

console.log(directoryScraper.scanFiles());
