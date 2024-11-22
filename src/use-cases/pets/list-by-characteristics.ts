import { OrgsRepository } from '@models/interfaces/OrgsRepository'
import { Pet, PetsRepository } from '@models/interfaces/PetsRepository'
import {
  ListPetsByCharacteristicsUseCaseRequest,
  PetsFilterKeys,
} from './interfaces/pets-use-case-interfaces'

export class ListPetsByCharacteristicsUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute(data: ListPetsByCharacteristicsUseCaseRequest) {
    const orgsInSpecificCity = await this.orgsRepository.findManyByCity(
      data.city,
    )

    let petsFilteredByCharacteristics: Array<Pet> = []

    for (const org of orgsInSpecificCity) {
      const petsFoundInSpecificOrg = await this.petsRepository.findManyByOrgId(
        org.id,
      )

      const MatchedPets = petsFoundInSpecificOrg.filter((pet) => {
        const filterKeys = Object.keys(data).filter(
          (key) => key !== 'city',
        ) as PetsFilterKeys[]

        for (const key of filterKeys) {
          if (data[key] !== undefined && pet[key] !== data[key]) {
            return false
          }
        }
        return true
      })

      petsFilteredByCharacteristics =
        petsFilteredByCharacteristics.concat(MatchedPets)
    }

    return petsFilteredByCharacteristics
  }
}
