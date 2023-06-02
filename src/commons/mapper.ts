import { UserDto } from "src/user/dto/UserDto";


export class mapper{
    mapUserToUserDto = (user) => {
        var userDto= new UserDto();
        userDto.firstname=user.firstname;
        userDto.lastname=user.lastname;
        userDto.avatar=user.avatar;
        userDto.email=user.email;
        userDto.userId=user.userId;
        
        return userDto;
      };
}