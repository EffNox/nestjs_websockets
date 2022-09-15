import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class MessageDto {

    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(50)
    @IsString()
    message: string;
}
