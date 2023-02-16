import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOfferTemplateDto {
  @IsNotEmpty({ message: "name should not be empty" })
  @IsString({ message: "name should not be string" })
  public name: string;

  @IsNotEmpty({ message: "body should not be empty" })
  @IsString({ message: "body should not be empty" })
  public body: string;

  @IsNotEmpty({ message: "type should not be empty" })
  @IsString({ message: "type should not be empty" })
  public type: string;
}

export class FindTemplateDto {
  @IsNumber({}, { message: "parameter id should be int" })
  @IsNotEmpty({ message: "parameter id is needed" })
  id: number;
}

export class UpdateTemplateDto extends CreateOfferTemplateDto {
  @IsNumber({}, { message: "parameter id should be int" })
  @IsNotEmpty({ message: "parameter id is needed" })
  id: number;
}

export type ResOfferTemplate = {
  body: string;
  type: string;
  name: string;
};
