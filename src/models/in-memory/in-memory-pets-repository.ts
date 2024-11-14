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
      id: randomUUID(),
      category: data.category,
      breed: data.breed,
      age: data.age,
      color: data.color,
      orgId: randomUUID(),
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
