<script setup>
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
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #1F1F1F;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #37373D;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>