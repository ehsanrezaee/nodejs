import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserDto } from './dto/UserDto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserSchema } from '../schemas/user.schema';
import { promises } from 'dns';
import {
  ApiResult,
  ErrorCode,
  ErrorDesciption,
  StatusCode,
  StatusDescription,
} from 'src/commons/apiResult';
import { Utils } from 'src/commons/utility';
import { Entity, EntityDocument } from 'src/schemas/document.schema';
import { exec } from 'child_process';
import { mapper } from 'src/commons/mapper';
import { AddUserAvatarRequest } from './models/addUserAvatar';
import { request } from 'http';
import { GetAvatarRequest } from './models/getUserByAvatar';

@Injectable()
export class UserService {
  private _utilis;
  private _mapper;
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Entity.name)
    private entityModel: Model<EntityDocument>,
    utils: Utils,
    mapper: mapper,
  ) {
    this._utilis = utils;
    this._mapper = mapper;
  }

  async Add(userDto: UserDto) {
    var response = new ApiResult();

    if (!this._utilis.validateEmail(userDto.email)) {
      response.StatusCode = StatusCode.Failed;
      response.Description = StatusDescription.Failed;
      response.ErrorCode = ErrorCode.EmailIsNotValid;
      response.ErrorDescription = ErrorDesciption.EmailIsNotValid;
      return response;
    }

    var userItem = new this.userModel(userDto);
    userItem.userId = await this._utilis.IdGenerator('user');
    var addedUser = await userItem.save();
    response.StatusCode = StatusCode.Success;
    response.Description = StatusDescription.Success;
    response.Data = this._mapper.mapUserToUserDto(addedUser);

    this._utilis.SendEmail(
      userDto.email,
      'SignUp',
      'Congratulations ' +
        userDto.firstname +
        ' ' +
        userDto.lastname +
        ', you have registered on our site.',
    );
    return response;
  }

  async AddUserAvatar(request: AddUserAvatarRequest) {
    var response = new ApiResult();
    var user = await this.userModel.findOne({ userId: request.userId });
    if (user == null) {
      response.StatusCode = StatusCode.Failed;
      response.Description = StatusDescription.Failed;
      response.ErrorCode = ErrorCode.UserNotFound;
      response.ErrorDescription = ErrorDesciption.UserNotFound;
      return response;
    }

    user.avatar = request.avatarPath;
    await user.save();

    response.StatusCode = StatusCode.Success;
    response.Description = StatusDescription.Success;
    return response;
  }

  async GetByUserId(userId) {
    var user = await this.userModel.findOne({ userId: userId });

    var response = new ApiResult();
    response.StatusCode = StatusCode.Success;
    response.Description = StatusDescription.Success;
    response.Data = this._mapper.mapUserToUserDto(user);
    return response;
  }

  async GetAvatar(getAvatarRequest: GetAvatarRequest) {
    var user = await this.userModel.findOne({
      userId: getAvatarRequest.userId,
    });

    var response = new ApiResult();
    response.StatusCode = StatusCode.Success;
    response.Description = StatusDescription.Success;
    response.Data = getAvatarRequest.host + '\\' + user.avatar;

    return response;
  }
}
