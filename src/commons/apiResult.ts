export class ApiResult<T> {
  StatusCode: StatusCode;
  Description: StatusDescription;
  ErrorCode?: ErrorCode;
  ErrorDescription?: ErrorDesciption;
  Data?: T;
}

export enum StatusCode {
  Success = 0,
  Failed = 1,
  Unknown = 2,
}
export enum StatusDescription {
  Success = 'Success',
  Failed = 'Failed',
  Unknown = 'Unknown',
}

export enum ErrorCode {
  EmailIsNotValid = 0,
  UserNotFound=1,
}
export enum ErrorDesciption {
  EmailIsNotValid = 'Email is not valid',
  UserNotFound='User not found'
}
