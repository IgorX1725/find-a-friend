import { beforeEach, describe, expect, it } from 'vitest'
import { randomUUID } from 'node:crypto'
import { InMemoryOrgsRepository } from '@models/in-memory/in-memory-orgs-repository'
import { hash } from 'bcrypt'
import { InvalidCredentialsError } from '../error/invalid-credentials-error'
import { AuthenticateOrgUseCase } from '../authenticate'

describe('Authenticate Org Use Case', async () => {
  let orgsRepository: InMemoryOrgsRepository
  let sut: AuthenticateOrgUseCase

  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgUseCase(orgsRepository)
  })

  it('should be able to authenticate a org using email and password', async () => {
    const orgEmail = 'owner@email.com'
    const orgPassword = '123456'
    const orgHashedPassword = await hash(orgPassword, 6)

    orgsRepository.items.push({
      id: randomUUID(),
      org_name: "Pet's house",
      address: 'Good way street',
      address_number: '389',
      city: 'good city',
      contact_number: '9999999999',
      email: orgEmail,
      password: orgHashedPassword,
      responsible_name: 'John Doe',
      zip_code: '383405374',
      created_at: new Date(),
    })

    const { org } = await sut.execute({
      email: orgEmail,
      password: orgPassword,
    })

    expect(org).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email: orgEmail,
      }),
    )
  })

  it('should not be able to authenticate a org using wrong email and password', async () => {
    const orgHashedPassword = await hash('123456', 6)

    const wrongEmail = 'wrong.email@email.com'
    const wrongPassword = 'wrong-password'

    orgsRepository.items.push({
      id: randomUUID(),
      org_name: "Pet's house",
      address: 'Good way street',
      address_number: '389',
      city: 'good city',
      contact_number: '9999999999',
      email: 'owner@email.com',
      password: orgHashedPassword,
      responsible_name: 'John Doe',
      zip_code: '383405374',
      created_at: new Date(),
    })
    const authenticateOrgExec = sut.execute({
      email: wrongEmail,
      password: wrongPassword,
    })

    await expect(authenticateOrgExec).rejects.toBeInstanceOf(
      InvalidCredentialsError,
    )
  })
})
