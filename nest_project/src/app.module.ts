import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from '@nestjs/config'
import { PasswordModule } from './password/password.module';
import { SubsModule } from './subs/subs.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './auth/user-roles';

@Module({
  imports: [
    StudentsModule, 
    MongooseModule.forRoot('mongodb://localhost/nest'),  
    AuthModule, 
    ConfigModule.forRoot({envFilePath:'../.development.env'}), 
    PasswordModule, 
    SubsModule,
    AccessControlModule.forRoles(roles)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
