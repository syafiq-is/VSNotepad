<script setup lang="ts">
/* 
  References: 
  > https://codesandbox.io/s/codemirror6-t9ywwc?file=/src/index.js
  > https://codemirror.net/docs/migration/#getting-the-document-and-selection
*/
// Examples in /node_modules/codemirror/dist/index.js 
import {
  EditorState,
  EditorSelection,
  // Prec
} from "@codemirror/state"
import {
  EditorView,
  // ViewUpdate,
  lineNumbers,
  keymap,
  drawSelection,
  // highlightActiveLine,
  // highlightActiveLineGutter,
} from "@codemirror/view";
import {
  // defaultKeymap,
  history,
  indentWithTab,
} from "@codemirror/commands";
import { vscodeKeymap } from "@replit/codemirror-vscode-keymap";
import { highlightSelectionMatches, selectNextOccurrence } from "@codemirror/search"
import { closeBrackets } from "@codemirror/autocomplete";
import { onMounted, onUnmounted, ref } from "vue";
import { MyEditorTheme } from "../MyEditorTheme";
import { contentStore, editorStore } from "../store";
import { debounce } from "../helpers";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  }
})

const editorElement = ref<HTMLElement | null>(null)

// Define the custom function to add a cursor at the mouse position
function addCursorAtMousePosition(view: EditorView, event: MouseEvent) {
  const { clientX, clientY } = event;
  const pos = view.posAtCoords({ x: clientX, y: clientY });

  if (pos !== null) {
    let selection = view.state.selection.addRange(
      EditorSelection.cursor(pos)
    );
    view.dispatch({
      selection,
      userEvent: "select.pointer",
    });
  }

  event.preventDefault();
  return true;
};

// Disable the default Ctrl + Left Click behavior
function disableCtrlLeftClick(event: MouseEvent) {
  // Ctrl + Left Mouse Button
  if (event.ctrlKey && event.button === 0) {
    event.preventDefault();
  }
};

const debouncedFunc = debounce(() => {
  if (editorStore.editorView) {
    // console.log("Debounced changed detected")
  }
}, 200)

onMounted(() => {
  editorStore.editorState = EditorState.create({
    doc: props.content,
    extensions: [
      EditorView.lineWrapping,
      EditorState.allowMultipleSelections.of(true),
      // Remap keybind Ctrl + Left Mouse Button to Alt + Left Mouse Button
      EditorView.domEventHandlers({
        mousedown: (event, view) => {
          // Left Mouse Button
          if (event.altKey && event.button === 0) {
            return addCursorAtMousePosition(view, event);
          }
          // Ctrl + Left Mouse Button
          if (event.ctrlKey && event.button === 0) {
            disableCtrlLeftClick(event);
          }
        },
      }),
      // update doc state when EditorView changed
      EditorView.updateListener.of((v) => {
        if (editorStore.editorView && v.docChanged) {
          // console.log("Changed detected")
          contentStore.updateTabContent(props.id, editorStore.editorView.state.doc.toString())

          debouncedFunc()
        }
      }),
      MyEditorTheme,
      keymap.of([
        ...vscodeKeymap,
        indentWithTab,
        { key: "Mod-d", run: selectNextOccurrence, preventDefault: true }
      ]),
      closeBrackets(),
      history(),
      lineNumbers(),
      highlightSelectionMatches(),
      // highlightActiveLineGutter(),
      // highlightActiveLine(),
      drawSelection(),
      // Highest priority (used to overwrite stuff)
      // Prec.highest({
      //   extension: [
      //     history()
      //   ]
      // }),
    ],
  })
  editorStore.editorView = new EditorView({
    state: editorStore.editorState as EditorState,
    parent: editorElement.value as HTMLElement
  })
})

onUnmounted(() => {
  if (editorStore.editorView) {
    editorStore.editorView.destroy();
    editorStore.editorView = null;
  }
})
</script>

<template>
  <div ref="editorElement" class="h-full"></div>
</template>