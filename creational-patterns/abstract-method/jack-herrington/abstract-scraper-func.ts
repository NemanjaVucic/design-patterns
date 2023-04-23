import fs from "fs";

interface IFileReader {
  isJSONFile(file: string): boolean;
  readTextFile(file: string): string;
  readJSONFile(filePath: string): unknown;
}

const createDirectoryScraper = (fileReader: IFileReader) => {
  return (dirPath: string) => {
    return fs
      .readdirSync(dirPath)
      .reduce<Record<string, unknown>>((a, fileName) => {
        if (fileReader.isJSONFile(fileName)) {
          a[fileName] = fileReader.readJSONFile(`${dirPath}/${fileName}`);
        } else {
          a[fileName] = fileReader.readTextFile(`${dirPath}/${fileName}`);
        }
        return a;
      }, {});
  };
};

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

const directoryScraper = createDirectoryScraper(fileReader);

console.log(directoryScraper("./data"));
