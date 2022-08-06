import { IsString, IsNumber } from 'class-validator';
export class CreateFoodDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly category: string;

  @IsNumber()
  readonly price: number;

  @IsString({ each: true })
  readonly components: string[];
}
