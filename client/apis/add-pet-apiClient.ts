import request from 'superagent'

import { NewPet } from '../../models/pets'

export async function addPet({
  pet,
  token,
}: {
  pet: NewPet
  token: string
}): Promise<void> {
  const response = await request
    .post('/api/v1/pets')
    .set('Authorization', `Bearer ${token}`)
    .send({ pet })

  return response.body.pet
}

async function getImageSignature(token: string) {
  const response = await request
    .get('/api/v1/pets/signature')
    .set('Authorization', `Bearer ${token}`)

  const { signature, timestamp, cloudName, apiKey } = response.body
  return { signature, timestamp, cloudName, apiKey }
}

export async function uploadImage(image: File, token: string) {
  const { signature, timestamp, cloudName, apiKey } = await getImageSignature(
    token
  )

  const formData = new FormData()
  formData.append('file', image)
  formData.append('signature', signature)
  formData.append('timestamp', timestamp)
  formData.append('cloud_name', cloudName)
  formData.append('api_key', apiKey)

  const response = await request
    .post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`)
    .send(formData)
  const data = response.body
  return data.url
}
