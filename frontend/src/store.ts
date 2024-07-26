import { reactive } from "vue";

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
    this.tabs.push({
      id: uniqueId(),
      path: "",
      title: "Untitled",
      content: "",
    });
    if (this.tabs.length === 1) {
      this.setActiveTab(this.tabs[0].id);
    }
  },
  addTab(file: string, content: string) {
    const id = uniqueId();
    const filename = file.split("\\").pop() as string;

    this.tabs.push({ id: id, path: "", title: filename, content: content });
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
    this.activeTab = this.tabs.filter((tab) => tab.id === id)[0];
  },
});

function uniqueId() {
  return "ID-" + Date.now().toString(36) + Math.random().toString(36);
}
