import { Pet } from '@models/interfaces/PetsRepository'

export interface CreatePetsUseCaseRequest {
  id?: string
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

export interface ListPetsByCharacteristicsUseCaseRequest {
  name?: string
  description?: string
  category?: number
  age?: number
  color?: string
  energy_level?: number
  size?: number
  independency_level?: number
  environment?: number
  city: string
}

export type PetsFilterKeys =
  | 'name'
  | 'description'
  | 'category'
  | 'age'
  | 'color'
  | 'energy_level'
  | 'size'
  | 'independency_level'
  | 'environment'

export interface GetPetDetailsUseCaseRequest {
  id: string
}
export interface CreatePetsUseCaseResponse {
  pet: Pet
}
export interface GetPetDetailsUseCaseResponse {
  pet: Pet
}
