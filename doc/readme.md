## Technology, tools and installation

### Overview
This application is built using web technologies HTML, JavaScript and CSS and is intended to run in any current browser. It's generally tested with the latest versions of Chrome, FireFox and Microsoft Edge.

This is an overview of the technologies and tools necessary to work with this project. More detailed howto/cheatsheets are available in the [doc/quickstartGuides](quickstartGuides) folder.

Speaking of folders, the documentation has the following folder structure

Folder|Description
------|------------
cordova | Files and information specific to running as a compiled native Android and/or iOS application.
firebase | Firebase is a service providing a hosted noSQL database and application hosting. They offer a free tier that is fully functional for development and production use.
javaRdbms | Relational Database Management System scripts for creating data structures to be used with Java/Jersey REST web service middle tier.
misc | A virtual rug for storing misc files.
mongo | Files containing support for using [MongoDB](https://mongodb.com/) (with a [NodeJS](https://nodejs.org/) server) as a backend.
offline | Information and files for performing offline storage. This will sense the browser losing/gaining a network connection and synchronizing offline data. [localForage](http://mozilla.github.io/localForage/) is used as the JavaScript/browser interface to offline data.
quickstartGuides | Short quickstart guides for the frameworks and tools used in this application. They contain the subset of information on each subject to get one started. Links to the source documentation is included in each guide.


### Tools and libraries
#### Install the following applications via their installer:

* [Java](http://oracle.com/technetwork/java/javase/downloads/index.html) is required for Netbeans and Elasticsearch (and WebLogic server). The latest JDK 8 is recommended.

* [Netbeans](https://netbeans.org/downloads/) is the Integrated Development Environment used for this project. Install the latest stable Java EE version. During the installation you will be given the option of installing Tomcat and Glassfish. This application doesn't require either program. For the Java/RDBMS stack we'll be discussing running in Oracle WebLogic Server.

* [Elasticsearch](https://elastic.co/downloads/elasticsearch) is a database and analytics engine. It's used in this application for data storage, application hosting and a REST web service interface.

* [git](https://git-scm.com/downloads) is used by this project. While one can click the GitHub `Download ZIP` button to get a non-version controlled copy of the project, I recommend learning [git](https://git-scm.com/doc).

* [NodeJS](https://nodejs.org/) provides the ability to run JavaScript programs at your Operating Systems command line. It also includes the Node Package Manager (npm) which is used to install several of the following supporting applications we'll be using. Download and install the latest stable release.

#### Install the following applications with npm:

* [Gulp](http://gulpjs.com/) is a task runner (like ant or make) that we'll use for building our client application, running tests and other tasks.
```
npm install -g gulp
```

* [Jasmine](http://jasmine.github.io/) is a JavaScript test framework.
```
npm install -g jasmine
```

* [Karma](http://karma-runner.github.io/) is a test runner for Jasmine..
```
npm install -g karma
```

* [Protractor](http://protractortest.org/) is an end to end (e2e) test framework for Angular applications. It will run/test your application in a real browser as a user would.
```
npm install -g protractor
```

#### Client application libraries
Client application libraries are included in the application by including their JavaScript, CSS and font files. These files are copied to the project (into a bower_components staging folder) with bower. We choose when to bring the updated versions into our application by copying them from the bower_components folder to our /web/lib folder.

* [AngularJS](https://angularjs.org/) is the core framework for this Single Page Application (SPA).
This application is using version 1.4.x of AngularJS. Angular v2 is a significant update scheduled for release in 2016. This application will be updated to Angular v2 sometime after its release. For now we can ignore Angular v2.

* [Bootstrap](http://getbootstrap.com/)  is the core UI framework for styling and widgets.
* cg-busy
* jquery
* moment
* ui-grid - includes pdfmake that can be directly used for generating our own PDF output.
* toaster

