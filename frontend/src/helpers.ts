function uniqueId() {
  return "ID-" + Date.now().toString(36) + Math.random().toString(36);
}

function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  delay: number
): (...args: Params) => void {
  let timer: number;
  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export type Keybind = {
  key: string;
  func: () => void;
};

function assignKeybind(keybinds: Keybind[]) {
  return function (event: KeyboardEvent) {
    keybinds.forEach((bind) => {
      const keys = bind.key.split("+");
      const key = keys.pop()?.toLowerCase();
      const modifiers = keys.join("+");

      if (bind.key === "") return;
      if (keys.length > 3) throw new Error("Invalid Keybind");

      const keyMatch = event.key.toLowerCase() === key;

      // keybind without modifiers [NOT RECCOMENDED]
      // NOTE: Keybinds without modifier will result in unexpected behavior when editing file, and overlap keybind with modifier
      if (
        modifiers === "" &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        keyMatch
      ) {
        event.preventDefault();
        bind.func();
      } else if (
        modifiers === "ctrl" &&
        event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        keyMatch
      ) {
        event.preventDefault();
        bind.func();
      } else if (
        modifiers === "shift" &&
        event.shiftKey &&
        !event.ctrlKey &&
        !event.altKey &&
        keyMatch
      ) {
        event.preventDefault();
        bind.func();
      } else if (
        modifiers === "alt" &&
        event.altKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        keyMatch
      ) {
        event.preventDefault();
        bind.func();
      } else if (
        modifiers === "ctrl+shift" &&
        event.ctrlKey &&
        event.shiftKey &&
        !event.altKey &&
        keyMatch
      ) {
        event.preventDefault();
        bind.func();
      } else if (
        modifiers === "ctrl+alt" &&
        event.ctrlKey &&
        event.altKey &&
        !event.shiftKey &&
        keyMatch
      ) {
        event.preventDefault();
        bind.func();
      } else if (
        modifiers === "shift+alt" &&
        event.shiftKey &&
        event.altKey &&
        !event.ctrlKey &&
        keyMatch
      ) {
        event.preventDefault();
        bind.func();
      } else if (
        modifiers === "ctrl+shift+alt" &&
        event.ctrlKey &&
        event.shiftKey &&
        event.altKey &&
        keyMatch
      ) {
        event.preventDefault();
        bind.func();
      }
    });
  };
}

export { uniqueId, debounce, assignKeybind };
