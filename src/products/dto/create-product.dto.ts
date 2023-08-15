import { IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductDto {

@IsString()
@MinLength(1)
@IsOptional()
 title: string;

 @IsNumber()
 @IsPositive()
 @IsOptional()
 price?: number;

 @IsString()
 @IsOptional()
 description?: string;

 @IsString()
 @IsOptional()
 slug?: string;

 @IsInt()
 @IsPositive()
 @IsOptional()
 stock?: number;
 
 @IsString({each: true})
 @IsArray()
 @IsOptional()
 sizes?: string[];

@IsIn(['men', 'women', 'kid', 'unisex'])
@IsOptional()
 gender?: string;

 @IsString({each: true})
 @IsArray()
 @IsOptional()
 tags: string[];

 @IsString({each: true})
 @IsArray()
 @IsOptional()
 images?: string[];


}
