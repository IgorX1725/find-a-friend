import {
  CreateOrgParams,
  OrgsRepository,
} from '@models/interfaces/OrgsRepository'
import { prisma } from 'src/lib/prisma'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: CreateOrgParams) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }

  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    })

    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    return org
  }

  async findManyByCity(city: string) {
    const org = await prisma.org.findMany({
      where: {
        city,
      },
    })

    return org
  }
}
