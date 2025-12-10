import { expect, type Page } from '@playwright/test'
import { getConfig } from '../../appConfig'

const appConfig = getConfig()

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
export type WhenWillGroupRunData =
    { dayOfWeekCheckbox: DayOfWeek, hour: number | null, minute: number | null, ampm: 'am' | 'pm' | null }[]
    | null
export type CohortRadioOption =
    'General'
    | 'General offence, learning disabilities and challenges (LDC)'
    | 'Sexual offence'
    | 'Sexual offence, learning disabilities and challenges (LDC)'
export type SexRadioOption = 'Male' | 'Female' | 'Mixed'

export const goToGroupListPage = async (page: Page) => {
    await page.goto(appConfig.MANAGE_AND_DELIVER_URL + '/groups/not-started')
    await expect(page).toHaveURL(/.*groups\/not-started/)
}

export const goToCreateAGroupPageFromGroupListPage = async (page: Page) => {
    await page.getByRole('button', {name: 'Create a group'}).click()
    await expect(page).toHaveURL(/.*group\/create-a-group\/create-group/)
}

export const goToCreateAGroupCodePageFromCreateAGroupPage = async (page: Page) => {
    await page.getByRole('button', {name: 'Start'}).click()
    await expect(page).toHaveURL(/.*group\/create-a-group\/create-group-code/)
}

export const enterAndSubmitGroupCode = async (page: Page) => {
    const randomGroupCode = 'e2e-test-group-code-' + Math.floor(Math.random() * 1000000)
    await page.getByRole('textbox').fill(randomGroupCode)
    await page.getByRole('button', {name: 'Continue'}).click()
    await expect(page).toHaveURL(/.*group\/create-a-group\/group-start-date/)
}

export const enterAndSubmitGroupStartDate = async (page: Page, date: string) => {
    await page.getByRole('textbox').fill(date)
    await page.getByRole('button', {name: 'Continue'}).click()
    await expect(page).toHaveURL(/.*group\/create-a-group\/group-days-and-times/)
}

export const enterAndSubmitWhenWillGroupRunData = async (page: Page, data: WhenWillGroupRunData) => {
    for (const {dayOfWeekCheckbox, hour, minute, ampm} of data) {
        await page.getByRole('checkbox', {name: dayOfWeekCheckbox}).check()
        await page.locator(`#${dayOfWeekCheckbox.toLowerCase()}-hour`).fill(hour.toString())
        await page.locator(`#${dayOfWeekCheckbox.toLowerCase()}-minute`).fill(minute.toString())
        await page.locator(`#${dayOfWeekCheckbox.toLowerCase()}-ampm`).selectOption(ampm)
    }
    await page.getByRole('button', {name: 'Continue'}).click()
    await expect(page).toHaveURL(/.*group\/create-a-group\/group-cohort/)
}

export const selectAndSubmitCohortRadioOption = async (page: Page, radioOption: CohortRadioOption) => {
    await page.getByRole('radio', {name: radioOption}).check()
    await page.getByRole('button', {name: 'Continue'}).click()
    await expect(page).toHaveURL(/.*group\/create-a-group\/group-sex/)
}

export const selectAndSubmitSexRadioOption = async (page: Page, radioOption: SexRadioOption) => {
    await page.getByRole('radio', {name: radioOption}).check()
    await page.getByRole('button', {name: 'Continue'}).click()
    await expect(page).toHaveURL(/.*group\/create-a-group\/group-probation-delivery-unit/)
}

export const enterAndSubmitPdu = async (page: Page, pdu: string) => {
    await page.locator('#create-group-pdu').fill(pdu)
    await page.keyboard.press('Enter');
    await page.getByRole('button', {name: 'Continue'}).click()
    await expect(page).toHaveURL(/.*group\/create-a-group\/group-delivery-location/)
}

export const selectAndSubmitDeliveryLocation = async (page: Page, radioOption: string) => {
    await page.getByRole('radio', {name: radioOption}).check()
    await page.getByRole('button', {name: 'Continue'}).click()
    await expect(page).toHaveURL(/.*group\/create-a-group\/group-facilitators/)
}

export const enterAndSubmitGroupFacilitators =
    async (page: Page, treatmentManager: string | null,
           facilitators: string[] | null,
           coverFacilitators: string[]
    ) => {
        await page.locator('#create-group-treatment-manager').fill(treatmentManager)
        await page.keyboard.press('Enter');

        await addFacilitator(page, facilitators, 'create-group-facilitator', 'create-group-facilitator-select', 'Add another facilitator')
        await addFacilitator(page, coverFacilitators, 'create-group-cover-facilitator', 'create-group-cover-facilitator-select', 'Add another cover facilitator')

        await page.getByRole('button', {name: 'Continue'}).click()
        await expect(page).toHaveURL(/.*group\/create-a-group\/group-review-details/)
}

export const addFacilitator = async (page: Page, facilitators: string[], idForIndex0: string, baseIdForOthers: string, buttonText: string) => {
    for (const facilitator of facilitators) {
        const index = facilitators.indexOf(facilitator);
        if (index === 0) {
            await page.locator(`#${idForIndex0}`).fill(facilitator)
        } else {
            await page.getByRole('button', {name: buttonText}).click()
            await page.locator(`#${baseIdForOthers}${index}`).fill(facilitator)
        }
        await page.keyboard.press('Enter')
    }
}

export const verifyCheckAnswersPageContent =
    async (page: Page, date: string, dayAndTime: string[], cohort: string, sex: string, pdu: string, deliveryLocation: string, treatmentManager: string, facilitators: string[], coverFacilitators: string[]) => {
        await expect(page.locator('dt:has-text("Group Code") + dd')).toContainText('e2e-test-group-code')
        await expect(page.locator('dt:has-text("Date") + dd')).toContainText(date)
        await expect(page.locator('dt:has-text("Day and time") + dd')).toContainText(dayAndTime.join(' '))
        await expect(page.locator('dt:has-text("Cohort") + dd')).toContainText(cohort)
        await expect(page.locator('dt:has-text("Sex") + dd')).toContainText(sex)
        await expect(page.locator('dt:has-text("PDU") + dd')).toContainText(pdu)
        await expect(page.locator('dt:has-text("Delivery Location") + dd')).toContainText(deliveryLocation)
        await expect(page.locator('dt:has-text("Treatment Manager") + dd')).toContainText(treatmentManager)
        await expect(page.locator('dt:has-text("Facilitators") + dd').first()).toContainText(facilitators.join(' '))
        await expect(page.locator('dt:has-text("Cover facilitators") + dd').first()).toContainText(coverFacilitators.join(' '))
    }

export const submitCheckYourAnswers = async (page: Page) => {
    await page.getByRole('button', {name: 'Create this group'}).click()
    await expect(page).toHaveURL(/.*groupCreated/)
}

