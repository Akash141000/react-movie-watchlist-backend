export interface IError extends Error {
  status?: number;
}

export interface jwtPayload {
  email: string;
  userId: string;
}
