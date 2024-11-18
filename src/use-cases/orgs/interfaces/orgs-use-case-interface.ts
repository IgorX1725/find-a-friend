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
  addressNumber: number
  contactNumber: string
}

export interface CreateOrgUseCaseResponse {
  org: Org
}