import { expect, type Page } from '@playwright/test'
import { getConfig } from '../../appConfig'

const appConfig = getConfig()

export const findAndReferLoginCommunity = async (page: Page) => {
  await page.goto(appConfig.MANAGE_AND_DELIVER_URL)
  await page.getByLabel('Username').fill(appConfig.HMPPS_COMMUNITY_AUTH_USERNAME)
  await page.getByLabel('Password').fill(appConfig.HMPPS_COMMUNITY_AUTH_PASSWORD)
  await page.locator('#submit', { hasText: 'Sign in' }).click()
  await expect(page.getByText('Building Choices:')).toBeVisible()
}

