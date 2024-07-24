<script setup>
import ReadFile from "./components/ReadFile.vue";
import TitleBar from "./components/TitleBar.vue";
import TabsList from "./components/TabsList.vue";
import MyFooter from "./components/Footer.vue";
</script>

<template>
  <div id="app-layout" class="h-full">
    <TitleBar />
    <TabsList />
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