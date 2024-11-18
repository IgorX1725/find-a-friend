export class EmailAlreadyRegisteredError extends Error {
  constructor(email: string) {
    super(`The email ${email} has already in use.`)
  }
}
