import {
	createUserResponseStub, 
	getUserResponseStub 
} from './endpoint-stubs'
import {
	ApiActions 
} from './api-contract'

export const apiStub: ApiActions = {
  createUser: createUserResponseStub,
	getUser: getUserResponseStub
}