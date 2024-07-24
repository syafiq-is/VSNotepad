<script setup>
/* 
  References: 
  > https://codesandbox.io/s/codemirror6-t9ywwc?file=/src/index.js
  > https://codemirror.net/docs/migration/#getting-the-document-and-selection
*/
// Examples in /node_modules/codemirror/dist/index.js 
import { EditorState, EditorSelection, Prec } from "@codemirror/state"
import {
  EditorView,
  ViewUpdate,
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
import { onMounted, onUnmounted, ref, watch } from "vue";
import { MyEditorTheme } from "./MyEditorTheme";

const props = defineProps({
  content: {
    default: "",
    type: String,
    required: true,
  }
})

const editorElement = ref(null)
const editorView = ref(null)
const doc = ref(props.content)

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
  // Ctrl + Left Mouse Button
  if (event.ctrlKey && event.button === 0) {
    event.preventDefault();
  }
};

onMounted(() => {
  editorView.value = new EditorView({
    state: EditorState.create({
      doc: doc.value,
      extensions: [
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
          if (v.docChanged) {
            doc.value = editorView.value.state.doc.toString()
            console.log(editorView.value.state.doc.toString())
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
  if (editorView.value) {
    editorView.value.destroy()
    editorView.value = null
  }
})
</script>

<template>
  <div ref="editorElement"></div>
  <div>===================</div>
  <pre>{{ doc }}</pre>
</template>