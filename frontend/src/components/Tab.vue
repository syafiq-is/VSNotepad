<script setup lang="ts">
import { computed } from 'vue';
import { store } from '../store';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

// Toggle badge visibility on hover when content is not saved
const tab = store.tabs.find(tab => tab.id === props.id)
const contentIsSaved = computed(() => tab?.isSaved);;
function showNotSavedBadge(event: MouseEvent, show: boolean) {
  const container = event.currentTarget as HTMLElement
  const badge = container.lastElementChild as HTMLElement
  if (badge) {
    if (!contentIsSaved && show) {
      badge.classList.add("hidden")
    } else {
      badge.classList.remove("hidden")
    }
  }
}
</script>

<template>
  <div :class="isActive ? 'border-t border-t-myBrand border-b-myDarker bg-myDarker' : 'text-myDarkWhite'"
    class="relative z-10 w-fit h-full p-2 flex items-center border-r border-myGray cursor-pointer hover:bg-myDarker">
    <p class="text-sm select-none">{{ title }}</p>
    <div class="w-[16px] flex justify-center items-center relative">
      <button class="relative" @click.stop="store.closeTab(id)" @mouseenter="showNotSavedBadge($event, true)"
        @mouseleave="showNotSavedBadge($event, false)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e8eaed"
          class="w-[16px] ml-1 hover:bg-myGray rounded-md">
          <path
            d="M256-227.69 227.69-256l224-224-224-224L256-732.31l224 224 224-224L732.31-704l-224 224 224 224L704-227.69l-224-224-224 224Z" />
        </svg>
        <svg v-if="!contentIsSaved" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#e8eaed"
          class="ml-1 w-[16px] h-[16px] absolute top-0 bg-myDarker">
          <circle cx="8" cy="8" r="4" fill="#00EDC7" />
        </svg>
      </button>
    </div>
  </div>
</template>
