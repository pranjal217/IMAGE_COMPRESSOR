const callPython = (fn) => {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (window.pywebview && window.pywebview.api) {
        clearInterval(interval);
        resolve(fn(window.pywebview.api));
      }
    }, 50);
  });
};

export default callPython;
