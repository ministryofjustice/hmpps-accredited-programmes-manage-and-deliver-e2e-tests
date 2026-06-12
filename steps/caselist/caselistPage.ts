import { expect, type Page } from '@playwright/test'

const caseListNamePattern = /case\s?list/i
const openReferralsTabPattern = /^open referrals \(\d+\)$/i
const closedReferralsTabPattern = /^closed referrals \(\d+\)$/i

export const goToCaseListFromHomeMainBody = async (page: Page) => {
	const caseListLink = page
		.getByRole('main')
		.getByRole('link', { name: caseListNamePattern })
		.first()

	await expect(caseListLink).toBeVisible()
	await caseListLink.click()
	await expect(page).toHaveURL(/case|caselist/i)
}

export const goToCaseListFromTopNav = async (page: Page) => {
	const caseListNavLink = page
		.getByRole('navigation')
		.first()
		.getByRole('link', { name: caseListNamePattern })
		.first()

	await expect(caseListNavLink).toBeVisible()
	await caseListNavLink.click()
	await expect(page).toHaveURL(/case|caselist/i)
}

export const verifyCaseListPageHeading = async (page: Page) => {
	await expect(page.getByRole('heading', { name: caseListNamePattern }).first()).toBeVisible()
}

export const verifyCaseListCoreContent = async (page: Page) => {
	const main = page.getByRole('main')
	await expect(main).toBeVisible()
	await expect(main).toContainText(caseListNamePattern)

	const contentLines = main.locator('p, li, h2, th, td')
	const contentCount = await contentLines.count()
	expect(contentCount).toBeGreaterThan(0)
}

export const verifyCaseListTopNavLinksAreVisible = async (page: Page) => {
	const nav = page.getByRole('navigation').first()
	await expect(nav).toBeVisible()

	await expect(nav.getByRole('link', { name: /^home$/i }).first()).toBeVisible()
	await expect(nav.getByRole('link', { name: caseListNamePattern }).first()).toBeVisible()
	await expect(nav.getByRole('link', { name: /^groups$/i }).first()).toBeVisible()
}

export const verifyCaseListFeedbackAndAccountLinksAreVisible = async (page: Page) => {
	await expect(page.getByRole('link', { name: /feedback/i }).first()).toBeVisible()
	await expect(page.getByRole('link', { name: /sign out/i }).first()).toBeVisible()
	await expect(page.getByRole('link', { name: /manage your details/i }).first()).toBeVisible()
}

export const verifyCaseListFooterLinksAreVisible = async (page: Page) => {
	const footer = page.locator('footer').first()
	await expect(footer).toBeVisible()

	const footerLinks = footer.getByRole('link')
	const linkCount = await footerLinks.count()
	expect(linkCount).toBeGreaterThan(0)

	for (let index = 0; index < linkCount; index += 1) {
		await expect(footerLinks.nth(index)).toBeVisible()
	}
}

export const verifyReferralTabsWithCountsAreVisible = async (page: Page) => {
	const openReferralsTab = page
		.getByRole('tab', { name: openReferralsTabPattern })
		.or(page.getByRole('link', { name: openReferralsTabPattern }))
		.or(page.getByRole('button', { name: openReferralsTabPattern }))
		.first()

	const closedReferralsTab = page
		.getByRole('tab', { name: closedReferralsTabPattern })
		.or(page.getByRole('link', { name: closedReferralsTabPattern }))
		.or(page.getByRole('button', { name: closedReferralsTabPattern }))
		.first()

	await expect(openReferralsTab).toBeVisible()
	await expect(closedReferralsTab).toBeVisible()
}

export const verifyCaseListFiltersAreVisible = async (page: Page) => {
	const applyFiltersButton = page
		.getByRole('button', { name: /apply filters/i })
		.or(page.getByRole('link', { name: /apply filters/i }))
		.first()

	await expect(applyFiltersButton).toBeVisible()

	const filtersContainer = page
		.locator('form, aside, section')
		.filter({ has: page.getByRole('button', { name: /apply filters/i }) })
		.first()

	await expect(filtersContainer).toBeVisible()

	const filterControls = filtersContainer.locator('input, select, textarea')
	await expect(filterControls.first()).toBeVisible()
}

export const applyCaseListFilterAndVerifySubmission = async (page: Page) => {
	const applyFiltersButton = page.getByRole('button', { name: /apply filters/i }).first()
	const filtersContainer = page
		.locator('form, aside, section')
		.filter({ has: applyFiltersButton })
		.first()

	await expect(filtersContainer).toBeVisible()

	const textInputs = filtersContainer
		.locator('input[type="text"], input[type="search"], input:not([type])')
		.filter({ hasNot: filtersContainer.locator('[disabled]') })
	const selects = filtersContainer.locator('select')
	const checkboxes = filtersContainer.locator('input[type="checkbox"]')

	const initialUrl = page.url()

	if ((await textInputs.count()) > 0) {
		const firstTextInput = textInputs.first()
		const testValue = `e2e-filter-${Date.now()}`
		await firstTextInput.fill(testValue)
		await applyFiltersButton.click()

		await expect(page).toHaveURL(/case|caselist/i)
		await expect(firstTextInput).toHaveValue(testValue)
		return
	}

	if ((await selects.count()) > 0) {
		const firstSelect = selects.first()
		const candidateValue = await firstSelect
			.locator('option')
			.evaluateAll((options) => {
				for (const option of options as HTMLOptionElement[]) {
					const value = option.value?.trim()
					if (value) return value
				}
				return null
			})

		if (candidateValue) {
			await firstSelect.selectOption(candidateValue)
		}

		await applyFiltersButton.click()
		await expect(page).toHaveURL(/case|caselist/i)

		if (candidateValue) {
			await expect(firstSelect).toHaveValue(candidateValue)
		}
		return
	}

	if ((await checkboxes.count()) > 0) {
		const firstCheckbox = checkboxes.first()
		await firstCheckbox.check()
		await applyFiltersButton.click()
		await expect(page).toHaveURL(/case|caselist/i)

		const clearFiltersControl = page
			.getByRole('link', { name: /clear filters/i })
			.or(page.getByRole('button', { name: /clear filters/i }))
			.first()

		if (await clearFiltersControl.isVisible()) {
			await expect(clearFiltersControl).toBeVisible()
		} else {
			expect(page.url()).not.toBe(initialUrl)
		}
		return
	}

	throw new Error('No supported filter controls found to test filter functionality')
}
