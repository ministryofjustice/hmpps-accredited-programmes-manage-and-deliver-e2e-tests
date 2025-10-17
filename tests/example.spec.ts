import { test, expect } from '@playwright/test';
import {findAndReferLoginCommunity} from "../steps/auth/login";

test('Login and view the browse page as a community user', async ({ page }) => {
    await findAndReferLoginCommunity(page)
})
