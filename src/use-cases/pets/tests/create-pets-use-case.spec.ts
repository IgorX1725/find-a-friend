import { InMemoryPetsRepository } from '@models/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from '../create'
import { randomUUID } from 'node:crypto'
import { InMemoryOrgsRepository } from '@models/in-memory/in-memory-orgs-repository'
import { hash } from 'bcrypt'
import { OrgNotFoundError } from '@use-cases/orgs/error/org-not-found-error'

describe('Create Pets Use Cases', async () => {
  let petsRepository: InMemoryPetsRepository
  let orgsRepository: InMemoryOrgsRepository
  let sut: CreatePetUseCase

  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to register a pet', async () => {
    const orgId = randomUUID()
    orgsRepository.items.push({
      org_name: "Pet's house",
      address: 'Good way street',
      addressNumber: 389,
      city: 'good city',
      contactNumber: '9999999999',
      created_at: new Date(),
      email: 'owner@email.com',
      id: orgId,
      password: await hash('123456', 4),
      responsible_name: 'John Doe',
      zip_code: '383405374',
    })

    const { pet } = await sut.create({
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
    })

    expect(pet).toEqual(
      expect.objectContaining({ id: expect.any(String), name: 'Bilu' }),
    )
  })

  it('should not be able to register a pet with a non existent Org id', async () => {
    const orgId = randomUUID()
    const createPetExec = sut.create({
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
    })

    await expect(createPetExec).rejects.toBeInstanceOf(OrgNotFoundError)
    await expect(createPetExec).rejects.toThrow(
      `There no register org with id ${orgId}`,
    )
  })
})
