import { expect, type Page } from '@playwright/test'
import { getConfig } from '../../appConfig'

const appConfig = getConfig()
const manageAndDeliverRootUrl = new URL('/', appConfig.MANAGE_AND_DELIVER_URL).toString()

export const manageAndDeliverCommunityLogin = async (page: Page) => {
  await page.goto(appConfig.MANAGE_AND_DELIVER_URL)
  await page.getByLabel('Username').fill(appConfig.HMPPS_COMMUNITY_AUTH_USERNAME)
  await page.getByLabel('Password').fill(appConfig.HMPPS_COMMUNITY_AUTH_PASSWORD)
  await page.locator('#submit', { hasText: 'Sign in' }).click()

  // Some environments briefly remain on /sign-in/callback before redirecting.
  await page
    .waitForURL(url => !url.pathname.startsWith('/sign-in/callback'), {
      timeout: 15000,
    })
    .catch(() => {})

  await expect(page).toHaveURL(new RegExp(`^${manageAndDeliverRootUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`))
  await expect(page.getByRole('heading', { name: 'Accredited Programmes' })).toBeVisible({ timeout: 15000 })
}

