import { Service } from "typedi";
import { Prisma } from "@prisma/client";
import { prisma } from "../index";
import { OfferTemplate } from "../classes/OfferTemplate";
import { ResOfferTemplate } from "../dto/offer.dto";

@Service()
export class OfferService {
  async getAllRecords(): Promise<ResOfferTemplate[]> {
    const allTemplates = await prisma.offerTemplate.findMany();
    return allTemplates;
  }

  // create offer template
  async createTemplate(newTemplate: OfferTemplate): Promise<OfferTemplate> {
    const newOfferTemplate = await prisma.offerTemplate.create({
      data: {
        body: newTemplate.body,
        type: newTemplate.type,
        name: newTemplate.name,
      },
    });

    return newOfferTemplate;
  }

  async getTemplate(id: number): Promise<ResOfferTemplate> {
    try {
      const template = await prisma.offerTemplate.findUniqueOrThrow({
        where: {
          id: id,
        },
      });

      return template;
    } catch (e) {
      throw e;
    }
  }

  async updateTemplate(params: any): Promise<ResOfferTemplate> {
    try {
      const template = await prisma.offerTemplate.update({
        where: {
          id: params.id,
        },
        data: {
          body: params.body,
          type: params.type,
          name: params.name,
        },
      });

      return template;
    } catch (e) {
      throw e;
    }
  }
}
