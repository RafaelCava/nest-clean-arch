import { mockTransformImageToBase64Result } from "../../domain/mocks"
import { TransformImageToBase64 } from "../../../src/data/protocols"

export class TransformImageToBase64Spy implements TransformImageToBase64 {
  url: string
  hasher: string
  async transform (url: string, hasher: string): Promise<TransformImageToBase64.Result> {
    this.url = url
    this.hasher = hasher
    return mockTransformImageToBase64Result()
  }
}