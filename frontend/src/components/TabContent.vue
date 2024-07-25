<script setup lang="ts">
import MyEditor from "./MyEditor.vue"

const props = defineProps({
  content: {
    default: "",
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="p-2 text-sm">
    <MyEditor :content="content" />
  </div>
</template>

<style>
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track,
::-webkit-scrollbar-corner {
  background: #1F1F1F;
}

::-webkit-scrollbar-thumb {
  background: #37373D;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>