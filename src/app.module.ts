import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import {MulterModule } from '@nestjs/platform-express';
import { MailerModule } from '@nestjs-modules/mailer';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/payeverAssensment'),
    MulterModule.register(),
    MailerModule.forRoot({
      transport: {
        host: 'mail.ersoftdev.net',
        auth: {
          user: 'info@ersoftdev.net',
          pass: '@Info12345678',
        }
      },
      defaults: {
        from: 'info@ersoftdev.net',
      }
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', ''),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
  
