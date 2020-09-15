export interface CreateUserReq {
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  userType?: string
}

export interface CreateUserRes {
  _id: string,
  email: string,
  firstName: string,
  lastName: string,
  userType?: string
}
