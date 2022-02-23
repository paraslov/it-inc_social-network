let ws: WebSocket | null = null
let subscribers: TSubscriber[] = []

const onWsCloseHandler = () => {
  console.log('CLOSE!!!')
  setTimeout(createWebSocket, 3000)
}

function createWebSocket() {
  ws?.removeEventListener('close', onWsCloseHandler)
  ws?.close()
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  ws.addEventListener('close', onWsCloseHandler)
  ws.addEventListener('message', wsHandler)
}

const wsHandler = (e: MessageEvent<any>) => {
  const messages = JSON.parse(e.data)
  subscribers.forEach(s => s(messages))
}

export const chatApi = {
  start () {
    createWebSocket()
  },
  stop () {
    ws?.close()
    ws?.removeEventListener('close', onWsCloseHandler)
    ws?.removeEventListener('message', wsHandler)
    subscribers = []
  },
  subscribe(callback: (messages: TDialogMessage[]) => void) {
    subscribers.push(callback)
    return () => {
      subscribers = subscribers.filter((s) => s !== callback)
    }
  },
  unsubscribe(callback: (messages: TDialogMessage[]) => void) {
    subscribers = subscribers.filter((s) => s !== callback)
  },
  send(message: string) {
    ws?.send(message)
  },
}

type TSubscriber = (messages: TDialogMessage[]) => void

export type TDialogMessage = {
  message: string
  photo: string
  userId: number
  userName: string
}
