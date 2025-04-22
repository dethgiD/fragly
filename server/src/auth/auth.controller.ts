import { Body, Controller, Get, Patch, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UpdateAuthCodesDto } from './dto/update-auth-codes.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('steam')
  @UseGuards(AuthGuard('steam'))
  async steamLogin() {

  }

  @Get('steam/return')
  @UseGuards(AuthGuard('steam'))
  async steamLoginCallback(@Req() req, @Res() res: Response) {
    const user = req.user;
    const token = user.token;
    console.log("Redirecting to:", `${process.env.FRONTEND_URL}/auth/callback?token=${token}`);

    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('settings')
  async updateAuthCods(@Body() dto: UpdateAuthCodesDto, @Req() req){
    return this.authService.updateSteamCodes(req.user.userId, dto);
  }

}