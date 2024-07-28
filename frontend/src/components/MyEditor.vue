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
  redo,
  undo,
} from "@codemirror/commands";
import { vscodeKeymap } from "@replit/codemirror-vscode-keymap";
import { highlightSelectionMatches, searchKeymap } from "@codemirror/search"
import { closeBrackets } from "@codemirror/autocomplete";
import { onMounted, onUnmounted, ref } from "vue";
import { MyEditorTheme } from "../MyEditorTheme";
import { contentStore } from "../store";
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
let editorState: EditorState | null;
let editorView: EditorView | null;

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

const debouncedContentStoreUpdater = debounce(() => {
  if (editorView) {
    contentStore.updateTabContent(props.id, editorView.state.doc.toString())
  }
}, 500)

onMounted(() => {
  editorState = EditorState.create({
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
        if (editorView && v.docChanged) {
          debouncedContentStoreUpdater()
        }
      }),
      MyEditorTheme,
      keymap.of([
        ...vscodeKeymap,
        ...searchKeymap,
        indentWithTab,
        { key: "Mod-z", run: undo, preventDefault: true },
        { key: "Mod-Shift-z", run: redo, preventDefault: true }
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
  editorView = new EditorView({
    state: editorState,
    parent: <HTMLElement>editorElement.value
  })
})

onUnmounted(() => {
  if (editorView) {
    editorView.destroy();
    editorView = null;
  }
})
</script>

<template>
  <div ref="editorElement" class="h-full"></div>
</template>