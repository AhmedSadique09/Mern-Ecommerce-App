import { IsOptional, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MinLength(7, { message: 'Username must be at least 7 characters' })
  @MaxLength(20, { message: 'Username must be at most 20 characters' })
  @Matches(/^[a-z0-9]+$/, {
    message: 'Username must be lowercase and contain only letters and numbers',
  })
  username?: string;

  @IsOptional()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password?: string;
}
