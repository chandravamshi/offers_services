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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReqAcceptOffer = exports.ReqOfferViewed = exports.ReqGenerateOfferDto = exports.UpdateTemplateDto = exports.FindTemplateAndDataDto = exports.FindTemplateDto = exports.CreateOfferTemplateDto = void 0;
const class_validator_1 = require("class-validator");
class CreateOfferTemplateDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "name should not be empty" }),
    (0, class_validator_1.IsString)({ message: "name should not be string" }),
    __metadata("design:type", String)
], CreateOfferTemplateDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "body should not be empty" }),
    (0, class_validator_1.IsString)({ message: "body should not be empty" }),
    __metadata("design:type", String)
], CreateOfferTemplateDto.prototype, "body", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "type should not be empty" }),
    (0, class_validator_1.IsString)({ message: "type should not be empty" }),
    __metadata("design:type", String)
], CreateOfferTemplateDto.prototype, "type", void 0);
exports.CreateOfferTemplateDto = CreateOfferTemplateDto;
class FindTemplateDto {
}
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: "parameter id should be int" }),
    (0, class_validator_1.IsNotEmpty)({ message: "parameter id is needed" }),
    __metadata("design:type", Number)
], FindTemplateDto.prototype, "id", void 0);
exports.FindTemplateDto = FindTemplateDto;
class FindTemplateAndDataDto {
}
__decorate([
    (0, class_validator_1.IsString)({ message: "parameter id should be int" }),
    (0, class_validator_1.IsNotEmpty)({ message: "parameter id is needed" }),
    __metadata("design:type", String)
], FindTemplateAndDataDto.prototype, "uid", void 0);
exports.FindTemplateAndDataDto = FindTemplateAndDataDto;
class UpdateTemplateDto extends CreateOfferTemplateDto {
}
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: "parameter id should be int" }),
    (0, class_validator_1.IsNotEmpty)({ message: "parameter id is needed" }),
    __metadata("design:type", Number)
], UpdateTemplateDto.prototype, "id", void 0);
exports.UpdateTemplateDto = UpdateTemplateDto;
class ReqGenerateOfferDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "parameter data should not be empty" }),
    (0, class_validator_1.IsString)({ message: "parameter data should be string" }),
    __metadata("design:type", String)
], ReqGenerateOfferDto.prototype, "data", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "parameter expiry should not be empty" }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], ReqGenerateOfferDto.prototype, "expiry", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: "parameter bodyVersionId should be int" }),
    (0, class_validator_1.IsNotEmpty)({ message: "parameter bodyVersionId is needed" }),
    __metadata("design:type", Number)
], ReqGenerateOfferDto.prototype, "bodyVersionId", void 0);
exports.ReqGenerateOfferDto = ReqGenerateOfferDto;
class ReqOfferViewed {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "parameter uid is needed" }),
    __metadata("design:type", String)
], ReqOfferViewed.prototype, "uid", void 0);
exports.ReqOfferViewed = ReqOfferViewed;
class ReqAcceptOffer extends ReqOfferViewed {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "parameter preffered month is needed" }),
    __metadata("design:type", String)
], ReqAcceptOffer.prototype, "prefferedMonth", void 0);
exports.ReqAcceptOffer = ReqAcceptOffer;
