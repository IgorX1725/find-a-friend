import 'dotenv/config'
import { z } from 'zod'
const environmentVariableSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number(),
})

const _env = environmentVariableSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variable. ❌', _env.error.format())

  throw new Error('Invalid environment variable')
}

export const env = environmentVariableSchema.parse(process.env)
