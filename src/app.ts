import { orgsRoutes } from '@controllers/orgs/routes'
import { petsRoutes } from '@controllers/pets/routes'
import Fastify from 'fastify'

export const app = Fastify()

app.register(petsRoutes)
app.register(orgsRoutes)
