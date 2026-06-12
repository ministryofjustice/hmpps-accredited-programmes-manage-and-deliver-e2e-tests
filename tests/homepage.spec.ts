import { test } from '@playwright/test'
import { manageAndDeliverCommunityLogin } from '../steps/auth/login'
import {
  goToGroupsFromHomePage,
  goToHomePage,
  verifyFeedbackLinkIsVisible,
  verifyFooterLinksAreVisible,
  verifyHomePageCoreText,
  verifyHomePage,
  verifyManageYourDetailsLinkIsVisible,
  verifySignOutLinkIsVisible,
  verifyTopNavCaseListLinkIsVisible,
  verifyTopNavGroupsLinkIsVisible,
  verifyTopNavHomeLinkIsVisible,
} from '../steps/homepage/homePage'

test.describe('Homepage', () => {
  test('smoke: signed-in user sees homepage essentials', async ({ page }) => {
    await manageAndDeliverCommunityLogin(page)
    await goToHomePage(page)
    await verifyHomePage(page)
    await verifyTopNavHomeLinkIsVisible(page)
    await verifyTopNavCaseListLinkIsVisible(page)
    await verifyTopNavGroupsLinkIsVisible(page)
    await verifyFeedbackLinkIsVisible(page)
    await verifySignOutLinkIsVisible(page)
    await verifyManageYourDetailsLinkIsVisible(page)
    await verifyFooterLinksAreVisible(page)
    await verifyHomePageCoreText(page)
  })

  test('smoke: user can navigate from homepage to groups list', async ({ page }) => {
    await manageAndDeliverCommunityLogin(page)
    await goToHomePage(page)
    await goToGroupsFromHomePage(page)
  })
})
