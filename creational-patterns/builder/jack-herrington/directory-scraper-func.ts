import fs from "fs";

interface IFileReader {
  isJSONFile(filePath: string): boolean;
  readTextFile(filePath: string): string;
  readJSONFile(filePath: string): unknown;
}

const directoryScraper = (dirPath: string, reader: IFileReader) => ({
  scanFiles: () => {
    return fs
      .readdirSync(dirPath)
      .reduce<Record<string, unknown>>((a, fileName) => {
        if (reader.isJSONFile(fileName)) {
          a[fileName] = reader.readJSONFile(`${dirPath}/${fileName}`);
        } else {
          a[fileName] = reader.readTextFile(`${dirPath}/${fileName}`);
        }
        return a;
      }, {});
  },
});

const fileReader: IFileReader = {
  isJSONFile(file: string): boolean {
    return file.endsWith(".json");
  },
  readTextFile(file: string): string {
    return fs.readFileSync(file, "utf8").toString();
  },
  readJSONFile(filePath: string): unknown {
    return JSON.parse(fs.readFileSync(filePath, "utf8").toString());
  },
};

const dirScraper = directoryScraper("./data", fileReader);

console.log(dirScraper.scanFiles());
