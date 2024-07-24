<script setup>
import { ref, watchEffect } from "vue";
import MyEditor from "./MyEditor.vue"

const value = ref(`let a = 2;
let b = 3;

function add(a, b) {
  return a + b
}

console.log("a + b = ", add(a,b))
`)

watchEffect(value, () => {
  console.log(value)
})
</script>

<template>
  <div class="p-1 overflow-auto border-t border-myGray bg-myDarker text-sm">
    <MyEditor :content="value" />
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