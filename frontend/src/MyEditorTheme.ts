import { EditorView } from "@codemirror/view";
import { Extension } from "@codemirror/state";

// Using https://github.com/one-dark/vscode-one-dark-theme/ as reference for the colors
// To custom more style copy other (e.g oneDark) Themes and custom it

/* 
There's a few things going on here. Firstly, some of the rules contain “&” placeholders. This indicates the position of the outer editor element in the rule. By default, a generated class name is prefixed to the rules, with a space after it (so ".cm-content" becomes ".gen001 .cm-content"). But in rules that directly target the outer element (which gets the generated class), that doesn't work, and you have to place an & character to indicate where to insert the class selector.

Secondly, because there are two ways of showing the selection in CodeMirror (the native selection and the drawSelection extension), themes will usually want to style both—the caret-color and ::selection rules apply to the native selection, whereas the .cm-cursor and .cm-selectionBackground rules style the library-drawn selection.

Lastly, since this is a dark theme, it passes a dark: true option, so that the editor will enable its dark default styles for things not explicitly styled by the theme.

A real theme will want to style a few more things, including elements created by extensions (such as panels and tooltips). You'll also usually want to include a highlight style in your theme. You can see the One Dark theme for an example, and possibly copy and modify it to create your own theme.
*/

const editorText = "white",
  gutterText = "#7d8799", // Brightened compared to original to increase contrast
  darkBackground = "#21252b",
  highlightBackground = "#2c313a",
  background = "transparent",
  tooltipBackground = "#353a42",
  selection = "#0d7061",
  selectionMatch = "#0a4a40",
  cursor = "#00EDC7";

/// The editor theme styles for One Dark.
export const MyEditorTheme = EditorView.theme(
  {
    // & is the .ͼo style
    "&": {
      color: editorText,
      backgroundColor: background,
      height: "100%",
    },

    "span.cm-selectionMatch": {
      backgroundColor: selectionMatch,
    },

    ".cm-content": {
      caretColor: cursor,
    },

    ".cm-cursor, .cm-dropCursor": { borderLeftColor: cursor },
    "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":
      { backgroundColor: selection },

    ".cm-panels": { backgroundColor: darkBackground, color: editorText },
    ".cm-panels.cm-panels-top": { borderBottom: "2px solid black" },
    ".cm-panels.cm-panels-bottom": { borderTop: "2px solid black" },

    ".cm-searchMatch": {
      backgroundColor: "#72a1ff59",
      outline: "1px solid #457dff",
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: "#6199ff2f",
    },

    ".cm-activeLine": { backgroundColor: "#6699ff0b" },
    ".cm-selectionMatch": { backgroundColor: "#aafe661a" },

    "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
      backgroundColor: "#bad0f847",
    },

    ".cm-gutters": {
      backgroundColor: background,
      color: gutterText,
      border: "none",
    },

    ".cm-gutters .cm-gutterElement": {
      minWidth: "25px",
    },

    ".cm-activeLineGutter": {
      backgroundColor: highlightBackground,
    },

    ".cm-foldPlaceholder": {
      backgroundColor: "transparent",
      border: "none",
      color: "#ddd",
    },

    ".cm-tooltip": {
      border: "none",
      backgroundColor: tooltipBackground,
    },
    ".cm-tooltip .cm-tooltip-arrow:before": {
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
    },
    ".cm-tooltip .cm-tooltip-arrow:after": {
      borderTopColor: tooltipBackground,
      borderBottomColor: tooltipBackground,
    },
    ".cm-tooltip-autocomplete": {
      "& > ul > li[aria-selected]": {
        backgroundColor: highlightBackground,
        color: editorText,
      },
    },
  },
  { dark: true }
);

/// Extension to enable the One Dark theme (both the editor theme and
/// the highlight style).
export const MyEditor: Extension = [MyEditorTheme];
