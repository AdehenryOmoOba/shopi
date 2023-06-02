export let timeoutID: NodeJS.Timeout;

export function debouncedCartSync() {
 
  clearTimeout(timeoutID)

  timeoutID = setTimeout(() => {
    console.log("Synching cart with Database...")
  }, 5000);

}