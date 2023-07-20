import request from 'superagent'

export async function getPetById(petId: string) {
  const response = await request.get(`/api/v1/pets/${petId}`)
  return response.body
}
