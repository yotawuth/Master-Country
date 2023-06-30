import {  Body,Controller,Get,HttpCode,HttpStatus,Param,Post,Query,Request,UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from 'src/dto/user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    
  @HttpCode(HttpStatus.OK)
  @Post('register')
  resgister(@Query('username') username: string,@Query('password') password: string,
  @Query('repassword') repassword: string,@Query('country') country: string) {   

    return this.authService.resgister(username,password,repassword,country);
  }


   // @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Query('username') username: string,@Query('password') password: string)  {
   return this.authService.login(username,password);

  }

  @UseGuards(AuthGuard)
  @Get('GetUserByAuthBearer')
  usersall(@Request() req){
    return {Username:req.user.username};
  }



}
