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
      addressNumber: data.addressNumber,
      city: data.city,
      contactNumber: data.contactNumber,
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
}
