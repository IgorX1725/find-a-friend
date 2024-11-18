export class OrgNotFoundError extends Error {
  constructor(id: string) {
    super(`There no register org with id ${id}`)
  }
}
