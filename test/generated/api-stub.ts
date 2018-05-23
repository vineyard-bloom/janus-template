import {
	createUserResponseStub, 
	getUserResponseStub 
} from './endpoint-stubs'
import {
	ApiContract 
} from './api-contract'

export const apiStub: ApiContract = {
  createUser: createUserResponseStub,
	getUser: getUserResponseStub
}