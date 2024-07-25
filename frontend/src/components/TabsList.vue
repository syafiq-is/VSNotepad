<script setup lang="ts">
import { ref, onMounted } from "vue";
import { store } from "../store";
import Sortable from "sortablejs";
import Tab from "./Tab.vue";
import MyEditor from "./MyEditor.vue";

const tabsElement = ref<HTMLElement | null>(null);

const activeTab = ref("0");

const setActiveTab = (id: string) => {
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
    <li v-for="tab in store.tabs" :key="tab.id">
      <Tab :title="tab.title" :isActive="tab.id === activeTab" @mousedown="setActiveTab(tab.id)" />
    </li>
  </ul>
  <div class="py-2 border-t border-myGray bg-myDarker text-sm overflow-auto">
    <MyEditor v-for="tab in store.tabs" v-show="tab.id === activeTab" :key="tab.id" :content="tab.content" />
  </div>
</template>