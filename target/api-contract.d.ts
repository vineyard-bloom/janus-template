import {
	CreateUserRequest, 
	CreateUserResponse 
} from '/Users/aarongreenspan/IbN/vineyard/vineyard-contract-template/target/endpoint-types'

export interface ApiActions {
  createUser: (req: CreateUserRequest) => Promise<CreateUserResponse>
}