import { RemoveMedia } from "../../../src/data/protocols";

export class RemoveMediaSpy implements RemoveMedia {
  hash?: string;
  async remove(hash: string): Promise<string | void> {
    this.hash = hash;
    return Promise.resolve();
  }
}