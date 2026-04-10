import { test, expect } from '@playwright/test';
import {manageAndDeliverCommunityLogin} from "../steps/auth/login";

test('Signin to HMPPS auth service then navigate to Accredited Programmes home page', async ({ page }) => {
    await manageAndDeliverCommunityLogin(page)
})
