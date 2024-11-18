import { PetsRepository } from '@models/interfaces/PetsRepository'
import {
  GetPetDetailsUseCaseRequest,
  GetPetDetailsUseCaseResponse,
} from './interfaces/pets-use-case-interfaces'
import { PetNotFoundError } from './error/pet-not-found-error'

export class GetPetDetailsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
  }: GetPetDetailsUseCaseRequest): Promise<GetPetDetailsUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new PetNotFoundError(id)
    }

    return { pet }
  }
}
