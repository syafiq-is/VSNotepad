<script setup lang="ts">
import { ref } from "vue";
import { ReadFile, WriteFile, SaveAsFile } from "../../wailsjs/go/main/App";

const fileName = ref("test.txt");
const fileContent = ref("[ NO CONTENT ]");

function readFile() {
  ReadFile(fileName.value).then((result) => {
    fileContent.value = result;
  });
}

function writeFile() {
  WriteFile(fileName.value, fileContent.value).then((result) => {
    console.log(result);
  });
}

function saveAsFile() {
  SaveAsFile(fileName.value, fileContent.value).then((result) => {
    console.log(result);
  });
}
</script>

<template>
  <div>
    <p>File name to modify:</p>
    <input type="text" v-model="fileName" class="text-black" />
  </div>
  <div>
    <p>File content:</p>
    <textarea v-model="fileContent" class="text-black"></textarea>
  </div>
  <button @click="readFile">Open</button>
  <button @click="writeFile">Save</button>
  <button @click="saveAsFile">Save as</button>
</template>

<style>
textarea {
  width: 300px;
  height: 150px;
}

input {
  width: 300px;
}
</style>
