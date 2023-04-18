import { SendEvent } from "../../../src/data/protocols";

export class SendEventSpy implements SendEvent {
  params: any;
  async sendEvent(data: any): Promise<void> {
    this.params = data;
  }
}