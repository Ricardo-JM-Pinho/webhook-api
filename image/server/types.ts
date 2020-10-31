export enum StorageMode {
    db = "db",
    memory = "memory"
}

export interface Webhook {
    url: string,
    token: string
}