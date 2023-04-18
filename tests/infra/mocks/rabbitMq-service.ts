import { ClientProxy, ReadPacket, WritePacket } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export class RabbitMqServiceMock extends ClientProxy {
  connect(): Promise<any> {
    return Promise.resolve('Method not implemented.');
  }
  close() {
    return 'Method not implemented.';
  }
  protected publish(
    packet: ReadPacket<any>,
    callback: (packet: WritePacket<any>) => void,
  ): () => void {
    return;
  }
  protected dispatchEvent<T = any>(packet: ReadPacket<any>): Promise<T> {
    return Promise.resolve('Method not implemented.' as T);
  }
  data?: any;
  send<TResult = any, TInput = any>(
    pattern: any,
    data: TInput,
  ): Observable<TResult> {
    this.data = data;
    return new Observable();
  }
}
