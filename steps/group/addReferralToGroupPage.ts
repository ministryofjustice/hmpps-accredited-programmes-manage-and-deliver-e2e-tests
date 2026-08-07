import { expect, type Page } from "@playwright/test";

export const goToGroupDetailsPage = async (page: Page) => {
  await page
    .getByRole('link', { name: /e2e-test-group-code-/ })
    .first()
    .click();

  await expect(page).toHaveURL(/\/group\/.*\/group-details$/);
};

export const goToAllocationsAndWaitlistPage = async (page: Page) => {
  await page.getByText('Allocations and waitlist').click();
  await expect(page).toHaveURL(/\/group\/[0-9a-f-]+\/allocations$/);

  await page.locator('a[href$="/waitlist"]').click();
  await expect(page).toHaveURL(/\/group\/[0-9a-f-]+\/waitlist$/);
};


export const selectReferralOnWaitlistPage = async (
  page: Page,
  workerIndex: number
  ) => {
  const referrals = page.locator('input[type="radio"][name="add-to-group"]');

  const count = await referrals.count();

  if (count === 0) {
    throw new Error('No referrals available on waitlist');
  }

  // Pick a different referral for each worker
  const index = workerIndex % count;

  await referrals.nth(index).check();
  await page.getByRole('button', { name: 'Add to group' }).click();
};

export const addReferralToGroupOnAddToGroupPage = async (page: Page) => {
  await page.locator('input[type="radio"][name="add-to-group"][value="yes"]').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page).toHaveURL(/\/[0-9a-f-]+\/[0-9a-f-]+\/scheduled-status-details$/);
};

export const addScheduledStatusDetails = async (page: Page) => {
  await page.locator('#additional-details').fill('Status change to schedule');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page).toHaveURL(/\/group\/[0-9a-f-]+\/allocations\?message=.*/);
};

export const verifyMessageAfterReferralAddedToGroup = async (page: Page) => {
  await expect(page).toHaveURL(/\/group\/[0-9a-f-]+\/allocations\?message=.*/);
  await expect(page.locator('.moj-alert__content')).toHaveText(
    /^.+ was added to this group\. Their referral status is now Scheduled\.$/
  );

};