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
let OfferService = class OfferService {
    getAllTemplates() {
        return __awaiter(this, void 0, void 0, function* () {
            const allTemplates = yield index_1.prisma.offerTemplate.findMany();
            return allTemplates;
        });
    }
    // create offer template
    createTemplate(newTemplate) {
        return __awaiter(this, void 0, void 0, function* () {
            const newOfferTemplate = yield index_1.prisma.offerTemplate.create({
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
        });
    }
    getTemplate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const template = yield index_1.prisma.offerTemplate.findUniqueOrThrow({
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
            }
            catch (e) {
                throw e;
            }
        });
    }
    updateTemplate(queryParams, bodyParams) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const latestVersionNumber = yield index_1.prisma.bodyVersion.findMany({
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
                const template = yield index_1.prisma.bodyVersion.create({
                    data: {
                        body: bodyParams.body,
                        version: latestVersionNumber[0].version + 1,
                        offerId: queryParams.id,
                    },
                });
                return template;
            }
            catch (e) {
                throw e;
            }
        });
    }
    generateOffer(bodyParams) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const offer = yield index_1.prisma.offer.create({
                    data: {
                        data: bodyParams.data,
                        uid: crypto_1.default.randomUUID(),
                        expiry: new Date(bodyParams.expiry),
                        bodyVersionId: bodyParams.bodyVersionId,
                    },
                });
                return offer;
            }
            catch (error) {
                throw error;
            }
        });
    }
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
    offerAccepted(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const offerAccepted = yield index_1.prisma.offer.update({
                    where: {
                        uid: queryParams.uid,
                    },
                    data: {
                        isAccepted: true,
                        acceptedDate: new Date(),
                    },
                });
                return offerAccepted;
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
