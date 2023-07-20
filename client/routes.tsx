import { createRoutesFromElements, Route } from 'react-router-dom'

import AppLayout from '@/components/layout/app-layout'
import NotFound from '@/pages/404'
import PetForm from '@/pages/add-new-pet'
import Home from '@/pages/home'
import Leaderboard from '@/pages/leaderboard'
import Owner from '@/pages/owner'
import MyPets from '@/pages/owner'
import Pet from '@/pages/pet'
import Random from '@/pages/random'

export const routes = createRoutesFromElements(
  <>
    <Route element={<AppLayout />}>
      <Route index element={<Home />} />
      <Route path="leaderboard" element={<Leaderboard />} />
      <Route path="pets/:id" element={<Pet />} />
      <Route path="random" element={<Random />} />
      <Route path="owners/:id" element={<Owner />} />
      <Route path="owners/:id/pets" element={<MyPets />} />
      <Route path="add-pet" element={<PetForm />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </>
)
