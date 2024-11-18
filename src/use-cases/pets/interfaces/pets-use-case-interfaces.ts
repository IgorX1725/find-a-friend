import { Pet } from '@models/interfaces/PetsRepository'

export interface CreatePetsUseCaseRequest {
  name: string
  description: string
  category: number
  age: number
  color: string
  energy_level: number
  size: number
  independency_level: number
  environment: number
  org_id: string
}

export interface CreatePetsUseCaseResponse {
  pet: Pet
}
