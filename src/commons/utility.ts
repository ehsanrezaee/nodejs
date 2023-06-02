import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entity, EntityDocument } from 'src/schemas/document.schema';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class Utils {
  constructor(
    private mailService: MailerService,

    @InjectModel(Entity.name)
    private entityModel: Model<EntityDocument>,
  ) {}

  validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  async IdGenerator(entityName) {
    var entityInfo = await this.entityModel
      .findOne({ name: entityName })
      .exec();

    if (entityInfo == null) {
      if ((entityName = 'user')) {
        var entityItem = new this.entityModel();
        entityItem.id = 325554;
        entityItem.name = 'user';
      }
      if ((entityName = 'book')) {
        var entityItem = new this.entityModel();
        entityItem.id = 123456;
        entityItem.name = 'book';
      }
      if ((entityName = 'producer')) {
        var entityItem = new this.entityModel();
        entityItem.id = 1;
        entityItem.name = 'producer';
      }
      await entityItem.save();
      return entityItem.id;
    } else {
      entityInfo.id += 1;
      await entityInfo.save();
      return entityInfo.id;
    }
  }

  async SendEmail(to, subject, body) {
    var response = await this.mailService.sendMail({
      to: to,
      from: 'info@ersoftdev.net',
      subject: subject,
      text: body,
    });
  }
}
