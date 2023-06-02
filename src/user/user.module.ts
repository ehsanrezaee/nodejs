import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from 'src/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Utils } from 'src/commons/utility';
import { Entity, EntitySchema } from 'src/schemas/document.schema';
import { mapper } from 'src/commons/mapper';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Entity.name, schema: EntitySchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, User, Entity, Utils, mapper],
})
export class UserModule {}
