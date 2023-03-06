import { Module } from '@nestjs/common';
import { SubsService } from './subs.service';
import { SubsController } from './subs.controller';
import {MongooseModule} from '@nestjs/mongoose';
import { SubsSchema } from './schema/subs.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{
      name: 'Subs',
      schema: SubsSchema
    }])
  ],
  controllers: [SubsController],
  providers: [SubsService]
})
export class SubsModule {}
