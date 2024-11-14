export interface Org {
  id: string
  org_name: string
  responsible_name: string
  email: string
  password: string
  city: string
  address: string
  zip_code: number
  addressNumber: number
  contactNumber: string
  created_at: Date
}

export interface CreateOrgParams {
  name: string
  email: string
  password: string
  city: string
  address: string
  zipCode: number
  address_number: number
  contact_number: string
}

export interface FindOrgByEmailAndPasswordParams {
  email: string
  password: string
}

export interface OrgsRepository {
  create(data: CreateOrgParams): Promise<Org>
  findByEmailAndPassword(data: FindOrgByEmailAndPasswordParams): Promise<Org>
}
