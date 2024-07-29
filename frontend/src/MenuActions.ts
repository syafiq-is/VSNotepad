import { contentStore, store } from "./store";
import { OpenFile, SaveFile, SaveFileAs } from "../wailsjs/go/main/App";
import { assignKeybind, Keybind } from "./helpers";

type OpenFileResult = {
  Content: string;
  File: string;
};
// Menu keybinds
const keybinds: Keybind[] = [
  { key: "ctrl+o", func: () => File.open() },
  { key: "ctrl+s", func: () => File.save() },
  { key: "ctrl+shift+s", func: () => File.saveAs() },
];
document.onkeydown = assignKeybind(keybinds);

const File = {
  open: function (): void {
    OpenFile().then((result) => {
      const res = result as OpenFileResult;
      // Check if a file has selected
      if (res.File && res.File !== "") {
        store.addTab(res.File, res.Content);

        console.log("SUCCESS: File opened");
      } else {
        console.log(result);
      }
    });
  },
  save: function (): void {
    // If current tab is untitled save file as new file
    if (store.activeTab.path === "") {
      this.saveAs();
      return;
    }
    // Get unsaved content tab
    const newContentTab = contentStore.tabs.find(
      (tab) => tab.id === store.activeTab.id
    );
    if (newContentTab) {
      // Save current activeTab unsaved content
      SaveFile(store.activeTab.path, newContentTab.content).then((result) => {
        console.log(result);
      });
    }
  },
  saveAs: function (): void {
    // Get unsaved content tab
    const newContentTab = contentStore.tabs.find(
      (tab) => tab.id === store.activeTab.id
    );
    if (newContentTab) {
      SaveFileAs(store.activeTab.title, newContentTab.content).then(
        (result) => {
          console.log(result);
        }
      );
    }
  },
};

export { File };
