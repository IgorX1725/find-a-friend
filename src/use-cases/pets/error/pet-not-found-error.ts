export class PetNotFoundError extends Error {
  constructor(id: string) {
    super(`There no registered pet with id ${id}`)
  }
}
