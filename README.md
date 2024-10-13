# webdriverio-ts-demo
A basic automated test project to demonstrate WebdriverIO/Typescript/Node capabilities

This project executes a simple end-to-end test scenario against the website baseball-reference.com, validating some aspects of search functionality and data presentation. The purpose is to demonstrate an elegant, scalable implementation of the Page Object design pattern for use in automated testing.

#### Current Notes:
- With Chrome version 129 there is some flakiness due to tensorflow errors that occasionally cause list operations to hang. Automatic test retries should handle this and provide an accurate result.

### Run Instructions
1. Ensure the latest version of Chrome is installed on your machine
2. Download Node.js: https://nodejs.org/
3. Clone or fork the repository
4. In a terminal, navigate to the project directory, and run the command `npm install`
5. To run the tests, execute one of the following:
    - `npm run start` - this will execute the tests sequentially in a visual browser instance
    - `npm run start:headless` - this will execute tests in parallel in headless (non-visual) browser instances
        - _Note that a bug in chrome version 129 will display a blank browser window while running headless mode_
    - Both run commands will execute up to 1 retry per scenario if a failure occurs on the first run

### View the Report
- To view the allure report, simply run the command `npm run report`
- The report will be served to port 9999 and will open a browser window at the report directory
- Select the "test" folder to view reports for standard (non-debug) test runs
- _Note that you only need to run the report command once - the report will update automatically after subsequent test runs._

### Debug Mode
- A debug definition is included for VSCode debugging in launch.json
- In VSCode, simply view the desired spec file - `<spec-name>.e2e.ts` - and start the debugger
- Reports generated while debugging will be available in the "debug" folder of the report directory

### Feedback is Greatly Appreciated!
I have so far only had the opportunity to run this project on my (Windows) machine. In the future, I will plan to integrate Docker to provide stability across platforms. However, in the meantime, feel free to create an issue in this repo with any bugs, questions, or suggestions - I am always looking for new ways to learn and improve!