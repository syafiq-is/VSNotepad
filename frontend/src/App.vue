<script setup>
import ReadFile from "./components/ReadFile.vue";
import TitleBar from "./components/TitleBar.vue";
import TabsBar from "./components/TabsBar.vue";
import TabContent from "./components/TabContent.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div id="app-layout" class="h-full">
    <TitleBar />
    <TabsBar />
    <TabContent />
    <Footer />
  </div>
  <!-- <ReadFile /> -->
</template>

<style>
#app-layout {
  display: grid;
  grid-template-rows: 40px 30px 1fr 30px;
}
</style>