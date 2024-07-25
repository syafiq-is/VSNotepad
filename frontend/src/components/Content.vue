<script setup lang="ts">
import { ref, onMounted } from "vue";
import { store } from "../store";
import Sortable from "sortablejs";
import Tab from "./Tab.vue";
import MyEditor from "./MyEditor.vue";

const tabsElement = ref<HTMLElement | null>(null);

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
  <ul data-closemenuonclick ref="tabsElement" class="flex overflow-x-hidden">
    <li v-for="tab in store.tabs" :key="tab.id">
      <Tab :id="tab.id" :title="tab.title" :isActive="tab.id === store.activeTab" @click="store.setActiveTab(tab.id)" />
    </li>
    <button class="h-full px-2 text-myDarkWhite text-lg " @click="store.addEmptyTab()">+</button>
  </ul>
  <div data-closemenuonclick class="py-2 border-t border-myGray bg-myDarker text-sm overflow-auto">
    <MyEditor v-for="tab in store.tabs" v-show="tab.id === store.activeTab" :key="tab.id" :content="tab.content" />
  </div>
</template>