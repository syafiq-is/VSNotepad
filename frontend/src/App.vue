<script setup lang="ts">
// import ReadFile from "./components/ReadFile.vue";
import TitleBar from "./components/TitleBar.vue";
import Content from "./components/Content.vue";
import MyFooter from "./components/Footer.vue";
</script>

<template>
  <div id="app-layout" class="h-full">
    <TitleBar />
    <Content />
    <MyFooter />
  </div>
  <!-- <ReadFile /> -->
</template>

<style>
#app-layout {
  display: grid;
  grid-template-rows: 40px 30px 1fr 30px;
}
</style>