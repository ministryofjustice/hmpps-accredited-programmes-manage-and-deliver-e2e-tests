import dotenv from 'dotenv'
import { error } from 'node:console'

dotenv.config()

const config = {
  HMPPS_COMMUNITY_AUTH_USERNAME: process.env.HMPPS_COMMUNITY_AUTH_USERNAME,
  HMPPS_COMMUNITY_AUTH_PASSWORD: process.env.HMPPS_COMMUNITY_AUTH_PASSWORD,
  MANAGE_AND_DELIVER_URL: process.env.MANAGE_AND_DELIVER_URL
}

export function getConfig(): AppConfig {
  const missingEnvs: string[] = []
  Object.entries(config).forEach(([prop, value]) => {
    if (value == null || value === '') {
      missingEnvs.push(`property ${prop}`)
    }
  })
  if (missingEnvs.length > 0) {
    throw error`Missing required environment variables: ${missingEnvs.join(',\n')}`
  }
  return config as AppConfig
}

export type AppConfig = {
  HMPPS_COMMUNITY_AUTH_USERNAME: string
  HMPPS_COMMUNITY_AUTH_PASSWORD: string
  MANAGE_AND_DELIVER_URL: string
}

export default getConfig
