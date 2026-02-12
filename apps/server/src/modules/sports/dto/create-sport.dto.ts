import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateSportDto {
    @IsString()
    @IsNotEmpty()
    nom: string;

    @IsString()
    @IsNotEmpty()
    type: string;
}
