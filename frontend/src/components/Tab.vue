<script setup lang="ts">
import { onUpdated } from 'vue';
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

onUpdated(() => {
  console.log("has updated. ActiveTab: ", store.activeTab)
})
</script>

<template>
  <div :class="isActive ? 'border-t border-t-myBrand border-b-myDarker bg-myDarker' : 'text-myDarkWhite'"
    class="relative z-10 w-fit h-full p-2 flex items-center border-r border-myGray cursor-pointer hover:bg-myDarker">
    <p class="text-sm select-none">{{ title }}</p>
    <button class="w-[16px]" @click.stop="store.closeTab(id)">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e8eaed"
        class="w-[16px] ml-1 hover:bg-myDark">
        <path
          d="M256-227.69 227.69-256l224-224-224-224L256-732.31l224 224 224-224L732.31-704l-224 224 224 224L704-227.69l-224-224-224 224Z" />
      </svg>
    </button>
  </div>
</template>
