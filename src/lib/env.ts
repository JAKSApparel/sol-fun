import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_PROGRAM_ID: z.string().min(1),
  NEXT_PUBLIC_TOKEN_METADATA_PROGRAM_ID: z.string().min(1),
  // Add other required env variables
})

export const env = envSchema.parse({
  NEXT_PUBLIC_PROGRAM_ID: process.env.NEXT_PUBLIC_PROGRAM_ID,
  NEXT_PUBLIC_TOKEN_METADATA_PROGRAM_ID: process.env.NEXT_PUBLIC_TOKEN_METADATA_PROGRAM_ID,
  // Add other env variables
}) 