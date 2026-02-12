import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateChampionnatDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsUUID()
  @IsNotEmpty()
  sportId: string;
}
