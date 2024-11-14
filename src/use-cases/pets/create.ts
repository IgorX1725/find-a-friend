import { PetsRepository } from "@models/interfaces/PetsRepository"

interface CreatePetsUseCaseRequest {
  category: string
  breed: string
  age?: number
  color: string
}
interface CreatePetsUseCaseResponse {
  pet: CreatePetsUseCaseRequest
}

export class CreatePetUseCase {
    constructor(
        private petsRepository: PetsRepository,
      ) {}
  const c
}
