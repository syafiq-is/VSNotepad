<script setup>
import { ref, onMounted } from "vue";
import Sortable from "sortablejs";
import Tab from "./Tab.vue";

const tabsElement = ref(null);

const tabs = ref([
  { id: 0, title: "Test.vue" },
  { id: 1, title: "Fun.vue" },
])
const activeTab = ref(0);

const setActiveTab = (id) => {
  activeTab.value = id;
};

onMounted(() => {
  // Handle draggable tabs
  new Sortable(tabsElement.value, {
    animation: 150,
  });

  // Handle tab horizontal scroll
  tabsElement.value.addEventListener("wheel", function (e) {
    if (e.deltaY > 0) {
      tabsElement.value.scrollLeft += 100;
    } else {
      tabsElement.value.scrollLeft -= 100;
    }
  });
});
</script>

<template>
  <ul ref="tabsElement" class="flex overflow-x-hidden cursor-pointer">
    <li v-for="tab in tabs">
      <Tab :title="tab.title" :isActive="tab.id === activeTab" @mousedown="setActiveTab(tab.id)" />
    </li>
  </ul>
</template>