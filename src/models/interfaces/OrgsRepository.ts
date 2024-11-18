export interface Org {
  id: string
  org_name: string
  responsible_name: string
  email: string
  password: string
  city: string
  address: string
  zip_code: string
  addressNumber: number
  contactNumber: string
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
  addressNumber: number
  contactNumber: string
}

export interface FindOrgByEmailAndPasswordParams {
  email: string
  password: string
}

export interface OrgsRepository {
  create(data: CreateOrgParams): Promise<Org>
  // findByEmailAndPassword(data: FindOrgByEmailAndPasswordParams): Promise<Org>
  findById(id: string): Promise<Org | null>
  findByEmail(email: string): Promise<Org | null>
}
