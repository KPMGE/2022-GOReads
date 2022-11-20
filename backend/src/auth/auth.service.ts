import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

  signin() {
    return 'hello signin'
  }

  signup() {
    return 'hello signup'
  }
}
