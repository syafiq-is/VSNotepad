<script setup lang="ts">
import {
  WindowMinimise,
  WindowToggleMaximise,
  Quit,
} from "../../wailsjs/runtime/runtime";
import { onMounted, onUnmounted, ref } from 'vue';
import { File } from "../MenuActions";

const isMenuOpen = ref(false)
const openedMenu = ref("")

function toggleMenuOpen() {
  isMenuOpen.value = !isMenuOpen.value
}
function closeDropdown() {
  isMenuOpen.value = false
}

onMounted(() => {
  const closeMenuElement = document.querySelectorAll('[data-closemenuonclick]')
  closeMenuElement.forEach(ele => {
    ele.addEventListener("click", closeDropdown)
  })
})
onUnmounted(() => {
  const closeMenuElement = document.querySelectorAll('[data-closemenuonclick]')
  closeMenuElement.forEach(ele => {
    ele.removeEventListener("click", closeDropdown)
  })
})
</script>

<template>
  <div style="widows: 1" class="pl-3 border-b border-myGray flex justify-between bg-myDarkest">
    <div class="flex items-center">
      <img src="../assets/images/logo-universal.png" class="h-[16px]" />
      <!-- File Menu -->
      <div class="ml-3">
        <!-- File Menu Button -->
        <button class="p-2 rounded text-sm hover:bg-myDark" @mousedown="toggleMenuOpen"
          @mouseenter="openedMenu = 'File'">File</button>
        <!-- File Menu Dropdown -->
        <ul v-show="isMenuOpen && openedMenu === 'File'"
          class="absolute min-w-[250px] rounded-md bg-myDark border border-myGray z-50 text-sm shadow-md">
          <li class="p-1">
            <button @click="File.open" @mouseup="closeDropdown"
              class="w-full rounded flex justify-between py-[6px] px-3 hover:bg-myBrandDark">
              <span>Open</span>
              <span class="text-myDarkWhite">Ctrl+P</span>
            </button>
            <button @click="File.save" @mouseup="closeDropdown"
              class="w-full rounded flex justify-between py-[6px] px-3 hover:bg-myBrandDark">
              <span>Save</span>
              <span class="text-myDarkWhite">Ctrl+S</span>
            </button>
            <button @click="File.saveAs" @mouseup="closeDropdown"
              class="w-full rounded flex justify-between py-[6px] px-3 hover:bg-myBrandDark">
              <span>Save As</span>
              <span class="text-myDarkWhite">Ctrl+Shift+S</span>
            </button>
          </li>
          <hr class="border-myGray" />
          <li class="p-1">
            <button @click="closeDropdown"
              class="w-full rounded flex justify-between py-[6px] px-3 hover:bg-myBrandDark">
              <span>Close Tab</span>
              <span class="text-myDarkWhite">Ctrl+W</span>
            </button>
            <button @click="closeDropdown"
              class="w-full rounded flex justify-between py-[6px] px-3 hover:bg-myBrandDark">
              <span>Close Window</span>
              <span class="text-myDarkWhite">Ctrl+Shift+W</span>
            </button>
          </li>
          <hr class="border-myGray" />
          <li class="p-1">
            <button @click="closeDropdown"
              class="w-full rounded flex justify-between py-[6px] px-3 hover:bg-myBrandDark">
              <span>Exit</span>
              <span class="text-myDarkWhite">Alt+F4</span>
            </button>
          </li>
        </ul>
      </div>
      <!-- End File Menu -->
      <!-- Edit Menu -->
      <div>
        <!-- Edit Menu Button -->
        <button class="p-2 rounded text-sm hover:bg-myDark" @mousedown="toggleMenuOpen"
          @mouseenter="openedMenu = 'Edit'">Edit</button>
        <!-- Edit Menu Dropdown -->
        <ul v-show="isMenuOpen && openedMenu === 'Edit'"
          class="absolute min-w-[200px] rounded-md bg-myDark border border-myGray z-50 text-sm shadow-md">
          <li class="p-1">
            <button @click="closeDropdown"
              class="w-full rounded flex justify-between py-[6px] px-3 hover:bg-myBrandDark">
              <span>Undo</span>
              <span class="text-myDarkWhite">Ctrl+Z</span>
            </button>
            <button @click="closeDropdown"
              class="w-full rounded flex justify-between py-[6px] px-3 hover:bg-myBrandDark">
              <span>Redo</span>
              <span class="text-myDarkWhite">Ctrl+Shift+Z</span>
            </button>
            <hr class="border-myGray" />
            <button @click="closeDropdown"
              class="w-full rounded flex justify-between py-[6px] px-3 hover:bg-myBrandDark">
              <span>Cut</span>
              <span class="text-myDarkWhite">Ctrl+X</span>
            </button>
            <button @click="closeDropdown"
              class="w-full rounded flex justify-between py-[6px] px-3 hover:bg-myBrandDark">
              <span>Copy</span>
              <span class="text-myDarkWhite">Ctrl+C</span>
            </button>
            <button @click="closeDropdown"
              class="w-full rounded flex justify-between py-[6px] px-3 hover:bg-myBrandDark">
              <span>Paste</span>
              <span class="text-myDarkWhite">Ctrl+V</span>
            </button>
            <button @click="closeDropdown"
              class="w-full rounded flex justify-between py-[6px] px-3 hover:bg-myBrandDark">
              <span>Delete Line</span>
              <span class="text-myDarkWhite">Ctrl+X</span>
            </button>
            <hr class="border-myGray" />
            <button @click="closeDropdown"
              class="w-full rounded flex justify-between py-[6px] px-3 hover:bg-myBrandDark">
              <span>Find</span>
              <span class="text-myDarkWhite">Ctrl+F</span>
            </button>
            <hr class="border-myGray" />
            <button @click="closeDropdown"
              class="w-full rounded flex justify-between py-[6px] px-3 hover:bg-myBrandDark">
              <span>Select All</span>
              <span class="text-myDarkWhite">Ctrl+A</span>
            </button>
          </li>
        </ul>
      </div>
      <!-- End Edit Menu -->
    </div>

    <div class="flex items-center select-none">
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
