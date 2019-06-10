import { Event } from './Event'

export type AppEventListener = (event: Event) => void

export class EventDispatcher {
  private listeners: AppEventListener[]

  public constructor() {
    this.listeners = []
  }

  public listen(listener: AppEventListener) {
    this.listeners.push(listener)

    return () => this.listeners.filter(x => x !== listener)
  }

  public dispatch(event: Event) {
    this.listeners.forEach(listener => {
      listener(event)
    })
  }
}
