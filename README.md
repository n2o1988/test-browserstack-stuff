# Testing Browserstack failure

## How to run
Make sure you have `node` and `yarn` installed globally.
Install dependencies:

```
yarn install
```

Run the tests, passing credentials:
```
BROWSERSTACK_USER=<...> BROWSERSTACK_KEY=<...> yarn test
```

## UPDATE: Issue fixed
The issue was fixed on Browserstack side on March 4th 2019.

## The problem
This simple mocha test demonstrate an issue with selenium-webdriver@3.6.0 (the latest stable release of the javascript bindings for Selenium WebDriver) and Browserstack when using Firefox and any version of Selenium > 3.6.0. 

Changing `browserstack.selenium_version` to `3.6.0` will make the test work. 

With target version 3.14.0, we get errors on both 
- stalenessOf
- sendKeys


### Example output
```
0 passing (18s)
  2 failing

  1) test
       sendKeys should work:
     WebDriverError: Could not convert 'text' to string
      at Object.checkLegacyResponse (node_modules/selenium-webdriver/lib/error.js:546:15)
      at parseHttpResponse (node_modules/selenium-webdriver/lib/http.js:509:13)
      at doSend.then.response (node_modules/selenium-webdriver/lib/http.js:441:30)
      at process._tickCallback (internal/process/next_tick.js:68:7)
  From: Task: WebElement.sendKeys()
      at mixin.schedule (node_modules/selenium-webdriver/lib/webdriver.js:807:17)
      at WebElement.schedule_ (node_modules/selenium-webdriver/lib/webdriver.js:2010:25)
      at WebElement.sendKeys (node_modules/selenium-webdriver/lib/webdriver.js:2174:19)
      at Context.it (test.js:52:17)
      at process._tickCallback (internal/process/next_tick.js:68:7)

  2) test
       stalenessOf should work:
     WebDriverError: The element reference of <a class="Fx4vi" href="/url?sa=t&rct=j&q=&esrc=s&source=webhp&cd=&ved=0ahUKEwi0zsuvxsXgAhVCaFAKHRNHCgIQ8awCCBI&url=https%3A%2F%2Fwww.google.com%2Fintl%2Fnl_nl%2Fpolicies%2Fprivacy%2F%3Ffg%3D1&usg=AOvVaw36lc6OfOvvRcG_2tCEHoGM"> is stale; either the element is no longer attached to the DOM, it is not in the current frame context, or the document has been refreshed
      at Object.checkLegacyResponse (node_modules/selenium-webdriver/lib/error.js:546:15)
      at parseHttpResponse (node_modules/selenium-webdriver/lib/http.js:509:13)
      at doSend.then.response (node_modules/selenium-webdriver/lib/http.js:441:30)
      at process._tickCallback (internal/process/next_tick.js:68:7)
  From: Task: WebElement.getTagName()
      at mixin.schedule (node_modules/selenium-webdriver/lib/webdriver.js:807:17)
      at WebElement.schedule_ (node_modules/selenium-webdriver/lib/webdriver.js:2010:25)
      at WebElement.getTagName (node_modules/selenium-webdriver/lib/webdriver.js:2205:17)
      at /Users/lfichera/personalsrc/browserstack-failure/node_modules/selenium-webdriver/lib/until.js:282:20
      at /Users/lfichera/personalsrc/browserstack-failure/node_modules/selenium-webdriver/lib/webdriver.js:938:14
      at TaskQueue.execute_ (node_modules/selenium-webdriver/lib/promise.js:3084:14)
      at TaskQueue.executeNext_ (node_modules/selenium-webdriver/lib/promise.js:3067:27)
      at asyncRun (node_modules/selenium-webdriver/lib/promise.js:2974:25)
      at /Users/lfichera/personalsrc/browserstack-failure/node_modules/selenium-webdriver/lib/promise.js:668:7
      at process._tickCallback (internal/process/next_tick.js:68:7)
  From: Task: <anonymous>
      at pollCondition (node_modules/selenium-webdriver/lib/promise.js:2195:19)
      at /Users/lfichera/personalsrc/browserstack-failure/node_modules/selenium-webdriver/lib/promise.js:2191:7
      at new ManagedPromise (node_modules/selenium-webdriver/lib/promise.js:1077:7)
      at ControlFlow.promise (node_modules/selenium-webdriver/lib/promise.js:2505:12)
      at /Users/lfichera/personalsrc/browserstack-failure/node_modules/selenium-webdriver/lib/promise.js:2190:22
      at TaskQueue.execute_ (node_modules/selenium-webdriver/lib/promise.js:3084:14)
      at TaskQueue.executeNext_ (node_modules/selenium-webdriver/lib/promise.js:3067:27)
      at asyncRun (node_modules/selenium-webdriver/lib/promise.js:2974:25)
      at /Users/lfichera/personalsrc/browserstack-failure/node_modules/selenium-webdriver/lib/promise.js:668:7
      at process._tickCallback (internal/process/next_tick.js:68:7)
  From: Task: Waiting element to become stale
      at scheduleWait (node_modules/selenium-webdriver/lib/promise.js:2188:20)
      at ControlFlow.wait (node_modules/selenium-webdriver/lib/promise.js:2517:12)
      at mixin.wait (node_modules/selenium-webdriver/lib/webdriver.js:934:29)
      at Context.it (test.js:62:18)
      at process._tickCallback (internal/process/next_tick.js:68:7)
```
