# HMPPS Accredited Programmes Manage And Deliver UI Tests
This repository contains automated E2E UI tests for the `hmpps-accredited-programmes-manage-and-deliver-ui` **`(Public UI)`** service. The tests are written in TypeScript and use the Playwright testing library.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository
2. Navigate to the project directory
```
cd hmpps-accredited-programmes-manage-and-deliver-e2e-tests
```
3. Install the dependencies:
```
npm ci
create .env file
.env
```
Update `.env` with below values
```
MANAGE_AND_DELIVER_URL=
HMPPS_COMMUNITY_AUTH_USERNAME=
HMPPS_COMMUNITY_AUTH_PASSWORD=
```

## Running the Tests
**All the below scpritps are in package.json**

To run the tests, use the following command:
```
npm run e2e_UI_test                -   To run all the tests on configure browsers
npm run e2e_UI_test_headed         -   To run all the tests on configure browsers in headed mode
npm run e2e_UI_test_chrome         -   To run all the tests on chrome browser
npm run e2e_UI_test_firefox        -   To run all the tests on firefox  browser
npm run e2e_UI_test_webkit         -   To run all the tests on webkit browser
```
## Running single test
To run a single test in headed mode use the below command
```
npx playwright test tests/signin.spec.ts --headed
```
## Supported Browsers: 
Chromium
Firefox
Webkit
