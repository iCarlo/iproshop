export interface User {
  id: number,
  username: string,
  email: string,
  password: string
}

export interface RegisterUserInput {
  username: string,
  email: string,
  password: string
}

export interface LoginUserInput {
  username: string,
  password: string
}