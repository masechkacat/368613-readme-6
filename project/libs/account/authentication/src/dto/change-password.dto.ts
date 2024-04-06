import { ApiProperty } from "@nestjs/swagger";

export class ChangePasswordDto {
  @ApiProperty({
    description: 'User unique identifier',
    example: '660de9706292ee02b12f0b3e',
  })
  id: string;

  @ApiProperty({
    description: 'User old password',
    example: 'oldPassword',
  })
  oldPassword: string;

  @ApiProperty({
    description: 'User new password',
    example: 'newPassword',
  })
  newPassword: string;
}
