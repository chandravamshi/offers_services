import { Service } from "typedi";
import { Offer, OfferTemplate, Prisma } from "@prisma/client";
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
  }

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
  }

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
  }

  //getTemplateAndData

  async getTemplateAndData(uid: string): Promise<any> {
    try {
      const offerDetails = await prisma.offer.findUniqueOrThrow({
        where: {
          uid: uid,
        },
      });

      if (offerDetails.offerId) {
        const template = await this.getTemplate(offerDetails.offerId);
      
        return { template: template, templateData: offerDetails.data };
      }
    } catch (e) {
      throw e;
    }
  }

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
  }

  async generateOffer(bodyParams: ReqGenerateOfferDto): Promise<Offer> {
    try {
      const offer = await prisma.offer.create({
        data: {
          data: bodyParams.data,
          uid: crypto.randomUUID(),
          expiry: new Date(bodyParams.expiry),
          bodyVersionId: bodyParams.bodyVersionId,
        },
      });
      return offer;
    } catch (error) {
      throw error;
    }
  }

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
      const expiryLuxon = DateTime.fromJSDate(offerDetails.expiry);
      const now = DateTime.now();
      if (expiryLuxon < now) {
        throw new Error("Offer Already Expired");
      }
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
  }
}
