import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { ResumeController } from './app.controller';

@Module({
  imports: [MulterModule.register({
    storage: multer.memoryStorage(),
  }),],
  controllers: [ResumeController],
  providers: [AppService],
})
export class AppModule { }
