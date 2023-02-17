import { Service } from "typedi";
import { Offer, OfferTemplate, Prisma } from "@prisma/client";
import { prisma } from "../index";
import {
  ReqGenerateOfferDto,
  ReqOfferViewed,
  ResOfferTemplate,
} from "../dto/offer.dto";
import crypto from "crypto";

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

  async offerAccepted(queryParams: ReqOfferViewed): Promise<Offer> {
    try {
      const offerAccepted = await prisma.offer.update({
        where: {
          uid: queryParams.uid,
        },
        data: {
          isAccepted: true,
          acceptedDate: new Date(),
        },
      });
      return offerAccepted;
    } catch (error) {
      throw error;
    }
  }
}
