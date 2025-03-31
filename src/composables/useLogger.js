import { ref } from 'vue'

export function useLogger() {
  const mixinMessage = ref('Hello from Logger Composable!')

  const logMessage = (value) => {
    mixinMessage.value = value
  }

  return { mixinMessage, logMessage }
}
