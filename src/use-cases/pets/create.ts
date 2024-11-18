import { PetsRepository } from '@models/interfaces/PetsRepository'
import {
  CreatePetsUseCaseRequest,
  CreatePetsUseCaseResponse,
} from './interfaces/pets-use-case-interfaces'
import { OrgsRepository } from '@models/interfaces/OrgsRepository'
import { OrgNotFoundError } from '@use-cases/orgs/error/org-not-found-error'

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async create(
    data: CreatePetsUseCaseRequest,
  ): Promise<CreatePetsUseCaseResponse> {
    const foundOrg = await this.orgsRepository.findById(data.org_id)

    if (!foundOrg) {
      throw new OrgNotFoundError(data.org_id)
    }

    const pet = await this.petsRepository.create(data)

    return { pet }
  }
}
