export interface Pet {
  id: number
  ownerId: string
  name: string
  bio: string
  imageUrl: string
  animal: 'cat' | 'dog'
  points: number
  createdAt: string
  updatedAt: string
}

export interface PetData {
  id: number
  ownerId: string
  name: string
  bio: string
  imageUrl: string
  animal: 'cat' | 'dog'
  points: number
}

export interface NewPet {
  ownerId: string
  name: string
  bio: string
  imageUrl: string
  animal: 'cat' | 'dog'
}
