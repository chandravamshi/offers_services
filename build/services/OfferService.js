"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferService = void 0;
const typedi_1 = require("typedi");
const index_1 = require("../index");
const crypto_1 = __importDefault(require("crypto"));
const luxon_1 = require("luxon");
const bcrypt = require("bcrypt");
let OfferService = class OfferService {
    /*
    async getAllTemplates(): Promise<OfferTemplate[]> {
      const allTemplates = await prisma.offerTemplate.findMany();
      return allTemplates;
    }
  
    // create offer template
    async createTemplate(newTemplate: ResOfferTemplate): Promise<any> {
      const newOfferTemplate = await prisma.offerTemplate.create({
        data: {
          type: newTemplate.type,
          name: newTemplate.name,
          versions: {
            create: {
              body: newTemplate.body,
              version: 1,
            },
          },
        },
        include: {
          versions: true,
        },
      });
  
      return newOfferTemplate;
    }*/
    /*
    async getTemplate(id: number): Promise<any> {
      try {
        const template = await prisma.offerTemplate.findUniqueOrThrow({
          where: {
            id: id,
          },
          select: {
            name: true,
            type: true,
            versions: {
              take: 1,
              orderBy: {
                version: "desc",
              },
              select: {
                version: true,
                body: true,
              },
            },
          },
        });
  
        return template;
      } catch (e) {
        throw e;
      }
    }*/
    /*
    async getTemplateData(id: number): Promise<any> {
      try {
        const template = await prisma.offer.findUniqueOrThrow({
          where: {
            bodyVersionId: id,
          },
        });
  
        return template;
      } catch (e) {
        throw e;
      }
    }*/
    //getTemplateAndData
    /*
    async getTemplateAndData(uid: string): Promise<any> {
      try {
        const offerDetails = await prisma.offer.findUniqueOrThrow({
          where: {
            uid: uid,
          },
        });
  
        if (offerDetails.offerId) {
          const template = await this.getTemplate(offerDetails.offerId);
  
          if(offerDetails.expiry){
            const expiryLuxon = DateTime.fromJSDate(offerDetails.expiry);
            const now = DateTime.now();
            offerDetails['isExpired'] =  !(now < expiryLuxon)
          }
          
  
          return { template: template, templateData: offerDetails.data,offerDetails : offerDetails };
        }
      } catch (e) {
        throw e;
      }
    }*/
    /*
    async updateTemplate(queryParams: any, bodyParams: any): Promise<any> {
      try {
        const latestVersionNumber = await prisma.bodyVersion.findMany({
          where: {
            offerId: queryParams.id,
          },
          take: 1,
          orderBy: {
            version: "desc",
          },
          select: {
            version: true,
          },
        });
        const template = await prisma.bodyVersion.create({
          data: {
            body: bodyParams.body,
            version: latestVersionNumber[0].version + 1,
            offerId: queryParams.id,
          },
        });
  
        return template;
      } catch (e) {
        throw e;
      }
    }*/
    /*async generateOffer(bodyParams: any): Promise<Offer> {
      try {
        console.log(bodyParams.bodyVersionId);
        const offer = await prisma.offer.create({
          data: {
            data: bodyParams.data,
            uid: crypto.randomUUID(),
            expiry: new Date(bodyParams.expiry),
            bodyVersionId: bodyParams.bodyVersionId,
            offerId: bodyParams.bodyVersionId,
          },
        });
        return offer;
      } catch (error) {
        throw error;
      }
    }*/
    offerViewed(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const offerViwed = yield index_1.prisma.offer.update({
                    where: {
                        uid: queryParams.uid,
                    },
                    data: {
                        views: {
                            increment: 1,
                        },
                        lastView: new Date(),
                    },
                });
                return offerViwed;
            }
            catch (error) {
                throw error;
            }
        });
    }
    acceptOffer(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const offerDetails = yield index_1.prisma.offer.findUniqueOrThrow({
                    where: {
                        uid: queryParams.uid,
                    },
                });
                // check if offer is already accepted
                if (offerDetails.isAccepted) {
                    throw new Error("Offer Already Accepted");
                }
                // check whether time for accepting the offer is expired or not
                //const expiryLuxon = DateTime.fromJSDate(offerDetails.expiry);
                const now = luxon_1.DateTime.now();
                //if (expiryLuxon < now) {
                //throw new Error("Offer Already Expired");
                //}
                try {
                    const acceptOffer = yield index_1.prisma.offer.update({
                        where: {
                            uid: queryParams.uid,
                        },
                        data: {
                            isAccepted: true,
                            acceptedDate: new Date(),
                            prefferedMonth: queryParams.prefferedMonth,
                        },
                    });
                    return acceptOffer;
                }
                catch (error) {
                    throw error;
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    getTemplate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const templateContent = yield index_1.prisma.templateContent.findFirst({
                    where: {
                        version: 1,
                        templateId: id,
                    },
                });
                if (templateContent) {
                    let htmlContent = [];
                    const templatecontents = JSON.parse(templateContent.content);
                    //console.log(templatecontents);
                    for (var val of templatecontents) {
                        let sectionContent = yield index_1.prisma.sectionContent.findFirst({
                            where: {
                                sectionId: val.contentId,
                                version: 1,
                            },
                        });
                        htmlContent.push({
                            sectionContent: sectionContent,
                            templateContent: val,
                        });
                    }
                    return htmlContent;
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    getSectionContent(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allSectionContent = yield index_1.prisma.sectionContent.findMany({
                    where: {
                        id: { in: ids },
                    },
                });
                return allSectionContent;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getTemplateAndData(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const offerDetails = yield index_1.prisma.offer.findUniqueOrThrow({
                    where: {
                        uid: uid,
                    },
                });
                //console.log(offerDetails)
                const templateAndSectionContents = yield this.getTemplate(offerDetails.templateContentId);
                /*
                if (offerDetails.offerId) {
                  const template = await this.getTemplate(offerDetails.offerId);
          
                  if(offerDetails.expiry){
                    const expiryLuxon = DateTime.fromJSDate(offerDetails.expiry);
                    const now = DateTime.now();
                    offerDetails['isExpired'] =  !(now < expiryLuxon)
                  }*/
                return {
                    template: templateAndSectionContents,
                    templateData: JSON.parse(offerDetails.data),
                    offerDetails: offerDetails,
                };
            }
            catch (e) {
                throw e;
            }
        });
    }
    getTemplates() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const templates = yield index_1.prisma.template.findMany({});
                return templates;
            }
            catch (e) {
                throw e;
            }
        });
    }
    getTemplateAndSections(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const templates = yield this.getTemplate(id);
                // console.log(templates)
                return templates;
            }
            catch (e) {
                throw e;
            }
        });
    }
    generateOffer(bodyParams) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //console.log(bodyParams.bodyVersionId);
                const offer = yield index_1.prisma.offer.create({
                    data: {
                        data: bodyParams.data,
                        uid: crypto_1.default.randomUUID(),
                        expiry: new Date(bodyParams.expiry),
                        templateContentId: bodyParams.templateId,
                    },
                });
                return offer;
            }
            catch (error) {
                throw error;
            }
        });
    }
    createTemplate(bodyParams) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //check if tempalte already exist
                const tempalteExist = yield index_1.prisma.template.findUnique({
                    where: {
                        uniqueTemplate: {
                            name: bodyParams.name,
                            category: bodyParams.category,
                        },
                    },
                });
                if (tempalteExist) {
                    throw new Error("Template with category already exist");
                }
                const template = yield index_1.prisma.template.create({
                    data: {
                        name: bodyParams.name,
                        category: bodyParams.category,
                        TemplateContent: {
                            create: {
                                version: 1,
                                content: JSON.stringify(bodyParams.content),
                            },
                        },
                    },
                });
                /* if (template) {
                  const templateContent = await prisma.templateContent.create({
                    data: {
                      templateId: template.id,
                      version: 1,
                      content: JSON.stringify(bodyParams.content),
                    },
                  }); templateContent: templateContent
                }*/
                return { template: template };
            }
            catch (error) {
                throw error;
            }
        });
    }
};
OfferService = __decorate([
    (0, typedi_1.Service)()
], OfferService);
exports.OfferService = OfferService;
