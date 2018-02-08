"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsf = require('json-schema-faker');
jsf.extend('faker', function () {
    return require('faker');
});
/************************ -- Create User -- *****************************/
function createUserRequestStub() {
    return __awaiter(this, void 0, void 0, function* () {
        return jsf.resolve({ "type": "object", "properties": { "email": { "$ref": "#/validators/email" }, "password": { "$ref": "#/validators/password" }, "address": { "$ref": "#/validators/address" }, "firstName": { "type": "string" }, "lastName": { "type": "string" }, "teamId": { "$ref": "#/validators/uuid" }, "phone": { "type": "string", "pattern": "^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$" } }, "additionalProperties": false, "required": ["email", "password", "address", "lastName", "teamId", "phone"], "validators": { "address": { "type": "object", "properties": { "street_address": { "type": "string" }, "city": { "type": "string" }, "state": { "type": "string" } }, "required": ["street_address", "city", "state"] }, "uuid": { "type": "string", "format": "uuid", "faker": "random.uuid" }, "email": { "type": "string", "format": "email", "faker": "internet.email" }, "password": { "type": "string", "pattern": "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})", "faker": "internet.password" }, "sku": { "type": "string", "pattern": "/^[a-z0-9]{10,20}$/i" } } });
    });
}
exports.createUserRequestStub = createUserRequestStub;
function createUserResponseStub() {
    return __awaiter(this, void 0, void 0, function* () {
        return jsf.resolve({ "type": "object", "properties": { "email": { "$ref": "#/validators/email" }, "address": { "$ref": "#/validators/address" }, "lastName": { "type": "string" }, "teamId": { "$ref": "#/validators/uuid" } }, "additionalProperties": false, "required": ["email", "address", "lastName", "teamId"], "validators": { "address": { "type": "object", "properties": { "street_address": { "type": "string" }, "city": { "type": "string" }, "state": { "type": "string" } }, "required": ["street_address", "city", "state"] }, "uuid": { "type": "string", "format": "uuid", "faker": "random.uuid" }, "email": { "type": "string", "format": "email", "faker": "internet.email" }, "password": { "type": "string", "pattern": "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})", "faker": "internet.password" }, "sku": { "type": "string", "pattern": "/^[a-z0-9]{10,20}$/i" } } });
    });
}
exports.createUserResponseStub = createUserResponseStub;
//# sourceMappingURL=endpoint-stubs.js.map