import webdriver from 'selenium-webdriver';
import { HttpClient, Request } from 'selenium-webdriver/http';

describe('test', function() {
  const { By, until } = webdriver;
  let driver;
  this.timeout(30000);

  before('Browserstack setup', async () => {
    const { BROWSERSTACK_USER, BROWSERSTACK_KEY } = process.env;
    const capabilities = {
      browserName: 'firefox',
      'browserstack.user': BROWSERSTACK_USER,
      'browserstack.key': BROWSERSTACK_KEY,
      project: 'Test FF failure',
      name: 'Firefox latest',
      build: `Lambo test: ${Math.random()}`,
      'browserstack.selenium_version': '3.14.0',
      os: 'OS X',
      os_version: 'High Sierra',
      'browserstack.captureCrash': true,
      'browserstack.console': 'verbose',
      'browserstack.debug': true,
      'browserstack.networkLogs': false,
      resolution: '1920x1080',
    };

    driver = await new webdriver.Builder()
      .usingServer('http://hub.browserstack.com/wd/hub')
      .withCapabilities(capabilities)
      .build();

    const session = await driver.getSession();
    const sessionId = session.getId();

    const response = await new HttpClient(
      `https://${BROWSERSTACK_USER}:${BROWSERSTACK_KEY}@www.browserstack.com`
    ).send(new Request('get', `/automate/sessions/${sessionId}.json`));

    const { browser_url, public_url } = JSON.parse(
      response.body
    ).automation_session;
    console.log('Browserstack internal url', browser_url);
    console.log('Browserstack public url', public_url);
  });

  it('sendKeys should work', async () => {
    await driver.get('https://www.google.com');
    const input = await driver.wait(
      until.elementLocated(By.css('input[name="q"]'))
    );
    await input.sendKeys('Something');
    // this should just work, instead it fires a "Could not convert 'test' to string" error.
  });

  it('stalenessOf should work', async () => {
    await driver.get('https://www.google.com');
    const footerLink = await driver.wait(
      until.elementLocated(By.css('.fbar a[href]'))
    );
    await footerLink.click();
    await driver.wait(until.stalenessOf(footerLink), 10000);
    // this should just work, instead it fires the following error:
    // " WebDriverError: The element reference of <input name="btnI" type="submit"> is stale; either the element is no longer attached to the DOM, it is not in the current frame context, or the document has been refreshed"
  });

  after(() => {
    return driver.quit();
  });
});
