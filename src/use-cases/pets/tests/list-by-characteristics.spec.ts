import { InMemoryPetsRepository } from '@models/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { randomUUID } from 'node:crypto'
import { InMemoryOrgsRepository } from '@models/in-memory/in-memory-orgs-repository'
import { ListPetsByCharacteristicsUseCase } from '../list-by-characteristics'

describe('List pets by characteristics Use Cases', async () => {
  let petsRepository: InMemoryPetsRepository
  let orgsRepository: InMemoryOrgsRepository
  let sut: ListPetsByCharacteristicsUseCase

  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new ListPetsByCharacteristicsUseCase(orgsRepository, petsRepository)
  })

  it('should be able to get a Pet which matches with characteristics filter ', async () => {
    const orgId = randomUUID()

    orgsRepository.items.push({
      id: orgId,
      org_name: "Pet's house",
      address: 'Good way street',
      addressNumber: 389,
      city: 'good city',
      contactNumber: '9999999999',
      email: 'orgmail@email.com',
      password: '123456',
      responsible_name: 'John Doe',
      zip_code: '383405374',
      created_at: new Date(),
    })

    orgsRepository.items.push({
      id: orgId,
      org_name: "Pet's house 2",
      address: 'Good way street',
      addressNumber: 389,
      city: 'Big city',
      contactNumber: '9999999999',
      email: 'orgmail@email.com',
      password: '123456',
      responsible_name: 'John Doe',
      zip_code: '383405374',
      created_at: new Date(),
    })

    petsRepository.items.push({
      id: randomUUID(),
      name: 'Bilu',
      description: 'Little cute dog',
      age: 2,
      category: 1,
      color: 'brown',
      energy_level: 3,
      environment: 1,
      independency_level: 1,
      org_id: orgId,
      size: 1,
      created_at: new Date(),
    })

    const pets = await sut.execute({
      city: 'good city',
      description: 'Little cute dog',
      age: 2,
      category: 1,
      color: 'brown',
      energy_level: 3,
      environment: 1,
      independency_level: 1,
      size: 1,
    })

    expect(pets).toHaveLength(1)
  })

  it('should be able to get a list of Pets which matches with characteristics filter ', async () => {
    const orgId = randomUUID()

    orgsRepository.items.push({
      id: orgId,
      org_name: "Pet's house",
      address: 'Good way street',
      addressNumber: 389,
      city: 'good city',
      contactNumber: '9999999999',
      email: 'orgmail@email.com',
      password: '123456',
      responsible_name: 'John Doe',
      zip_code: '383405374',
      created_at: new Date(),
    })

    petsRepository.items.push({
      id: randomUUID(),
      name: 'Bilu',
      description: 'Little cute dog',
      age: 2,
      category: 1,
      color: 'brown',
      energy_level: 3,
      environment: 1,
      independency_level: 1,
      org_id: orgId,
      size: 1,
      created_at: new Date(),
    })

    petsRepository.items.push({
      id: randomUUID(),
      name: 'Bili',
      description: 'Little cute dog',
      age: 2,
      category: 1,
      color: 'brown',
      energy_level: 3,
      environment: 1,
      independency_level: 1,
      org_id: orgId,
      size: 1,
      created_at: new Date(),
    })

    const pets = await sut.execute({
      city: 'good city',
    })

    expect(pets).toHaveLength(2)
  })
})
