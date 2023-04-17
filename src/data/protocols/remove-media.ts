export interface RemoveMedia {
  remove: (hash: string) => Promise<void | string>;
}
