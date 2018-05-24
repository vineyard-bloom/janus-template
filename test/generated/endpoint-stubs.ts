import {
	CreateUserRequest, 
	CreateUserResponse, 
	GetUserRequest, 
	GetUserResponse 
} from './endpoint-types'
const jsf = require('json-schema-faker')
jsf.extend('faker', function() {
  return require('faker')
})

/************************ -- CreateUser -- *****************************/


export async function createUserRequestDataStub(): Promise<CreateUserRequest['data']> {
  return jsf.resolve({'type':'object','properties':{'email':{'$ref':'#/validators/email'},'password':{'$ref':'#/validators/password'}},'additionalProperties':false,'required':['email','password'],'validators':{'address':{'type':'object','properties':{'street_address':{'type':'string'},'city':{'type':'string'},'state':{'type':'string'}},'required':['street_address','city','state']},'uuid':{'type':'string','format':'uuid','faker':'random.uuid'},'email':{'type':'string','format':'email','faker':'internet.email'},'password':{'type':'string','pattern':'^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})','faker':'internet.password'},'sku':{'type':'string','pattern':'/^[a-z0-9]{10,20}$/i'}}})
}


export async function createUserResponseStub(): Promise<CreateUserResponse> {
  return jsf.resolve({'type':'object','properties':{'email':{'$ref':'#/validators/email'}},'additionalProperties':false,'required':['email'],'validators':{'address':{'type':'object','properties':{'street_address':{'type':'string'},'city':{'type':'string'},'state':{'type':'string'}},'required':['street_address','city','state']},'uuid':{'type':'string','format':'uuid','faker':'random.uuid'},'email':{'type':'string','format':'email','faker':'internet.email'},'password':{'type':'string','pattern':'^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})','faker':'internet.password'},'sku':{'type':'string','pattern':'/^[a-z0-9]{10,20}$/i'}}})
}

/************************ -- GetUser -- *****************************/


export async function getUserRequestDataStub(): Promise<GetUserRequest['data']> {
  return jsf.resolve({'type':'object','properties':{},'additionalProperties':false,'validators':{'address':{'type':'object','properties':{'street_address':{'type':'string'},'city':{'type':'string'},'state':{'type':'string'}},'required':['street_address','city','state']},'uuid':{'type':'string','format':'uuid','faker':'random.uuid'},'email':{'type':'string','format':'email','faker':'internet.email'},'password':{'type':'string','pattern':'^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})','faker':'internet.password'},'sku':{'type':'string','pattern':'/^[a-z0-9]{10,20}$/i'}}})
}


export async function getUserResponseStub(): Promise<GetUserResponse> {
  return jsf.resolve({'type':'object','properties':{'email':{'$ref':'#/validators/email'}},'additionalProperties':false,'required':['email'],'validators':{'address':{'type':'object','properties':{'street_address':{'type':'string'},'city':{'type':'string'},'state':{'type':'string'}},'required':['street_address','city','state']},'uuid':{'type':'string','format':'uuid','faker':'random.uuid'},'email':{'type':'string','format':'email','faker':'internet.email'},'password':{'type':'string','pattern':'^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})','faker':'internet.password'},'sku':{'type':'string','pattern':'/^[a-z0-9]{10,20}$/i'}}})
}