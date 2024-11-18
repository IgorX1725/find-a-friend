export interface Pet {
  id: string
  name: string
  description: string
  category: number
  age: number
  color: string
  energy_level: number
  size: number
  independency_level: number
  environment: number
  created_at: Date
  org_id: string
}

export interface CreatePetParams {
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

export interface ListPetsByFilterParams {
  city: string
  category?: string
  breed?: string
  age?: number
  color?: string
}

export interface PetsRepository {
  create(data: CreatePetParams): Promise<Pet>
  // findManyByFilter(
  //   listByCharacteristics: ListPetsByFilterParams,
  // ): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
}
