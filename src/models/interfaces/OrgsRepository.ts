export interface Org {
  id: string
  org_name: string
  responsible_name: string
  email: string
  password: string
  city: string
  address: string
  zip_code: string
  address_number: string
  contact_number: string
  created_at: Date
}

export interface CreateOrgParams {
  id?: string
  org_name: string
  responsible_name: string
  email: string
  password: string
  city: string
  address: string
  zip_code: string
  address_number: string
  contact_number: string
}

export interface OrgsRepository {
  create(data: CreateOrgParams): Promise<Org>
  findById(id: string): Promise<Org | null>
  findByEmail(email: string): Promise<Org | null>
  findManyByCity(city: string): Promise<Org[]>
}
