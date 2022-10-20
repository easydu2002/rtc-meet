
export const log = function (...args: any[]): void {
  console.log(`[${new Date().toLocaleString()}] `, ...args)
}
