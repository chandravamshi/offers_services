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
  ReqAcceptOffer,
  ReqGenerateOfferDto,
  ReqOfferViewed,
  ResOfferTemplate,
} from "../dto/offer.dto";
import { OfferService } from "../services/OfferService";
import { ValidationErrors } from "../middelwares/ValidationErrors";
import { Offer, OfferTemplate } from "@prisma/client";

@Service()
@JsonController("/offers")
export class OfferController {
  constructor(private offerService: OfferService) {}

  // get all template records
  @Get("/list-templates")
  async getAllTemplates(@Res() response: any): Promise<OfferTemplate[]> {
    try {
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
        data: {
          name: template.name,
          type: template.type,
          body: template.versions[0].body,
        },
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
