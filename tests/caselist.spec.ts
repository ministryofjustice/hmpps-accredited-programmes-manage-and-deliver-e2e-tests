import { test } from '@playwright/test'
import { manageAndDeliverCommunityLogin } from '../steps/auth/login'
import { goToHomePage } from '../steps/homepage/homePage'
import {
  applyCaseListFilterAndVerifySubmission,
  goToCaseListFromTopNav,
  verifyCaseListFiltersAreVisible,
  verifyCaseListPageHeading,
  verifyCaseListTopNavLinksAreVisible,
  verifyReferralTabsWithCountsAreVisible,
} from '../steps/caselist/caselistPage'

test.describe('Case list page', () => {
  test('smoke: case list page shows key controls and counts', async ({ page }) => {
    await manageAndDeliverCommunityLogin(page)
    await goToHomePage(page)
    await goToCaseListFromTopNav(page)
    await verifyCaseListPageHeading(page)
    await verifyCaseListTopNavLinksAreVisible(page)
    await verifyReferralTabsWithCountsAreVisible(page)
    await verifyCaseListFiltersAreVisible(page)
  })

  test('smoke: applying a case list filter updates page state', async ({ page }) => {
    await manageAndDeliverCommunityLogin(page)
    await goToHomePage(page)
    await goToCaseListFromTopNav(page)
    await applyCaseListFilterAndVerifySubmission(page)
  })
})
