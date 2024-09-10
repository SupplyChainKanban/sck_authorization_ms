import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SCK_NATS_SERVICE } from 'src/config';

@Injectable()
export class AuthService {

    constructor(
        @Inject(SCK_NATS_SERVICE) private readonly client: ClientProxy,
    ) {

    }


    registerUser() {
        // return this.client.send();
        return 'registerUser'
    }

    loginUser() {
        return 'login user'
    }

    verifyToken() {
        return 'verify token'
    }
}
