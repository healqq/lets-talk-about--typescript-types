declare global {
  interface Window {
    someVariable: number,
  }
}
window.undeclaredVariable;
export default window.someVariable;
