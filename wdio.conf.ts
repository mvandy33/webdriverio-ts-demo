import * as allureCmd from 'allure-commandline';
import * as fs from 'fs-extra';

const rawOutputPath = `./allure-results/${process.env.REPORT ?? 'debug'}`;
const generatedOutputPath = `./allure-report/${process.env.REPORT ?? 'debug'}`;

export const config = {
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: './tsconfig.json',
            transpileOnly: true
        }
    },
    specs: [
        '**/*.e2e.ts'
    ],
    exclude: [

    ],
    maxInstances: process.env.HEADLESS === 'true' ? 10 : 1,
    capabilities: [{
        browserName: 'chrome',
        acceptInsecureCerts: true,
        pageLoadStrategy: 'eager',
        "goog:chromeOptions": {
            args: process.env.HEADLESS === 'true' ? [
                '--headless',
                '--disable-gpu',
                '--no-sandbox',
                '--log-level=3',
                '--ignore-certificate-errors',
                '--ignore-ssl-errors'
            ] : [
                '--log-level=3'
            ]
        }
    }],
    logLevel: 'error',
    bail: 0,
    baseUrl: 'https://www.baseball-reference.com/',
    connectionRetryTimeout: 60000,
    connectionRetryCount: 3,
    framework: 'mocha',
    specFileRetries: parseInt(process.env.RETRIES) ?? 0,
    specFileRetriesDeferred: true,
    services: [
        ['chromedriver', {
            args: ['--silent']
        }]
    ],
    reporters: [
        'spec',
        [
            'allure',
            {
                outputDir: rawOutputPath,
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: false
            }
        ]
    ],
    mochaOpts: {
        bail: process.env.headless === 'true' ? true : false,
        timeout: '20000'
    },
    onPrepare: () => {
        reportInit();
    },
    afterTest: async () => {
        await browser.takeScreenshot();
    },
    onComplete: async () => {
        await generateAllure();
    }
}

function reportInit() {
    if (fs.existsSync(rawOutputPath)) {
        fs.emptyDirSync(rawOutputPath);
    } else {
        fs.mkdirSync(rawOutputPath, { recursive: true });
    }
    if (fs.existsSync(`${generatedOutputPath}/history`)) {
        fs.mkdirSync(`${rawOutputPath}/history`);
        fs.copySync(`${generatedOutputPath}/history`, `${rawOutputPath}/history`);
    }
}

function generateAllure() {
    const generation = allureCmd.default(['generate', rawOutputPath, '-o', generatedOutputPath, '-c']);
    return new Promise((resolve, reject) => {
        generation.on('exit', (exitCode: number) => {
            console.log(`Report generation complete with code ${exitCode}`);
            resolve(exitCode);
        });
        generation.on('error', (error: Error) => {
            reject(error);
        });
    });
}