import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SCK_NATS_SERVICE } from 'src/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {

    private readonly logger = new Logger('AuthService')

    constructor(
        @Inject(SCK_NATS_SERVICE) private readonly client: ClientProxy,
    ) {
        super();
    }

    onModuleInit() {
        this.$connect();
        this.logger.log('MongoDB')
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
