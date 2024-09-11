import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { SCK_NATS_SERVICE } from 'src/config';
import { PrismaClient } from '@prisma/client';
import { RegisterUserDto } from './dto';

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
        this.logger.log('MongoDB connected')
    }



    async registerUser(registerUserDto: RegisterUserDto) {
        const { email, name, password } = registerUserDto

        try {
            const user = await this.user.findUnique({
                where: {
                    email: email,
                }
            })

            if (user) {
                throw new RpcException({
                    status: 400,
                    message: 'User already exists'
                })
            }

            const newUser = await this.user.create({
                data: {
                    email: email,
                    password: password,
                    name: name,
                }
            })

            return {
                user: newUser,
                token: 'ABC'
            }


        } catch (error) {
            throw new RpcException({
                status: 400,
                message: error.message
            })
        }
    }

    loginUser() {
        return 'login user'
    }

    verifyToken() {
        return 'verify token'
    }
}
