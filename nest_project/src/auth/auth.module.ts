import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserSchema } from './user.schema';
import {ConfigModule} from '@nestjs/config';




@Module({
  imports:[
    ConfigModule.forRoot({envFilePath:'./../.development.env'}),
    PassportModule.register( { defaultStrategy: 'jwt'} ),
    JwtModule.register({ secret: process.env.JWT_SECRET, signOptions:{expiresIn: '9000000s'}}),
    
    MongooseModule.forFeature([{name:"User", schema: UserSchema}])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy ],
  exports: [PassportModule, JwtStrategy, AuthService],
})
export class AuthModule {}
