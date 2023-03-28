"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const offer_dto_1 = require("../dto/offer.dto");
const OfferService_1 = require("../services/OfferService");
const ValidationErrors_1 = require("../middelwares/ValidationErrors");
let OfferController = class OfferController {
    constructor(offerService) {
        this.offerService = offerService;
    }
    // get all template records
    /*
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
    }*/
    // create new template
    /*
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
    }*/
    // find template by id
    /*
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
    }*/
    /*
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
    */
    // update template by id
    /*
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
    */
    /**{
        validate: {
          whitelist: true,
          forbidNonWhitelisted: true,
          validationError: { target: false, value: false },
        },
      } */
    /*
    @Post("/generate-offer")
    @UseAfter(ValidationErrors)
    async generateOffer(
      @Body()
      bodyParams: any,
      @Res() response: any
    ): Promise<Offer> {
      try {
        const offer = await this.offerService.generateOffer(bodyParams);
        return response.status(200).send({
          status: "success",
          data: offer,
        });
      } catch (error) {
        response.status(400)
        throw error;
      }
    }*/
    offerViewed(queryParams, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log(queryParams);
                const offer = yield this.offerService.offerViewed(queryParams);
                return response.status(200).send({
                    status: "success",
                    data: offer,
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    acceptOffer(queryParams, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log(queryParams);
                const offer = yield this.offerService.acceptOffer(queryParams);
                return response.status(200).send({
                    status: "success",
                    data: offer,
                });
            }
            catch (error) {
                response.status(400);
                throw error;
            }
        });
    }
    /*
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
          offerDetails :template.offerDetails
        });
      } catch (error) {
        response.status(404);
        throw error;
      }
    }*/
    getAllTemplates(response, params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allTemplates = yield this.offerService.getTemplate(Number(params.id));
                //console.log("allTemplates");
                //console.log(allTemplates);
                return response.status(200).send({
                    status: "success",
                    data: allTemplates,
                });
            }
            catch (e) {
                throw e;
            }
        });
    }
    findTemplateAndData(params, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const template = yield this.offerService.getTemplateAndData(params.uid);
                return response.status(200).send({
                    status: "success",
                    template: template.template,
                    data: JSON.parse(template.templateData),
                    offerDetails: template.offerDetails,
                });
            }
            catch (error) {
                response.status(404);
                throw error;
            }
        });
    }
    get(params, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const template = yield this.offerService.getTemplateAndData(params.uid);
                return response.status(200).send({
                    status: "success",
                    template: template.template,
                    data: JSON.parse(template.templateData),
                    offerDetails: template.offerDetails,
                });
            }
            catch (error) {
                response.status(404);
                throw error;
            }
        });
    }
    getTemplates(response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const templates = yield this.offerService.getTemplates();
                return response.status(200).send({
                    status: "success",
                    data: templates
                });
            }
            catch (error) {
                response.status(404);
                throw error;
            }
        });
    }
    getTemplateAndSections(params, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const templates = yield this.offerService.getTemplateAndSections(Number(params.id));
                return response.status(200).send({
                    status: "success",
                    data: templates
                });
            }
            catch (error) {
                response.status(404);
                throw error;
            }
        });
    }
    generateOffer(bodyParams, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const offer = yield this.offerService.generateOffer(bodyParams);
                return response.status(200).send({
                    status: "success",
                    data: offer,
                });
            }
            catch (error) {
                response.status(400);
                throw error;
            }
        });
    }
    createTemplate(bodyParams, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const template = yield this.offerService.createTemplate(bodyParams);
                return response.status(200).send({
                    status: "success",
                    data: template,
                });
            }
            catch (error) {
                response.status(400);
                throw error;
            }
        });
    }
};
__decorate([
    (0, routing_controllers_1.Post)("/offer-viewed"),
    (0, routing_controllers_1.UseAfter)(ValidationErrors_1.ValidationErrors),
    __param(0, (0, routing_controllers_1.QueryParams)({
        validate: {
            whitelist: true,
            forbidNonWhitelisted: true,
            validationError: { target: false, value: false },
        },
    })),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [offer_dto_1.ReqOfferViewed, Object]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "offerViewed", null);
__decorate([
    (0, routing_controllers_1.Post)("/accept-offer"),
    (0, routing_controllers_1.UseAfter)(ValidationErrors_1.ValidationErrors),
    __param(0, (0, routing_controllers_1.QueryParams)({
        validate: {
            whitelist: true,
            forbidNonWhitelisted: true,
            validationError: { target: false, value: false },
        },
    })),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [offer_dto_1.ReqAcceptOffer, Object]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "acceptOffer", null);
__decorate([
    (0, routing_controllers_1.Get)("/get-template"),
    (0, routing_controllers_1.UseAfter)(ValidationErrors_1.ValidationErrors),
    __param(0, (0, routing_controllers_1.Res)()),
    __param(1, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "getAllTemplates", null);
__decorate([
    (0, routing_controllers_1.Get)("/get-offer-and-template-data"),
    (0, routing_controllers_1.UseAfter)(ValidationErrors_1.ValidationErrors),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [offer_dto_1.FindTemplateAndDataDto, Object]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "findTemplateAndData", null);
__decorate([
    (0, routing_controllers_1.Get)("/get-required-sections"),
    (0, routing_controllers_1.UseAfter)(ValidationErrors_1.ValidationErrors),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [offer_dto_1.FindTemplateAndDataDto, Object]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "get", null);
__decorate([
    (0, routing_controllers_1.Get)("/get-templates"),
    (0, routing_controllers_1.UseAfter)(ValidationErrors_1.ValidationErrors),
    __param(0, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "getTemplates", null);
__decorate([
    (0, routing_controllers_1.Get)("/get-template-and-sections"),
    (0, routing_controllers_1.UseAfter)(ValidationErrors_1.ValidationErrors),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "getTemplateAndSections", null);
__decorate([
    (0, routing_controllers_1.Post)("/generate-offer"),
    (0, routing_controllers_1.UseAfter)(ValidationErrors_1.ValidationErrors),
    __param(0, (0, routing_controllers_1.Body)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "generateOffer", null);
__decorate([
    (0, routing_controllers_1.Post)("/create-template"),
    (0, routing_controllers_1.UseAfter)(ValidationErrors_1.ValidationErrors),
    __param(0, (0, routing_controllers_1.Body)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "createTemplate", null);
OfferController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/offers"),
    __metadata("design:paramtypes", [OfferService_1.OfferService])
], OfferController);
exports.OfferController = OfferController;
/**
 * {
      validate: {
        whitelist: true,
        forbidNonWhitelisted: true,
        validationError: { target: false, value: false },
      },
    }
 */
