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
  <div class="grid grid-cols-[1fr_40px]">
    <ul id="tablist" data-closemenuonclick ref="tabsElement" class="flex overflow-x-auto">
      <li v-for="tab in store.tabs" :key="tab.id"
        @mousedown="($event) => { if ($event.button === 1) store.closeTab(tab.id) }">
        <Tab :id="tab.id" :title="tab.title" :isActive="store.activeTab.id === tab.id"
          @click="store.setActiveTab(tab.id)" />
      </li>
    </ul>
    <button class="h-full px-2 text-myDarkWhite text-lg border-l border-myGray " @click="store.addEmptyTab()">+</button>
  </div>
  <div data-closemenuonclick class="py-2 border-t border-myGray bg-myDarker text-sm overflow-auto">
    <MyEditor v-for="tab in store.tabs" v-show="store.activeTab.id === tab.id" :key="tab.id" :id="tab.id"
      :content="tab.content" />
  </div>
</template>