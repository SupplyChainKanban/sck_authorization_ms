import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { SCK_NATS_SERVICE } from 'src/config';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { LoginUserDto, RegisterUserDto } from './dto';

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
                    password: bcrypt.hashSync(password, 10), // TODO: HASHEAR CONTRASEÑA
                    name: name,
                }
            })

            const { password: __, ...rest } = newUser;

            return {
                user: rest,
                token: 'ABC'
            }


        } catch (error) {
            throw new RpcException({
                status: 400,
                message: error.message
            })
        }
    }

    async loginUser(loginUserDto: LoginUserDto) {
        const { email, password } = loginUserDto

        try {
            const user = await this.user.findUnique({
                where: {
                    email: email,
                }
            })

            if (!user) {
                throw new RpcException({
                    status: 400,
                    message: 'Invalid credentials'
                })
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password);

            if (!isPasswordValid) {
                throw new RpcException({
                    status: 400,
                    message: 'Invalid credentials',
                })
            }

            const { password: __, ...rest } = user;

            return {
                user: rest,
                token: 'ABC'
            }


        } catch (error) {
            throw new RpcException({
                status: 400,
                message: error.message
            })
        }
    }

    verifyToken() {
        return 'verify token'
    }
}
