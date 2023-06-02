import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  Headers,
  Req,
} from '@nestjs/common';

import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Express } from 'express';
import { AddUserAvatarRequest } from './models/addUserAvatar';
import { GetAvatarRequest } from './models/getUserByAvatar';

@Controller()
export class UserController {
  private _userService;
  constructor(obj: UserService) {
    this._userService = obj;
  }

  @Post('api/users')
  async Add(@Body() userDto) {
    return await this._userService.Add(userDto);
  }

  @Post('api/users/:userId/AddAvatar')
  @UseInterceptors(
    FileInterceptor('fileAvatar', {
      storage: diskStorage({
        destination: 'uploadedFiles/avatars',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
          }
      }),
    }),
  )
  async AddAvatar(
    @Param() param,
    @UploadedFile() fileAvatar: Express.Multer.File,
  ) {
    var request = new AddUserAvatarRequest();
    request.userId = param.userId;
    request.avatarPath = fileAvatar.path;

    return await this._userService.AddUserAvatar(request);
  }

  @Get('api/user/:userId')
  async Get(@Param() param) {
    return await this._userService.GetByUserId(param.userId);
  }

  @Get('api/user/:userId/avatar')
  async GetAvatar(@Param() param, @Headers('host') origin: string) {
    var request = new GetAvatarRequest();
    request.host = origin;
    request.userId = param.userId;

    return await this._userService.GetAvatar(request);
  }
}
