import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from './shared/httpError.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { PG_DB, PG_HOST, PG_PASSWORD, PG_PORT, PG_USERNAME } from '../config/config';
console.log(process.env.DATABASE_URL, "UYRLLLLLL")
const dbSettings = process.env.DATABASE_URL ?
    {
        type: 'postgres',
        url: "postgres://ajktojnwpylgyb:7089e6d5bf14b58a1393bc5eb4d18d01b31016287a3b7f1330ae599b47ee718c@ec2-35-153-35-94.compute-1.amazonaws.com:5432/dd7mrnitjr2gbk",
        entities: ["dist/**/*.entity{.ts,.js}"],
        synchronize: true,
    } : {
        type: 'postgres',
        host: PG_HOST,
        port: Number(PG_PORT),
        username: PG_USERNAME,
        password: PG_PASSWORD,
        database: PG_DB,
        entities: ["dist/**/*.entity{.ts,.js}"],
        synchronize: true,
    }

@Module({
    imports: [
        TypeOrmModule.forRoot(dbSettings as any),
        UserModule
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpErrorFilter
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor
        }
    ]
})
export class AppModule {}
