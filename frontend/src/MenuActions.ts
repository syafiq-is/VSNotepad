import { contentStore, store } from "./store";
import { OpenFile, SaveFile, SaveFileAs } from "../wailsjs/go/main/App";
import { assignKeybind, Keybind } from "./helpers";
import { Quit } from "../wailsjs/runtime/runtime";

type File = {
  Content: string;
  File: string;
};
type BackendResult<T> = {
  IsError: boolean;
  Result: T;
};

// Menu keybinds
const keybinds: Keybind[] = [
  { key: "ctrl+t", func: () => File.newTab() },
  { key: "ctrl+o", func: () => File.open() },
  { key: "ctrl+s", func: () => File.save() },
  { key: "ctrl+shift+s", func: () => File.saveAs() },
  { key: "ctrl+w", func: () => File.closeTab() },
  { key: "ctrl+shift+w", func: () => File.closeWindow() },
  { key: "alt+F4", func: () => File.Exit() },
];
document.onkeydown = assignKeybind(keybinds);

const File = {
  newTab: function (): void {
    store.addEmptyTab();
  },
  open: function (): void {
    OpenFile().then((result) => {
      const res = result as BackendResult<File>;
      if (res.IsError) return console.error(res.Result);

      // Check if a file has selected
      if (res.Result.File && res.Result.File !== "") {
        store.addTab(res.Result.File, res.Result.Content);

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
        const res = result as BackendResult<string>;
        if (res.IsError) return console.error(res.Result);

        store.activeTab.isSaved = true;

        const contentTab = contentStore.getTab(store.activeTab.id);
        if (contentTab) {
          store.activeTab.content = contentTab.content;
        }
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
          const res = result as BackendResult<string>;
          if (res.IsError) return console.error(res.Result);

          store.activeTab.isSaved = true;
          store.activeTab.path = res.Result;
          const filename = res.Result.split("\\").pop();
          if (filename) {
            store.activeTab.title = filename;
          }
          const contentTab = contentStore.getTab(store.activeTab.id);
          if (contentTab) {
            store.activeTab.content = contentTab.content;
          }
        }
      );
    }
  },
  closeTab: function (): void {
    store.closeTab(store.activeTab.id);
  },
  closeWindow: function (): void {
    Quit();
  },
  Exit: function (): void {
    Quit();
  },
};

export { File };
