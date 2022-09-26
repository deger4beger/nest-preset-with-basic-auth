import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from './shared/httpError.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';

const dbSettings = process.env.DATABASE_URL

@Module({
    imports: [
        TypeOrmModule.forRoot({
            url: dbSettings,
            ssl: true,
        }),
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
