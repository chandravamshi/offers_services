import { Service } from "typedi";
import { Offer, Prisma, SectionContent } from "@prisma/client";
import { prisma } from "../index";
import {
  ReqAcceptOffer,
  ReqGenerateOfferDto,
  ReqOfferViewed,
  ResOfferTemplate,
} from "../dto/offer.dto";
import crypto from "crypto";
import { DateTime } from "luxon";
const bcrypt = require("bcrypt");

@Service()
export class OfferService {
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

  async offerViewed(queryParams: ReqOfferViewed): Promise<Offer> {
    try {
      const offerViwed = await prisma.offer.update({
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
    } catch (error) {
      throw error;
    }
  }

  async acceptOffer(queryParams: ReqAcceptOffer): Promise<Offer> {
    try {
      const offerDetails = await prisma.offer.findUniqueOrThrow({
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
      const now = DateTime.now();
      //if (expiryLuxon < now) {
      //throw new Error("Offer Already Expired");
      //}
      try {
        const acceptOffer = await prisma.offer.update({
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
      } catch (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  async getTemplate(id: number): Promise<any> {
    try {
      const templateContent = await prisma.templateContent.findFirst({
        where: {
          version: 1,
          templateId: id,
        },
      });
      if (templateContent) {
        let htmlContent: any[] = [];
        const templatecontents = JSON.parse(templateContent.content);
        //console.log(templatecontents);

        for (var val of templatecontents) {
          let sectionContent = await prisma.sectionContent.findFirst({
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
    } catch (error) {
      throw error;
    }
  }

  async getTemplateAndData(uid: string): Promise<any> {
    try {
      const offerDetails = await prisma.offer.findUniqueOrThrow({
        where: {
          uid: uid,
        },
      });
      //console.log(offerDetails)

      const templateAndSectionContents = await this.getTemplate(
        offerDetails.templateContentId
      );
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
    } catch (e) {
      throw e;
    }
  }
}
