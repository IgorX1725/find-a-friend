import { OrgsRepository } from '@models/interfaces/OrgsRepository'
import { Pet, PetsRepository } from '@models/interfaces/PetsRepository'

export class ListPetsByCityUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute(city: string) {
    const orgsInSpecificCity = await this.orgsRepository.findManyByCity(city)

    let petsFoundByCity: Array<Pet> = []

    for (const org of orgsInSpecificCity) {
      const petsFound = await this.petsRepository.findManyByOrgId(org.id)

      petsFoundByCity = petsFoundByCity.concat(petsFound)
    }

    return petsFoundByCity
  }
}
