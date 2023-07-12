import { Country } from "src/model/country.model";


export class CreateUserDto {
    username: string;
    password: string;    
    firstname: string;
    lastname: string; 
    country: string;

  }

export class InputUserDto{

    username:string;
    password:string;
}