import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { ResumeController } from './app.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MulterModule.register({
    storage: multer.memoryStorage(),
  }), ConfigModule.forRoot({ isGlobal: true })],
  controllers: [ResumeController],
  providers: [AppService],
})
export class AppModule { }
