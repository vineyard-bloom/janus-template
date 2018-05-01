import {
	CreateUserRequest, 
	GetUserRequest, 
	CreateUserResponse, 
	GetUserResponse 
} from '/Users/aarongreenspan/IbN/VINEYARD/vineyard-janus-template/endpoint-definitions-generated/endpoint-types'

export interface ApiActions {
  createUser: (req: CreateUserRequest) => Promise<CreateUserResponse>
	getUser: (req: GetUserRequest) => Promise<GetUserResponse>
}