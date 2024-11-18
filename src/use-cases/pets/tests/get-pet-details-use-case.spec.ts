import { InMemoryPetsRepository } from '@models/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { randomUUID } from 'node:crypto'
import { GetPetDetailsUseCase } from '../get-details'
import { PetNotFoundError } from '../error/pet-not-found-error'

describe('Get Pet details Use Cases', async () => {
  let petsRepository: InMemoryPetsRepository
  let sut: GetPetDetailsUseCase

  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsUseCase(petsRepository)
  })

  it('should be able to get a pet details by id', async () => {
    const petId = randomUUID()

    petsRepository.items.push({
      id: petId,
      name: 'Bilu',
      description: 'Little cute dog',
      age: 2,
      category: 1,
      color: 'brown',
      energy_level: 3,
      environment: 1,
      independency_level: 1,
      org_id: randomUUID(),
      size: 1,
      created_at: new Date(),
    })

    const { pet } = await sut.execute({ id: petId })

    expect(pet).toEqual(expect.objectContaining({ id: petId, name: 'Bilu' }))
  })

  it('should not be able to find a pet with wrong id', async () => {
    const petId = randomUUID()
    const nonRegisteredPetId = randomUUID()

    petsRepository.items.push({
      id: petId,
      name: 'Bilu',
      description: 'Little cute dog',
      age: 2,
      category: 1,
      color: 'brown',
      energy_level: 3,
      environment: 1,
      independency_level: 1,
      org_id: randomUUID(),
      size: 1,
      created_at: new Date(),
    })

    const findPetExec = sut.execute({ id: nonRegisteredPetId })

    await expect(findPetExec).rejects.toBeInstanceOf(PetNotFoundError)
    await expect(findPetExec).rejects.toThrow(
      `There no registered pet with id ${nonRegisteredPetId}`,
    )
  })
})
