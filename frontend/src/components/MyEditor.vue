<script setup>
// References: https://codesandbox.io/s/codemirror6-t9ywwc?file=/src/index.js
// Examples in /node_modules/codemirror/dist/index.js 
import { EditorState, EditorSelection, Prec } from "@codemirror/state"
import {
  EditorView,
  keymap,
  lineNumbers,
  drawSelection,
  highlightActiveLine,
  highlightActiveLineGutter,
} from "@codemirror/view";
import {
  defaultKeymap,
  history,
  indentWithTab,
  redo,
  undo,
} from "@codemirror/commands";
import { vscodeKeymap } from "@replit/codemirror-vscode-keymap";
import { highlightSelectionMatches, searchKeymap } from "@codemirror/search"
import { closeBrackets } from "@codemirror/autocomplete";
import { onMounted, onUnmounted, ref } from "vue";
import { MyEditorTheme } from "./MyEditorTheme";

const props = defineProps({
  content: {
    default: "",
    type: String,
    required: true,
  }
})

const editorElement = ref(null)
const doc = ref(props.content)
let editorView = null


// Define the custom function to add a cursor at the mouse position
const addCursorAtMousePosition = (view, event) => {
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
const disableCtrlLeftClick = (event) => {
  if (event.ctrlKey && event.button === 0) {
    // Ctrl + Left Mouse Button
    event.preventDefault();
  }
};

onMounted(() => {
  editorView = new EditorView({
    state: EditorState.create({
      doc: doc.value,
      extensions: [
        EditorState.allowMultipleSelections.of(true),
        EditorView.domEventHandlers({
          mousedown: (event, view) => {
            if (event.altKey && event.button === 0) {
              // Left Mouse Button
              return addCursorAtMousePosition(view, event);
            }
            if (event.ctrlKey && event.button === 0) {
              // Ctrl + Left Mouse Button
              disableCtrlLeftClick(event);
            }
          },
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
        // lineNumbers(),
        highlightSelectionMatches(),
        highlightActiveLineGutter(),
        highlightActiveLine(),
        drawSelection(),
        // Highest priority (used to overwrite stuff)
        // Prec.highest({
        //   extension: [
        //     history()
        //   ]
        // }),
      ],
    }),
    parent: editorElement.value
  })

})
onUnmounted(() => {
  editorView.destroy()
  editorView = null
})
</script>

<template>
  <div ref="editorElement"></div>
</template>