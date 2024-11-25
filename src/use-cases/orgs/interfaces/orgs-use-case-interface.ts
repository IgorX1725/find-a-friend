import { Org } from '@models/interfaces/OrgsRepository'

export interface CreateOrgUseCaseRequest {
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

export interface CreateOrgUseCaseResponse {
  org: Org
}

export interface AuthenticateOrgRequest {
  email: string
  password: string
}

export interface AuthenticateOrgResponse {
  org: Omit<Org, 'password' | 'created_at'>
}
