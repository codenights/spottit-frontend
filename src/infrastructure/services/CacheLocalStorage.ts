import { Cache } from './Cache'

export class CacheLocalStorage implements Cache {
  public setItem(key: string, value: string) {
    localStorage.setItem(key, value)
  }

  public getItem(key: string) {
    return localStorage.getItem(key)
  }

  public removeItem(key: string) {
    localStorage.removeItem(key)
  }
}
