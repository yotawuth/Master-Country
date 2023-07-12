import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, InputUserDto } from 'src/dto/user.dto';
import { UserDocument, Users } from 'src/model/users.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(
        @InjectModel(Users.name) private UserModel: Model<UserDocument>,

        private jwtService: JwtService

    ) {}
    

    
  async resgister(username:string,password:string,repassword:string,
   country:string): Promise<any> {
    
    if(password !== repassword)
      return {Result:'Password Not match.'};

      const res = await this.UserModel.find({username:username}).exec(); 

      if(res.length === 0){
    let createUserDto = new CreateUserDto;
    createUserDto.username = username;
    createUserDto.password = password;   
    createUserDto.country = country;



    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    createUserDto.password = hash;
    const createdUser = new this.UserModel(createUserDto);
    const result = await createdUser.save();
    

    if(result)
    return {Result:'Register Success.'};
    else
     return  {Result:'Register Fail.'};
      }
      else
      return {Result:'This username already exists.'};
  }

  async login(username:string,password:string): Promise<any>
    {
        const user = await this.UserModel.findOne({username:username}).exec();

        console.log("Login", username);

        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){

            const payload = { sub: user._id, username: user.username };
            return {
              JWT_Token: await this.jwtService.signAsync(payload),
            };

        }
        else    {

            return {Result:"Can't login please check username and password again."};
        }
    }   


}
