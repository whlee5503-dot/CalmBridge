// src/lib/offlineQueue.ts
// IndexedDB 기반 오프라인 메시지 큐

const DB_NAME = 'calmbridge-offline'
const DB_VERSION = 1
const STORE = 'pending-messages'

export interface PendingMessage {
  id?: number
  messages: { role: string; content: string }[]
  language: string
  situation?: string
  timestamp: number
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true })
      }
    }
    req.onsuccess = (e) => resolve((e.target as IDBOpenDBRequest).result)
    req.onerror  = (e) => reject((e.target as IDBOpenDBRequest).error)
  })
}

export async function enqueue(payload: Omit<PendingMessage, 'id' | 'timestamp'>): Promise<number> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    const req = tx.objectStore(STORE).add({ ...payload, timestamp: Date.now() })
    req.onsuccess = (e) => resolve((e.target as IDBRequest).result as number)
    req.onerror  = (e) => reject((e.target as IDBRequest).error)
  })
}

export async function dequeue(id: number): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    const req = tx.objectStore(STORE).delete(id)
    req.onsuccess = () => resolve()
    req.onerror  = (e) => reject((e.target as IDBRequest).error)
  })
}

export async function getAll(): Promise<PendingMessage[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly')
    const req = tx.objectStore(STORE).getAll()
    req.onsuccess = (e) => resolve((e.target as IDBRequest).result)
    req.onerror  = (e) => reject((e.target as IDBRequest).error)
  })
}

export async function registerSync(): Promise<void> {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    const reg = await navigator.serviceWorker.ready
    await (reg as ServiceWorkerRegistration & { sync: { register: (tag: string) => Promise<void> } })
      .sync.register('calmbridge-resend-messages')
  }
}
