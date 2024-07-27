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

export { uniqueId, debounce };
