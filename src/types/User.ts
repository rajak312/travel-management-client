export interface UserLoginPayload {
  email: string;
  password: string;
}

export interface UserSignUpPayload extends UserLoginPayload {
  name: string;
}
