import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, SCK_NATS_SERVICE } from 'src/config';


// const clientModulo = 

@Module({
    imports: [
        ClientsModule.register([
            {
                name: SCK_NATS_SERVICE,
                transport: Transport.NATS,
                options: {
                    servers: envs.sckNatsServers,
                }
            },
        ])
    ],
    exports: [
        ClientsModule.register([
            {
                name: SCK_NATS_SERVICE,
                transport: Transport.NATS,
                options: {
                    servers: envs.sckNatsServers,
                }
            },
        ])
    ],
})
export class TransportsModule { }
