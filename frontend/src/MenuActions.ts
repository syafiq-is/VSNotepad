import { store } from "./store";
import { OpenFile } from "../wailsjs/go/main/App";

type OpenFileResult = {
  Content: string;
  File: string;
};

const File = {
  open: function (): void {
    OpenFile().then((result) => {
      const res = result as OpenFileResult;
      // Check if a file has selected
      if (res.File !== "") {
        const filename = res.File.split("\\").pop() as string;
        store.addTab(filename, res.Content);
      }
    });
  },
};

// function writeFile() {
//   WriteFile(fileName.value, fileContent.value).then((result) => {
//     console.log(result);
//   });
// }

// function saveAsFile() {
//   SaveAsFile(fileName.value, fileContent.value).then((result) => {
//     console.log(result);
//   });
// }

export { File };
