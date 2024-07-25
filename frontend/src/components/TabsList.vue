<script setup lang="ts">
import { ref, onMounted } from "vue";
import Sortable from "sortablejs";
import Tab from "./Tab.vue";
import TabContent from "./TabContent.vue";

const tabsElement = ref<HTMLElement | null>(null);

const tabs = ref([
  { id: 0, title: "Test.vue", content: "Hello from Test.vue" },
  { id: 1, title: "Fun.vue", content: "Hello from Fun.vue" },
])
const activeTab = ref(0);

const setActiveTab = (id: number) => {
  activeTab.value = id;
};

onMounted(() => {
  if (tabsElement.value) {
    // Handle draggable tabs
    new Sortable(tabsElement.value, {
      animation: 150,
    });

    // Handle tab horizontal scroll
    tabsElement.value.addEventListener("wheel", function (e) {
      if (tabsElement.value) {
        if (e.deltaY > 0) {
          tabsElement.value.scrollLeft += 100;
        } else {
          tabsElement.value.scrollLeft -= 100;
        }
      }
    });
  }
});
</script>

<template>
  <ul ref="tabsElement" class="flex overflow-x-hidden cursor-pointer">
    <li v-for="tab in tabs" :key="tab.id">
      <Tab :title="tab.title" :isActive="tab.id === activeTab" @mousedown="setActiveTab(tab.id)" />
    </li>
  </ul>
  <div class="border-t overflow-scroll border-myGray bg-myDarker">
    <div v-for="tab in tabs" :key="tab.id">
      <div v-show="tab.id === activeTab">
        <TabContent :content="tab.content" />
      </div>
    </div>
  </div>
</template>