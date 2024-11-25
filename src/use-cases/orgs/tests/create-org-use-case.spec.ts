import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgUseCase } from '../create'
import { randomUUID } from 'node:crypto'
import { InMemoryOrgsRepository } from '@models/in-memory/in-memory-orgs-repository'
import { EmailAlreadyRegisteredError } from '../error/email-already-registered-error'

describe('Create Org Use Case', async () => {
  let orgsRepository: InMemoryOrgsRepository
  let sut: CreateOrgUseCase

  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to register a org', async () => {
    const orgId = randomUUID()
    const orgName = "Pet's house"

    const { org } = await sut.execute({
      id: orgId,
      org_name: orgName,
      address: 'Good way street',
      address_number: '389',
      city: 'good city',
      contact_number: '9999999999',
      email: 'owner@email.com',
      password: '123456',
      responsible_name: 'John Doe',
      zip_code: '383405374',
    })

    expect(org).toEqual(
      expect.objectContaining({ id: orgId, org_name: orgName }),
    )
  })

  it('should not be able to register a org with an email already in use', async () => {
    const orgEmail = 'owner@email.com'

    await sut.execute({
      id: randomUUID(),
      org_name: "Pet's house",
      address: 'Good way street',
      address_number: '389',
      city: 'good city',
      contact_number: '9999999999',
      email: orgEmail,
      password: '123456',
      responsible_name: 'John Doe',
      zip_code: '383405374',
    })

    const createOrgExec = sut.execute({
      id: randomUUID(),
      org_name: "Pet's house",
      address: 'Good way street',
      address_number: '389',
      city: 'good city',
      contact_number: '9999999999',
      email: orgEmail,
      password: '123456',
      responsible_name: 'John Doe',
      zip_code: '383405374',
    })

    await expect(createOrgExec).rejects.toBeInstanceOf(
      EmailAlreadyRegisteredError,
    )

    await expect(createOrgExec).rejects.toThrow(
      `The email ${orgEmail} has already in use.`,
    )
  })
})
