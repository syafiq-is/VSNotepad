<script setup lang="ts">
import {
  WindowMinimise,
  WindowToggleMaximise,
  Quit,
} from "../../wailsjs/runtime/runtime";
</script>

<template>
  <div style="widows: 1" class="pl-3 border-b border-myGray flex justify-between bg-myDarkest">
    <div class="flex items-center">
      <img src="../assets/images/logo-universal.png" class="h-[16px]" />
      <div class="ml-3">
        <button class="p-2 rounded text-sm hover:bg-myDark">File</button>
        <button class="p-2 rounded text-sm hover:bg-myDark">Edit</button>
        <button class="p-2 rounded text-sm hover:bg-myDark">View</button>
      </div>
    </div>
    <div class="flex items-center">
      <span class="ml-1 text-sm">VSNotepad</span>
    </div>
    <div class="flex">
      <button class="w-[45px] flex items-center justify-center cursor-default hover:bg-myDark" @click="WindowMinimise">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e8eaed" class="w-[18px]">
          <path d="M240-460v-40h480v40H240Z" />
        </svg>
      </button>
      <button class="w-[45px] flex items-center justify-center cursor-default hover:bg-myDark"
        @click="WindowToggleMaximise">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e8eaed" class="w-[15px]">
          <path
            d="M224.62-160q-27.62 0-46.12-18.5Q160-197 160-224.62v-510.76q0-27.62 18.5-46.12Q197-800 224.62-800h510.76q27.62 0 46.12 18.5Q800-763 800-735.38v510.76q0 27.62-18.5 46.12Q763-160 735.38-160H224.62Zm0-40h510.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-510.76q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69H224.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v510.76q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69Z" />
        </svg>
      </button>
      <button class="w-[45px] flex items-center justify-center cursor-default hover:bg-red-500" @click="Quit">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e8eaed" class="w-[18px]">
          <path
            d="M256-227.69 227.69-256l224-224-224-224L256-732.31l224 224 224-224L732.31-704l-224 224 224 224L704-227.69l-224-224-224 224Z" />
        </svg>
      </button>
    </div>
  </div>
</template>
