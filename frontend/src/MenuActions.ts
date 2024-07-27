import { contentStore, store } from "./store";
import { OpenFile, SaveFile, SaveFileAs } from "../wailsjs/go/main/App";

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
        store.addTab(res.File, res.Content);

        console.log("SUCCESS: File opened");
      } else {
        console.log("ERROR: No file selected");
      }
    });
  },
  save: function (): void {
    // Check if tab is an actual file not untitled file
    if (store.activeTab.path === "") return;
    // Get unsaved content tab
    const newContentTab = contentStore.tabs.find(
      (tab) => tab.id === store.activeTab.id
    );
    if (newContentTab) {
      // Save current activeTab unsaved content
      SaveFile(store.activeTab.path, newContentTab.content)
        .then(() => {
          console.log("SUCCESS: File saved");
        })
        .catch(() => {
          console.log("ERROR: File not saved");
        });
    }
  },
  saveAs: function (): void {
    // Get unsaved content tab
    const newContentTab = contentStore.tabs.find(
      (tab) => tab.id === store.activeTab.id
    );
    if (newContentTab) {
      SaveFileAs(store.activeTab.title, newContentTab.content)
        .then(() => {
          console.log("SUCCESS: File saved");
        })
        .catch(() => {
          console.log("ERROR: File not saved");
        });
    }
  },
};

export { File };
