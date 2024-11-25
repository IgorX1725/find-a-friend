import { InMemoryPetsRepository } from '@models/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { randomUUID } from 'node:crypto'
import { InMemoryOrgsRepository } from '@models/in-memory/in-memory-orgs-repository'
import { ListPetsByCityUseCase } from '../list-by-city'

describe('List pets by City Use Cases', async () => {
  let petsRepository: InMemoryPetsRepository
  let orgsRepository: InMemoryOrgsRepository
  let sut: ListPetsByCityUseCase

  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new ListPetsByCityUseCase(orgsRepository, petsRepository)
  })

  it('should be able to list pets located in the same city.', async () => {
    const firstOrgId = randomUUID()
    const secondOrgId = randomUUID()
    const cityName = 'good city'

    orgsRepository.items.push({
      id: firstOrgId,
      org_name: "Pet's house",
      address: 'Good way street',
      address_number: '389',
      city: cityName,
      contact_number: '9999999999',
      email: 'orgmail@email.com',
      password: '123456',
      responsible_name: 'John Doe',
      zip_code: '383405374',
      created_at: new Date(),
    })

    orgsRepository.items.push({
      id: secondOrgId,
      org_name: "Pet's house 2",
      address: 'Good way street',
      address_number: '389',
      city: cityName,
      contact_number: '9999999999',
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
      org_id: firstOrgId,
      size: 1,
      created_at: new Date(),
    })

    petsRepository.items.push({
      id: randomUUID(),
      name: 'Bidu',
      description: 'Little cute dog',
      age: 2,
      category: 1,
      color: 'brown',
      energy_level: 3,
      environment: 1,
      independency_level: 1,
      org_id: secondOrgId,
      size: 1,
      created_at: new Date(),
    })

    const pets = await sut.execute(cityName)

    expect(pets).toHaveLength(2)
  })
})
