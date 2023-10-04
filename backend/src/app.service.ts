import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!, Hello CISE Team!, Let's build SPEED App! ";
  }
}
