// Bun supports Vite-style `?raw` imports natively (file contents as a
// string). Previously these declarations came from the vite/client types.
declare module '*?raw' {
  const content: string
  export default content
}
