export const trace = (arg) => {
  const now = (window.performance.now() / 1000).toFixed(3);
  global.console.log(`${now}: ${arg}`);
};

export default trace;
