// Bun imports text files (CSS here) with the `with { type: 'text' }` import
// attribute, the documented replacement for Vite-style `?raw` imports.
declare module '*.css' {
  const content: string
  export default content
}
