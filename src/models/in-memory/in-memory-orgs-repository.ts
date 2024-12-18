import { randomUUID } from 'node:crypto'
import {
  CreateOrgParams,
  Org,
  OrgsRepository,
} from '@models/interfaces/OrgsRepository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: CreateOrgParams) {
    const org: Org = {
      id: data.id ?? randomUUID(),
      address: data.address,
      address_number: data.address_number,
      city: data.city,
      contact_number: data.contact_number,
      email: data.email,
      org_name: data.org_name,
      password: data.password,
      responsible_name: data.responsible_name,
      zip_code: data.zip_code,
      created_at: new Date(),
    }

    this.items.push(org)

    return org
  }

  async findById(id: string) {
    const org = this.items.find((item) => {
      return item.id === id
    })
    return org ?? null
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => {
      return item.email === email
    })
    return org ?? null
  }

  async findManyByCity(city: string) {
    const orgs = this.items.filter((item) => {
      return item.city === city
    })
    return orgs
  }
}
