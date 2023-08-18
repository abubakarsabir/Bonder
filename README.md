 # Bonder


## Prerequisites

- [Node.js](https://nodejs.org/) (Version 14 or higher)
- [npm](https://www.npmjs.com/)

## Setup

1. Clone the repository:

    ```bash
    git clone https://path-to-your-repository/bonder.git
    cd bonder
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

## Running Tests

### Running tests for a specific browser:

You can specify which browser to use: `chromium`, `firefox`, or `webkit`.

```bash
npx playwright test --project=browser_name

npx playwright test --project=firefox

## Running a specific file
npx playwright test path/to/your/test-file.spec.js


## Additional Playwright Commands:
## Generating screenshots and trace:

You can capture screenshots or create a trace for debugging:
npx playwright test --screenshot-on-failure --trace
