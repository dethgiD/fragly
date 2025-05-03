import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMe(@Req() req) {
    return await this.userService.getUserProfile(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update')
  async updateProfile(
    @Body() { displayName, email }: UpdateUserDto,
    @Req() req
  ) {
    return this.userService.updateUserProfile(req.user.userId, displayName, email);
  }
}
