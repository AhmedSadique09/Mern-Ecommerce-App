import { HttpException, HttpStatus, Logger } from '@nestjs/common';

const logger = new Logger('CustomError');

export const errorHandler = (
  statusCode: HttpStatus,
  message: string,
  cause?: any,
): HttpException => {
  logger.error(`${statusCode} - ${message}${cause ? ' | Cause: ' + cause : ''}`);

  return new HttpException(
    {
      statusCode,
      message,
      ...(cause && { cause }),
    },
    statusCode,
  );
};
