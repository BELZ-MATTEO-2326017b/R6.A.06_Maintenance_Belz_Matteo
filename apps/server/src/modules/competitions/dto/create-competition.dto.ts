import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCompetitionDto {
    @IsString()
    @IsNotEmpty()
    nom: string;

    @IsUUID()
    @IsNotEmpty()
    championnatId: string;
}
