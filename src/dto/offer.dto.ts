import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

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
export class FindTemplateAndDataDto {
  @IsString({message: "parameter id should be int"})
  @IsNotEmpty({ message: "parameter id is needed" })
  uid: string;
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

export type GetAllOfferTemplate = {
  //id: number;
  type: string;
  name: string;
};

export class ReqGenerateOfferDto {
  @IsNotEmpty({ message: "parameter data should not be empty" })
  @IsString({ message: "parameter data should be string" })
  data: string;

  @IsNotEmpty({ message: "parameter expiry should not be empty" })
  @IsDateString()
  expiry: Date;

  @IsNumber({}, { message: "parameter bodyVersionId should be int" })
  @IsNotEmpty({ message: "parameter bodyVersionId is needed" })
  bodyVersionId: number;
}

export class ReqOfferViewed {
  @IsNotEmpty({ message: "parameter uid is needed" })
  uid: string;
}


export class ReqAcceptOffer extends ReqOfferViewed{
  @IsNotEmpty({ message: "parameter preffered month is needed" })
  prefferedMonth: string;
}
