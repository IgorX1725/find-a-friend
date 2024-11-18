import { randomUUID } from 'node:crypto'
import {
  CreatePetParams,
  Pet,
  PetsRepository,
} from '@models/interfaces/PetsRepository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: CreatePetParams) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description,
      category: data.category,
      age: data.age,
      color: data.color,
      energy_level: data.energy_level,
      size: data.size,
      independency_level: data.independency_level,
      environment: data.environment,
      org_id: data.org_id,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
