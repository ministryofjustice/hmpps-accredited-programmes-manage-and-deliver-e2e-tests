import { test, expect } from '@playwright/test';
import {manageAndDeliverCommunityLogin} from "../steps/auth/login";

test('Login and view the browse page as a community user', async ({ page }) => {
    await manageAndDeliverCommunityLogin(page)
})
