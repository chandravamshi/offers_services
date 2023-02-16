import {
  Body,
  Controller,
  Get,
  JsonController,
  Param,
  Post,
  QueryParams,
  Req,
  Res,
  UseAfter,
} from "routing-controllers";
import { Service } from "typedi";
import {
  CreateOfferTemplateDto,
  FindTemplateDto,
  ResOfferTemplate,
  UpdateTemplateDto,
} from "../dto/offer.dto";
import { OfferService } from "../services/OfferService";
import { ValidationErrors } from "../middelwares/ValidationErrors";

@Service()
@JsonController("/offers")
export class OfferController {
  constructor(private offerService: OfferService) {}

  // get all template records
  @Get("/list-templates")
  async getAllTemplates(@Res() response: any): Promise<ResOfferTemplate[]> {
    try {
      const allTemplates = await this.offerService.getAllRecords();
      return response.status(200).send({
        status: "success",
        data: allTemplates,
      });
    } catch (e) {
      throw e;
    }
  }

  // create new template
  @Post("/create-template")
  @UseAfter(ValidationErrors)
  async createOfferTemplate(
    @Body({
      validate: {
        whitelist: true,
        forbidNonWhitelisted: true,
        validationError: { target: false, value: false },
      },
    })
    createTemplateParams: CreateOfferTemplateDto,
    @Res() response: any
  ): Promise<ResOfferTemplate> {
    try {
      const createTemplateResponse = await this.offerService.createTemplate(
        createTemplateParams
      );
      return response.status(200).send({
        status: "success",
        data: createTemplateResponse,
      });
    } catch (e) {
      throw e;
    }
  }

  // find template by id
  @Get("/find-template/:id")
  @UseAfter(ValidationErrors)
  async findTemplate(
    @QueryParams() params: FindTemplateDto,
    @Res() response: any
  ): Promise<ResOfferTemplate> {
    try {
      const template = await this.offerService.getTemplate(params.id);
      return response.status(200).send({
        status: "success",
        data: template.body,
      });
    } catch (error) {
      throw error;
    }
  }

  // update template by id
  @Post("/update-template")
  @UseAfter(ValidationErrors)
  async updateTemplate(
    @Body({
      validate: {
        whitelist: true,
        forbidNonWhitelisted: true,
        validationError: { target: false, value: false },
      },
    })
    params: UpdateTemplateDto,
    @Res() response: any
  ): Promise<ResOfferTemplate> {
    try {
      const template = await this.offerService.updateTemplate(params);
      return response.status(200).send({
        status: "success",
        data: template,
      });
    } catch (error) {
      throw error;
    }
  }
}
