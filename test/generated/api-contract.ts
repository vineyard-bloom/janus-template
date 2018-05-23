import {
	CreateUserRequest, 
	CreateUserResponse, 
	GetUserRequest, 
	GetUserResponse 
} from './endpoint-types'
export interface ApiContract {
  createUser: (req: CreateUserRequest) => Promise<CreateUserResponse>
	getUser: (req: GetUserRequest) => Promise<GetUserResponse>
}