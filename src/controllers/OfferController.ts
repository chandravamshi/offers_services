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
  UseBefore,
} from "routing-controllers";
import { Service } from "typedi";
import {
  CreateOfferTemplateDto,
  FindTemplateAndDataDto,
  FindTemplateDto,
  ReqAcceptOffer,
  ReqGenerateOfferDto,
  ReqOfferViewed,
  ResOfferTemplate,
} from "../dto/offer.dto";
import { OfferService } from "../services/OfferService";
import { ValidationErrors } from "../middelwares/ValidationErrors";
import { Offer, OfferTemplate } from "@prisma/client";
import { AuthMiddleware } from "../middelwares/AuthMiddelware";

@Service()
@JsonController("/offers")
export class OfferController {
  constructor(private offerService: OfferService) {}

  // get all template records
  @Get("/list-templates")
  @UseBefore(AuthMiddleware)
  async getAllTemplates(@Res() response: any): Promise<OfferTemplate[]> {
    try {
      console.log("/list-templates");
      const allTemplates = await this.offerService.getAllTemplates();
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
  @Get("/find-template")
  @UseAfter(ValidationErrors)
  async findTemplate(
    @QueryParams() params: FindTemplateDto,
    @Res() response: any
  ): Promise<ResOfferTemplate> {
    try {
      const template = await this.offerService.getTemplate(params.id);
      return response.status(200).send({
        status: "success",
        data: {
          name: template.name,
          type: template.type,
          body: template.versions[0].body,
          version: template.version[0].version,
        },
      });
    } catch (error) {
      response.status(404);
      throw error;
    }
  }

  @Get("/get-template-data")
  @UseAfter(ValidationErrors)
  async getTemplateData(
    @QueryParams() params: FindTemplateDto,
    @Res() response: any
  ): Promise<ResOfferTemplate> {
    try {
      const template = await this.offerService.getTemplateData(params.id);
      return response.status(200).send({
        status: "success",
        data: JSON.parse(template.data),
      });
    } catch (error) {
      throw error;
    }
  }

  // update template by id
  @Post("/update-template/:id")
  @UseAfter(ValidationErrors)
  async updateTemplate(
    @QueryParams() queryParams: any,
    @Body()
    bodyParams: any,
    @Res() response: any
  ): Promise<ResOfferTemplate> {
    try {
      const template = await this.offerService.updateTemplate(
        queryParams,
        bodyParams
      );
      return response.status(200).send({
        status: "success",
        data: template,
      });
    } catch (error) {
      throw error;
    }
  }

  @Post("/generate-offer")
  @UseAfter(ValidationErrors)
  async generateOffer(
    @Body({
      validate: {
        whitelist: true,
        forbidNonWhitelisted: true,
        validationError: { target: false, value: false },
      },
    })
    bodyParams: ReqGenerateOfferDto,
    @Res() response: any
  ): Promise<Offer> {
    try {
      const offer = await this.offerService.generateOffer(bodyParams);
      return response.status(200).send({
        status: "success",
        data: offer,
      });
    } catch (error) {
      throw error;
    }
  }

  @Post("/offer-viewed")
  @UseAfter(ValidationErrors)
  async offerViewed(
    @QueryParams({
      validate: {
        whitelist: true,
        forbidNonWhitelisted: true,
        validationError: { target: false, value: false },
      },
    })
    queryParams: ReqOfferViewed,
    @Res() response: any
  ): Promise<Offer> {
    try {
      console.log(queryParams);
      const offer = await this.offerService.offerViewed(queryParams);
      return response.status(200).send({
        status: "success",
        data: offer,
      });
    } catch (error) {
      throw error;
    }
  }

  @Post("/accept-offer")
  @UseAfter(ValidationErrors)
  async acceptOffer(
    @QueryParams({
      validate: {
        whitelist: true,
        forbidNonWhitelisted: true,
        validationError: { target: false, value: false },
      },
    })
    queryParams: ReqAcceptOffer,
    @Res() response: any
  ): Promise<Offer> {
    try {
      console.log(queryParams);
      const offer = await this.offerService.acceptOffer(queryParams);
      return response.status(200).send({
        status: "success",
        data: offer,
      });
    } catch (error) {
      throw error;
    }
  }

  @Get("/find-template-and-data-by-uid")
  @UseAfter(ValidationErrors)
  async findTemplateAndData(
    @QueryParams() params: FindTemplateAndDataDto,
    @Res() response: any
  ): Promise<ResOfferTemplate> {
    try {
      const template = await this.offerService.getTemplateAndData(params.uid);
      return response.status(200).send({
        status: "success",
        template: template.template.versions[0].body,
        data: JSON.parse(template.templateData),
      });
    } catch (error) {
      response.status(404);
      throw error;
    }
  }
}

/**
 * {
      validate: {
        whitelist: true,
        forbidNonWhitelisted: true,
        validationError: { target: false, value: false },
      },
    }
 */
