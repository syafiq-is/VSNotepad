<script setup lang="ts">
import {
  WindowMinimise,
  WindowToggleMaximise,
  Quit,
} from "../../wailsjs/runtime/runtime";
import { onMounted, onUnmounted, ref } from 'vue';
import { File } from "../MenuActions";
import { WarningMessage } from "../../wailsjs/go/main/App";
import { editorStore, store } from "../store";
import { undo, redo, deleteLine } from "@codemirror/commands";
import { EditorState, StateCommand } from "@codemirror/state";
import { openSearchPanel } from "@codemirror/search";
import { EditorView } from "codemirror";

function sendMessages() {
  WarningMessage("VSNotepad", "Do you want to save the changed ").then(result => {
    console.log(result)
  })
}

const isBurgerOpen = ref(false)
const isMenuOpen = ref(false)
const openedMenu = ref("")

function toggleMenuOpen() {
  isMenuOpen.value = !isMenuOpen.value
}
function closeDropdown() {
  isMenuOpen.value = false
  isBurgerOpen.value = false
}

function execCommand(command: StateCommand) {
  if (editorStore.editorView) {
    command({
      state: editorStore.editorView.state as EditorState,
      dispatch: editorStore.editorView.dispatch,
    });
  }
}

function handleCut() {
  if (editorStore.editorView) {
    const selection = editorStore.editorView.state.selection.main;
    const length = selection.to - selection.from;
    // Delete Line if no text selected
    if (length === 0) {
      deleteLine(editorStore.editorView)
      return
    }

    console.log('Selection length:', length);

    const selectedText = editorStore.editorView.state.sliceDoc(
      editorStore.editorView.state.selection.main.from,
      editorStore.editorView.state.selection.main.to
    );
    navigator.clipboard.writeText(selectedText).then(() => {
      if (editorStore.editorView) {
        editorStore.editorView.dispatch({
          changes: {
            from: editorStore.editorView.state.selection.main.from,
            to: editorStore.editorView.state.selection.main.to,
            insert: ""
          }
        });
      }
    });
  }
}

function handleCopy() {
  if (editorStore.editorView) {
    const selectedText = editorStore.editorView.state.sliceDoc(
      editorStore.editorView.state.selection.main.from,
      editorStore.editorView.state.selection.main.to
    );
    navigator.clipboard.writeText(selectedText);
  }
}

async function handlePaste() {
  if (editorStore.editorView) {
    const text = await navigator.clipboard.readText();
    editorStore.editorView.dispatch({
      changes: { from: editorStore.editorView.state.selection.main.from, insert: text }
    });
  }
}

