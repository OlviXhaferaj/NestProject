import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from '@nestjs/config'
import { PasswordModule } from './password/password.module';

@Module({
  imports: [StudentsModule, MongooseModule.forRoot('mongodb://localhost/nest'),  AuthModule, ConfigModule.forRoot({envFilePath:'../.development.env'}), PasswordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
