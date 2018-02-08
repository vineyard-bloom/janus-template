import {
	CreateUserRequest, 
	CreateUserResponse 
} from '/Users/aarongreenspan/IbN/vineyard/vineyard-contract-template/target/endpoint-types'

const jsf = require('json-schema-faker');
jsf.extend('faker', function() {
  return require('faker');
});

/************************ -- Create User -- *****************************/

export async function createUserRequestStub(): Promise<CreateUserRequest> {
  return jsf.resolve({"type":"object","properties":{"email":{"$ref":"#/validators/email"},"password":{"$ref":"#/validators/password"},"address":{"$ref":"#/validators/address"},"firstName":{"type":"string"},"lastName":{"type":"string"},"teamId":{"$ref":"#/validators/uuid"},"phone":{"type":"string","pattern":"^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$"}},"additionalProperties":false,"required":["email","password","address","lastName","teamId","phone"],"validators":{"address":{"type":"object","properties":{"street_address":{"type":"string"},"city":{"type":"string"},"state":{"type":"string"}},"required":["street_address","city","state"]},"uuid":{"type":"string","format":"uuid","faker":"random.uuid"},"email":{"type":"string","format":"email","faker":"internet.email"},"password":{"type":"string","pattern":"^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})","faker":"internet.password"},"sku":{"type":"string","pattern":"/^[a-z0-9]{10,20}$/i"}}})
}

export async function createUserResponseStub(): Promise<CreateUserResponse> {
  return jsf.resolve({"type":"object","properties":{"email":{"$ref":"#/validators/email"},"address":{"$ref":"#/validators/address"},"lastName":{"type":"string"},"teamId":{"$ref":"#/validators/uuid"}},"additionalProperties":false,"required":["email","address","lastName","teamId"],"validators":{"address":{"type":"object","properties":{"street_address":{"type":"string"},"city":{"type":"string"},"state":{"type":"string"}},"required":["street_address","city","state"]},"uuid":{"type":"string","format":"uuid","faker":"random.uuid"},"email":{"type":"string","format":"email","faker":"internet.email"},"password":{"type":"string","pattern":"^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})","faker":"internet.password"},"sku":{"type":"string","pattern":"/^[a-z0-9]{10,20}$/i"}}})
}