// Close menu dropdown when clicking outside menu & title bar
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
      <img src="../assets/images/logo-universal.png" class="h-[16px] mr-3" />
      <div style="widows: 2" class="relative flex items-center">
        <button class="p-1 hover:bg-myGray rounded" @mousedown="isBurgerOpen = !isBurgerOpen">
          <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#e8eaed">
            <path d="M160-269.23v-40h640v40H160ZM160-460v-40h640v40H160Zm0-190.77v-40h640v40H160Z" />
          </svg>
        </button>
        <ul v-show="isBurgerOpen"
          class="absolute top-full left-0 min-w-[160px] rounded-md bg-myDark border border-myGray z-50 text-sm shadow-md">
          <!-- File Menu -->
          <li class="p-1 relative">
            <button class="w-full rounded flex justify-between py-[4px] px-3 hover:bg-myBrandDark"
              @mousedown="toggleMenuOpen" @mouseenter="openedMenu = 'File'">
              <span>File</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                class="h-[15px] w-[15px] text-white">
                <path d="M9.6 8.30775L5 3.70775L5.70775 3L11.0155 8.30775L5.70775 13.6155L5 12.9078L9.6 8.30775Z"
                  fill="#E8EAED" />
              </svg>
            </button>
            <ul v-show="isMenuOpen && openedMenu === 'File'"
              class="absolute top-0 left-full min-w-[250px] rounded-md bg-myDark border border-myGray z-50 text-sm shadow-md">
              <li class="p-1">
                <button @click="store.addEmptyTab" @mouseup="closeDropdown"
                  class="w-full rounded flex justify-between py-[4px] px-3 hover:bg-myBrandDark">
                  <span>New Tab</span>
                  <span class="text-myDarkWhite">Ctrl+T</span>
                </button>
              </li>
              <hr class="border-myGray" />
              <li class="p-1">
                <button @click="File.open" @mouseup="closeDropdown"
                  class="w-full rounded flex justify-between py-[4px] px-3 hover:bg-myBrandDark">
                  <span>Open</span>
                  <span class="text-myDarkWhite">Ctrl+P</span>
                </button>
                <button @click="File.save" @mouseup="closeDropdown"
                  class="w-full rounded flex justify-between py-[4px] px-3 hover:bg-myBrandDark">
                  <span>Save</span>
                  <span class="text-myDarkWhite">Ctrl+S</span>
                </button>
                <button @click="File.saveAs" @mouseup="closeDropdown"
                  class="w-full rounded flex justify-between py-[4px] px-3 hover:bg-myBrandDark">
                  <span>Save As</span>
                  <span class="text-myDarkWhite">Ctrl+Shift+S</span>
                </button>
              </li>
              <hr class="border-myGray" />
              <li class="p-1">
                <button @click="store.closeTab(store.activeTab.id)" @mouseup="closeDropdown"
                  class="w-full rounded flex justify-between py-[4px] px-3 hover:bg-myBrandDark">
                  <span>Close Tab</span>
                  <span class="text-myDarkWhite">Ctrl+W</span>
                </button>
                <button @click="Quit()" @mouseup="closeDropdown"
                  class="w-full rounded flex justify-between py-[4px] px-3 hover:bg-myBrandDark">
                  <span>Close Window</span>
                  <span class="text-myDarkWhite">Ctrl+Shift+W</span>
                </button>
              </li>
              <hr class="border-myGray" />
              <li class="p-1">
                <button @click="Quit()" @mouseup="closeDropdown"
                  class="w-full rounded flex justify-between py-[4px] px-3 hover:bg-myBrandDark">
                  <span>Exit</span>
                  <span class="text-myDarkWhite">Alt+F4</span>
                </button>
              </li>
            </ul>
          </li>
          <!-- End File Menu -->
          <!-- Edit Menu -->
          <li class="p-1 relative">
            <button class="w-full rounded flex justify-between py-[4px] px-3 hover:bg-myBrandDark"
              @mousedown="toggleMenuOpen" @mouseenter="openedMenu = 'Edit'">
              <span>Edit</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                class="h-[15px] w-[15px] text-white">
                <path d="M9.6 8.30775L5 3.70775L5.70775 3L11.0155 8.30775L5.70775 13.6155L5 12.9078L9.6 8.30775Z"
                  fill="#E8EAED" />
              </svg>
            </button>

            <ul v-show="isMenuOpen && openedMenu === 'Edit'"
              class="absolute top-0 left-full min-w-[200px] rounded-md bg-myDark border border-myGray z-50 text-sm shadow-md">
              <li class="p-1">
                <button @mouseup="closeDropdown" @click="execCommand(undo)"
                  class="w-full rounded flex justify-between py-[4px] px-3 hover:bg-myBrandDark">
                  <span>Undo</span>
                  <span class="text-myDarkWhite">Ctrl+Z</span>
                </button>
                <button @mouseup="closeDropdown" @click="execCommand(redo)"
                  class="w-full rounded flex justify-between py-[4px] px-3 hover:bg-myBrandDark">
                  <span>Redo</span>
                  <span class="text-myDarkWhite">Ctrl+Shift+Z</span>
                </button>
              </li>
              <hr class="border-myGray" />
              <li class="p-1">
                <button @mouseup="closeDropdown" @click="handleCut()"
                  class="w-full rounded flex justify-between py-[4px] px-3 hover:bg-myBrandDark">
                  <span>Cut</span>
                  <span class="text-myDarkWhite">Ctrl+X</span>
                </button>
                <button @mouseup="closeDropdown" @click="handleCopy()"
                  class="w-full rounded flex justify-between py-[4px] px-3 hover:bg-myBrandDark">
                  <span>Copy</span>
                  <span class="text-myDarkWhite">Ctrl+C</span>
                </button>
                <button @mouseup="closeDropdown" @click="handlePaste()"
                  class="w-full rounded flex justify-between py-[4px] px-3 hover:bg-myBrandDark">
                  <span>Paste</span>
                  <span class="text-myDarkWhite">Ctrl+V</span>
                </button>
              </li>
              <hr class="border-myGray" />
              <li class="p-1">
                <button @mouseup="closeDropdown" @click="openSearchPanel(editorStore.editorView as EditorView)"
                  class="w-full rounded flex justify-between py-[4px] px-3 hover:bg-myBrandDark">
                  <span>Find</span>
                  <span class="text-myDarkWhite">Ctrl+F</span>
                </button>
              </li>
            </ul>
          </li>
          <!-- End Edit Menu -->
        </ul>
      </div>
    </div>

    <div class="flex items-center select-none">
      <span class="ml-1 text-sm">VSNotepad</span>
    </div>

    <div style="widows: 2" class="flex">
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
