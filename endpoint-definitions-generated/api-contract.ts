import {
	CreateUserRequest, 
	GetUserRequest, 
	CreateUserResponse, 
	GetUserResponse 
} from './endpoint-types'

export interface ApiActions {
  createUser: (req: CreateUserRequest) => Promise<CreateUserResponse>
	getUser: (req: GetUserRequest) => Promise<GetUserResponse>
}