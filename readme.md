# Nightwatch.js Example

## Who this is for

This is a simple but verbose guide on setting up Nightwatch with the traditional 'manual' tester in mind.

I know when I first broke out into using automation to improve my workflows I found certain concepts difficult and was a bit afraid to ask. As such I go into some detail about common things that aren't strictly related to Nightwatch.

## If you feel new

I try to do everything inside VSCode which is my current IDE of choice available [here](https://code.visualstudio.com/). To create a folder you can do it simply by adding it in your operating system, then open VSCode, go to open folder and open the folder you want to use. To use the console/terminal available in VSCode you should be able to go the the top menu bar (file, edit etc) click terminal and then new terminal. As you learn more you might create files and folders through the console/terminal and do clever and time saving things but in the mean time don't worry too much. If you have any feedback on making this guide better then please drop me a message on **[Twitter](https://twitter.com/steveycee?lang=en)** 🐦

_If you feel more confident and you just want to start with this as a boiler plate then by all means **clone the repo**. All the modules you need are included in the `package.json` if you feel comfortable with that then just go to your command line and type `npm i` to install all the node modules. If not and you want to code along yourself then the following guide will hopefuly help._

## Initial set up

- **Install node** from [here](https://nodejs.org/en/download/) (latest stable should be fine for most users).
- Once installed **go to your command line and type node -v** if you get a version number then its installed properly
- **Create new folder**
- **Open your command line at your folders location and type** `git init`
- This has initialised and empty git repo for you (if you want to at this stage push your repo)
- **Then in your command line run** `npm init -y` which will set up some other bits for you including a default `package.json` which you'll make use of below.

This is pretty standard and reusable for alot of your projects.

## Setting up Nightwatch.js

### Installing

- **Install Nightwatch** by running this:

  `npm install nightwatch --save-dev`

### Setting up config files

I'll use language like module and submodule in dealing with Nightwatches config file below. This just means something with a `title{stuff:things},`, they will probably be split across multiple lines and may have other modules (nested) inside them and may look like this:

`title{ stuff: things, morestuff: anotherThing subtitle{ submodule:orNestedThing } }`

So if you're struggling you can take a look at the repo and copy the config file in there.

- **Go to package.json and change this**:

  `"scripts": { "test": "echo \"Error: no test specified\" && exit 1" },`

- **To this**

  `"scripts": { "test": "nightwatch" },`

- You need to **set up configuration file next by running the following**.

  `npm test`

- This should immediately fail but it should create a dummy config file for you. We need to make some changes though.

- **Go to the config file and update with the following**:

  - **Edit the** `webdriver` **module in the config to be like**:

    ` webdriver: { "start_process": true, "server_path": "node_modules/.bin/chromedriver", "port": 9515 },`

  - **Edit the** `src_folder` **module in the config to be like**

    `src_folders: ["tests"],`

- You'll no doubt notice that you have defined a source folder for your tests that you don't have yet so make sure you **create the folder** and you might as well create a .js file in there called firstTest.js as well.

Thats the tests problem addressed, now lets deal with our lacking Chromedriver:

- Run the following:

  `npm i chromedriver --save-dev`

- All things being well that should have installed Webdriver.

- **Create a .gitignore file** in the root of your directory and pop in node_modules so you dont end up commiting the universe in nodemodules to Github. If you're in VS Code it might offer to sort this for you.

- **Edit the** `default` submodule inside test settings **in the config to be like**

  ```
  default: {
  disable_error_log: false,
  launch_url: 'https://nightwatchjs.org',

        screenshots: {
            enabled: false,
            path: 'screens',
            on_failure: true
        },

        desiredCapabilities: {
            browserName : 'chrome'
        },

        webdriver: {
            start_process: true,
            server_path: (Services.chromedriver ? Services.chromedriver.path : 'node_modules/.bin/chromedriver')
        }
        }

  ```

- Finally go back to your console and **run** `npm test`

Did you see the browser flash up and disappear really quickly? congratulations then, everything is working. You might also see something like this in your console

```
[First Test] Test Suite
=======================
\ Connecting to localhost on port 9515...

i Connected to localhost on port 9515 (2620ms).
  Using: chrome (87.0.4280.66) on Windows platform.
```

As long as there's no red then everythings worked and you're now ready to start writing a test.

## Basic basic basic test

3 steps, the skeleton, the basic frame for the test and the test itself.

### First, the skeleton

```
module.exports = {
}
```

### Next layer

```
module.exports = {
    'My first test case'(browser) {
    }
}
```

### Final layer for a working test (assuming I've not changed my website)

```
module.exports = {
    'My first test case'(browser) {
        browser
        .url('http://steveycee.com/')
        .waitForElementVisible('.header-head')
        .assert.containsText('.header-head', '../steveycee/..');
    }
}
```

The test above will go to a website defined in the brackets after where it says `.url`.

Then it will look for an selector\* defined in the brackets after where it says `.waitForElementVisible`.

Finally it will test that the text is correct in a selector that we define after it says `assert.containsText`. Note that this has 2 parameters, both the element and the text we expect. If you're coming from a framework like Cypress you might wonder why when we have already found the element in the step above. This however is not how Nightwatch works.

\*Selector could mean a number of things but it will commonly be a class which might look like this `.menu` or an ID which theoretically will be more unique and might look like this `#header` note the `.` means class and the `#` means ID.

If the test passes you should see something like this:

```
i Connected to localhost on port 9515 (2536ms).
  Using: chrome (87.0.4280.66) on Windows platform.

Running:  My first test case

√ Element <.header-head> was visible after 25 milliseconds.
√ Testing if element <.header-head> contains text '../steveycee/..' (32ms)

OK. 2 assertions passed. (472ms)
```

Note it says 2 assertions passed, but you passed it 3 things to do? Going to a URL does not qualify as an assertion because you aren't checking anything. The final 2 things though are checks that can pass or fail and as such are picked up as assertions.

## Acknowledgements and useful resources

I used the following [YouTube video from Coding with Dom](https://www.youtube.com/watch?v=Q8jIlG6WXvI) as a basis for this example but decided to write a guide below with a bit of information that I know I'd have liked earlier in my career. If you want to get it straight from Nightwatch then click here for their [getting started guide](https://nightwatchjs.org/gettingstarted/) but keep in mind they assume a little bit of knowledge that I don't below, this guide is intended for people who are newer to Software Testing/Quality Assurance/Development to get a bit of a leg up.
