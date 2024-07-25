import { reactive } from "vue";

export const store = reactive({
  activeTab: "ID-0",
  tabs: [
    { id: "ID-0", title: "Test.vue", content: "Hello from Test.vue" },
    { id: "ID-1", title: "Fun.vue", content: "Hello from Fun.vue" },
    { id: "ID-2", title: "Config.vue", content: "Hello from Config.vue" },
  ],
  addEmptyTab() {
    this.tabs.push({ id: uniqueId(), title: "Untitled", content: "" });
    if (this.tabs.length === 1) {
      this.setActiveTab(this.tabs[0].id);
    }
  },
  addTab(title: string, content: string) {
    this.tabs.push({ id: uniqueId(), title: title, content: content });
  },
  closeTab(id: string) {
    this.tabs = this.tabs.filter((tab) => tab.id !== id);
    if (this.activeTab === id && this.tabs.length > 0) {
      this.setActiveTab(this.tabs[0].id);
    }
  },
  setActiveTab(id: string) {
    store.activeTab = id;
  },
});

function uniqueId() {
  return "ID-" + Date.now().toString(36) + Math.random().toString(36);
}
