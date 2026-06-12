import { expect, type Locator, type Page } from '@playwright/test'
import { getConfig } from '../../appConfig'

const appConfig = getConfig()
const homePageUrl = new URL('/', appConfig.MANAGE_AND_DELIVER_URL).toString()
const groupsListUrl = new URL(
	'/groups/not-started-or-in-progress',
	appConfig.MANAGE_AND_DELIVER_URL,
).toString()

const homepageHeading = 'Accredited Programmes'

const getGroupsNavigationControl = (page: Page): Locator =>
	page
		.getByRole('link', { name: 'Groups' })
		.or(page.getByRole('button', { name: 'Groups' }))
		.or(page.getByRole('link', { name: 'View groups' }))
		.or(page.getByRole('button', { name: 'View groups' }))
		.first()

export const goToHomePage = async (page: Page) => {
	await page.goto(homePageUrl)
	await expect(page).toHaveURL(homePageUrl)
}

export const verifyHomePage = async (page: Page) => {
	await expect(page).toHaveURL(homePageUrl)
	await expect(page.getByRole('heading', { name: homepageHeading })).toBeVisible()
}

export const verifyGroupsNavigationIsVisible = async (page: Page) => {
	const groupsControl = getGroupsNavigationControl(page)
	await expect(groupsControl).toBeVisible()
}

export const goToGroupsFromHomePage = async (page: Page) => {
	const groupsControl = getGroupsNavigationControl(page)
	await expect(groupsControl).toBeVisible()
	await groupsControl.click()
	await expect(page).toHaveURL(groupsListUrl)
}

export const verifyMainBodyCaseListLinkIsVisible = async (page: Page) => {
	const mainCaseListLink = page
		.getByRole('main')
		.getByRole('link', { name: /case\s?list/i })
		.first()
	await expect(mainCaseListLink).toBeVisible()
}

export const verifyMainBodyGroupsLinkIsVisible = async (page: Page) => {
	const mainGroupsLink = page
		.getByRole('main')
		.getByRole('link', { name: /groups?/i })
		.first()
	await expect(mainGroupsLink).toBeVisible()
}

export const verifyTopNavHomeLinkIsVisible = async (page: Page) => {
	const homeLink = page
		.getByRole('navigation')
		.first()
		.getByRole('link', { name: /^home$/i })
		.first()
	await expect(homeLink).toBeVisible()
}

export const verifyTopNavCaseListLinkIsVisible = async (page: Page) => {
	const caseListLink = page
		.getByRole('navigation')
		.first()
		.getByRole('link', { name: /case\s?list/i })
		.first()
	await expect(caseListLink).toBeVisible()
}

export const verifyTopNavGroupsLinkIsVisible = async (page: Page) => {
	const groupsLink = page
		.getByRole('navigation')
		.first()
		.getByRole('link', { name: /^groups$/i })
		.first()
	await expect(groupsLink).toBeVisible()
}

export const verifyFeedbackLinkIsVisible = async (page: Page) => {
	const feedbackLink = page.getByRole('link', { name: /feedback/i }).first()
	await expect(feedbackLink).toBeVisible()
}

export const verifySignOutLinkIsVisible = async (page: Page) => {
	const signOutLink = page.getByRole('link', { name: /sign out/i }).first()
	await expect(signOutLink).toBeVisible()
}

export const verifyManageYourDetailsLinkIsVisible = async (page: Page) => {
	const manageYourDetailsLink = page
		.getByRole('link', { name: /manage your details/i })
		.first()
	await expect(manageYourDetailsLink).toBeVisible()
}

export const verifyFooterLinksAreVisible = async (page: Page) => {
	const footer = page.locator('footer').first()
	await expect(footer).toBeVisible()

	const footerLinks = footer.getByRole('link')
	const linkCount = await footerLinks.count()
	expect(linkCount).toBeGreaterThan(0)

	for (let index = 0; index < linkCount; index += 1) {
		await expect(footerLinks.nth(index)).toBeVisible()
	}
}

export const verifyHomePageCoreText = async (page: Page) => {
	await expect(page.getByRole('heading', { name: homepageHeading })).toBeVisible()

	const main = page.getByRole('main')
	await expect(main).toBeVisible()

	const contentLines = main.locator('p, li')
	const contentLineCount = await contentLines.count()
	expect(contentLineCount).toBeGreaterThan(0)

	const firstContentLine = (await contentLines.first().innerText()).trim()
	expect(firstContentLine.length).toBeGreaterThan(15)

	// Keep this high-level so copy tweaks do not break tests unnecessarily.
	await expect(main).toContainText(/case\s?list|groups?/i)
}

