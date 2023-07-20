/*sending the GET request to the backend to get the all the 
owner's pets (/api/v1/owners/{ownerId}/pets).*/
import { PetData } from '@models/pets'
import request from 'superagent'

export async function fetchOwnerPets(ownerId: string): Promise<PetData[]> {
  return request
    .get(`/api/v1/owner/${ownerId}/pets`)
    .then((res) => res.body.pets)
}
