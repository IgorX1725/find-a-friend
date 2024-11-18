import { OrgsRepository } from '@models/interfaces/OrgsRepository'
import { CreateOrgUseCaseRequest } from './interfaces/orgs-use-case-interface'
import { hash } from 'bcrypt'
import { EmailAlreadyRegisteredError } from './error/email-already-registered-error'

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(data: CreateOrgUseCaseRequest) {
    const hashedPassword = await hash(data.password, 6)

    const orgFoundWithSameEmail = await this.orgsRepository.findByEmail(
      data.email,
    )

    if (orgFoundWithSameEmail) {
      throw new EmailAlreadyRegisteredError(data.email)
    }

    const org = await this.orgsRepository.create({
      ...data,
      password: hashedPassword,
    })

    return { org }
  }
}
