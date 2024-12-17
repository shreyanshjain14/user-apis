import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class StartIngestionDto {
  @IsString()
  @IsNotEmpty()
  type: string; 

  @IsString()
  @IsNotEmpty()
  source: string; 

  @IsOptional()
  @IsString()
  additionalInfo?: string; 
}


export class GetIngestionStatusDto {
  @IsString()
  @IsNotEmpty()
  id: string; 
}



export class ListIngestionsDto {
  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsNumber()
  offset?: number;
}
