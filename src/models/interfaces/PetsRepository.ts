export interface Pet {
  id: string
  name: string
  description: string
  category: 'dog'
  age: 'cub' | 'adult' | 'elderly'
  color: string
  energy_level: 'Low' | 'Medium' | 'High'
  size: 'Small' | 'Medium' | 'Large'
  independency_level: 'Low' | 'Medium' | 'High'
  environment: 
}

export interface CreatePetParams {
  category: string
  breed: string
  color: string
  size: number
  weight: number
  orgId: string
}

export interface ListPetsByFilterParams {
  city: string
  category?: string
  breed?: string
  age?: number
  color?: string
}

export interface PetsRepository {
  create(data: CreatePetParams): Promise<Pet>
  findManyByFilter(
    listByCharacteristics: ListPetsByFilterParams,
  ): Promise<Pet[]>
  findById(id: string): Promise<Pet>
}
