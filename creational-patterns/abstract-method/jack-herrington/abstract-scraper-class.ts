import fs from "fs";

abstract class AbstractDirectoryScraper {
  constructor(public dirPath: string) {}

  scanFiles() {
    return fs
      .readdirSync(this.dirPath)
      .reduce<Record<string, unknown>>((a, fileName) => {
        if (this.isJSONFile(fileName)) {
          a[fileName] = this.readJSONFile(`${this.dirPath}/${fileName}`);
        } else {
          a[fileName] = this.readTextFile(`${this.dirPath}/${fileName}`);
        }
        return a;
      }, {});
  }

  abstract isJSONFile(filePath: string): boolean;
  abstract readTextFile(filePath: string): string;
  abstract readJSONFile(filePath: string): unknown;
}

class FileReader extends AbstractDirectoryScraper {
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

const directoryScraper = new FileReader("./data");

console.log(directoryScraper.scanFiles());
