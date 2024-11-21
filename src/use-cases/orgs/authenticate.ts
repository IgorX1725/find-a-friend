import { OrgsRepository } from '@models/interfaces/OrgsRepository'
import {
  AuthenticateOrgRequest,
  AuthenticateOrgResponse,
} from './interfaces/orgs-use-case-interface'
import { InvalidCredentialsError } from './error/invalid-credentials-error'
import { compare } from 'bcrypt'

export class AuthenticateOrgUseCase {
  constructor(private orgRepository: OrgsRepository) {}

  async execute(
    data: AuthenticateOrgRequest,
  ): Promise<AuthenticateOrgResponse> {
    const org = await this.orgRepository.findByEmail(data.email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const isCorrectPassword = await compare(data.password, org.password)

    if (!isCorrectPassword) {
      throw new InvalidCredentialsError()
    }

    return { org }
  }
}
