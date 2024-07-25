import { reactive } from "vue";

export const store = reactive({
  tabs: [
    { id: "0", title: "Test.vue", content: "Hello from Test.vue" },
    { id: "1", title: "Fun.vue", content: "Hello from Fun.vue" },
    { id: "2", title: "Config.vue", content: "Hello from Config.vue" },
  ],
  addTab(title: string, content: string) {
    return this.tabs.push({ id: uniqueId(), title: title, content: content });
  },
});

function uniqueId() {
  return "ID-" + Date.now().toString(36) + Math.random().toString(36);
}
