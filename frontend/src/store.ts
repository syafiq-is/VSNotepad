import { reactive } from "vue";
import { uniqueId, debounce } from "./helpers";

type Tab = {
  id: string;
  path: string;
  title: string;
  content: string;
  isSaved: boolean;
};

// This variable store openend file new content for file Save write purpose.
// contentStore separated from store to prevent over rendering when editor content changes
export const contentStore = {
  tabs: [
    {
      id: "ID-0",
      content: "Hello from Test.vue",
    },
    {
      id: "ID-1",
      content: "Hello from Fun.vue",
    },
  ],
  addTabContent(id: string, content: string) {
    this.tabs.push({
      id: id,
      content: content,
    });
  },
  updateTabContent(id: string, newContent: string) {
    const tab = this.tabs.find((tab) => tab.id === id);
    if (tab) {
      tab.content = newContent;
    }
    this.contentIsSaved(id);
  },
  closeTabContent(id: string) {
    this.tabs = this.tabs.filter((tab) => tab.id !== id);
  },
  // Checks if tab content is have not changed/saved
  contentIsSaved(id: string) {
    const tab = this.tabs.find((tab) => tab.id === id);
    const oldTab = store.tabs.find((tab) => tab.id === id);
    if (tab && oldTab) {
      if (tab.content === oldTab.content) {
        oldTab.isSaved = true;
        // console.log("Contents are saved");
        return true;
      } else {
        oldTab.isSaved = false;
        // console.log("Contents are not saved");
        return false;
      }
    }
  },
};

// This variable store the tabs reactive data that needs re-render of the componenents
export const store = reactive({
  activeTab: {
    id: "",
    path: "",
    title: "",
    content: "",
    isSaved: true,
  },
  tabs: [
    {
      id: "ID-0",
      path: "",
      title: "Test.txt",
      content: "Hello from Test.txt",
      isSaved: true,
    },
    {
      id: "ID-1",
      path: "/test/Fun.txt",
      title: "Fun.txt",
      content: "Hello from Fun.txt",
      isSaved: true,
    },
  ],
  addEmptyTab() {
    const id = uniqueId();
    this.tabs.push({
      id: id,
      path: "",
      title: "Untitled",
      content: "",
      isSaved: true,
    });
    contentStore.addTabContent(id, "");
    if (this.tabs.length === 1) {
      this.setActiveTab(this.tabs[0].id);
    }
    this.setActiveTab(id);
  },
  addTab(file: string, content: string) {
    const id = uniqueId();
    const filename = file.split("\\").pop() as string;

    this.tabs.push({
      id: id,
      path: file,
      title: filename,
      content: content,
      isSaved: true,
    });
    contentStore.addTabContent(id, content);
    this.setActiveTab(id);
  },
  closeTab(id: string) {
    this.tabs = this.tabs.filter((tab) => tab.id !== id);
    // If closed tab is current active tab, set first tab active
    if (this.activeTab.id === id && this.tabs.length > 0) {
      this.setActiveTab(this.tabs[0].id);
    }
    contentStore.closeTabContent(id);
  },
  setActiveTab(id: string) {
    this.activeTab = this.tabs.find((tab) => tab.id === id) as Tab;
  },
});

store.setActiveTab(store.tabs[0].id);
