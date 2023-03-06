import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';
import { Password, PasswordSchema } from './schema/password.model';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    AuthModule,
    MongooseModule.forFeature([{
      name: Password.name,
      schema: PasswordSchema,
      
    }
  ]),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        host:'0.0.0.0',
        port:1025,
      },
      defaults:{
        from: 'admin@example.com'
      }
    })
  ],
  controllers: [PasswordController],
  providers: [PasswordService]
})
export class PasswordModule {}
