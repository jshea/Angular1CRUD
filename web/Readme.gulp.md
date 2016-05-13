# Gulp Directory

## Setup

### Installing Gulp

Install gulp from npm by running the following.

    `npm install -g gulp`

### Installing Gulp packages.

The packages can be installed simply with the `package.json` and running.

    npm install

However, this will install all the packages locally. Alternatively, they can be 
installed globally with the `-g` option. Then the packages can be
available to gulp by executing the following command:

    `npm link <package-name>`

Of course, the disadvantage is that they packages must be added singly.

### PhantomJS setup

PhantomJS is an application for running browser web tests outside the
browser in a "headless" manner. It is used in gulp for running the
Jasmine tests from the command line.

For running the Jasmine tests outside of the browser, the PhantomJS
executable application must be available.

Download the [PhantomJS](http://phantomjs.org/) application.

Unzip the PhantomJS installation. Add PhantomJS to the machine's `PATH` system
variable. On Windows, this is done, by adding a semicolon ";" after the
current PATH value and appending the path to the directory where the
`phantomjs.exe` file is. On Mac, it can be merely placed in the `Applications`
folder.

### Protractor Setup

In order to get Protractor to work you have to install Selenium using the
Protractor module in gulp/node_modules.

Assuming you have already done npm install. Simply navigate to
gulp/node_modules/protractor/bin and type:

    'node webdriver-manager update'

This will give you the Selenium .jar file locally so Gulp can run Protractor
tests without you having to start the Selenium server manually.

## Running

Gulp can be run simply by using the command:

    `gulp`
