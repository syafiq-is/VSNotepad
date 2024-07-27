import { reactive } from "vue";
import { uniqueId, debounce } from "./helpers";

type Tab = {
  id: string;
  path: string;
  title: string;
  content: string;
};

// This variable store openend file new content for file Save write purpose.
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
    const oldContent = store.tabs.find((tab) => tab.id === id)?.content;
    if (tab) {
      tab.content = newContent;
      // console.log(tab.content);
      if (tab.content === oldContent) {
        console.log("File unchanged");
      } else {
        console.log("File change unsaved");
      }
    }
  },
};

// This variable store the tabs reactive data that needs re-render of the componenents
export const store = reactive({
  activeTab: {
    id: "ID-0",
    path: "/test/Test.vue",
    title: "Test.vue",
    content: "Hello from Test.vue",
  },
  tabs: [
    {
      id: "ID-0",
      path: "/test/Test.vue",
      title: "Test.vue",
      content: "Hello from Test.vue",
    },
    {
      id: "ID-1",
      path: "/test/Fun.vue",
      title: "Fun.vue",
      content: "Hello from Fun.vue",
    },
  ],
  addEmptyTab() {
    const id = uniqueId();
    this.tabs.push({
      id: id,
      path: "",
      title: "Untitled",
      content: "",
    });
    contentStore.addTabContent(id, "");
    if (this.tabs.length === 1) {
      this.setActiveTab(this.tabs[0].id);
    }
  },
  addTab(file: string, content: string) {
    const id = uniqueId();
    const filename = file.split("\\").pop() as string;

    this.tabs.push({ id: id, path: file, title: filename, content: content });
    contentStore.addTabContent(id, content);
    this.setActiveTab(id);
  },
  closeTab(id: string) {
    this.tabs = this.tabs.filter((tab) => tab.id !== id);
    // If closed tab is current active tab, set first tab active
    if (this.activeTab.id === id && this.tabs.length > 0) {
      this.setActiveTab(this.tabs[0].id);
    }
  },
  setActiveTab(id: string) {
    this.activeTab = this.tabs.find((tab) => tab.id === id) as Tab;
  },
});
