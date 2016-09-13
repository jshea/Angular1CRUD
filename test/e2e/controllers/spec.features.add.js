/*
 * Test the UI for the AngularCRUD application. These are the "Happy Paths", everything
 * working correctly. No data validation errors.
 */

/* global browser, by, element, expect */

describe("AngularCRUD adding users from a data file", function() {

   var testContacts = require('./spec.features.add.json');

   /*
    * These optional functions run before and after this test suite. Use
    * them to setup (initialize data) and teardown (clean up after ourselves)
    * for this full test suite.
    */

   // Give us a known starting state of our test data
   beforeAll(function() {
      // browser.get("http://localhost:7001/angularcrud/#/load");
      browser.get("https://angularcrudbootstrap.firebaseapp.com/#/load");
   });
   // Leave the app with the original test data. Removes data
   // added in the tests in this file.
   afterAll(function() {
      // browser.get("http://localhost:7001/angularcrud/#/load");
      browser.get("https://angularcrudbootstrap.firebaseapp.com/#/load");
   });

   /*
    *  Setup - this runs before each test (each it()). This calls
    *  the load url so each test starts at the same place with the
    *  same initial data.
    */
   beforeEach(function() {
      // browser.get("http://localhost:7001/angularcrud/#/list");
      browser.get("https://angularcrudbootstrap.firebaseapp.com/#/list");
   });

   /*
    *  Tear-down - runs after each test
    */
   afterEach(function() {});


   /*
    * Add a person from a data file
    */
   it ("Add contacts from a data file", function() {

      for (var i = 0; i < testContacts.length; i++) {
         // Click the New Contact link
         element(by.linkText('New Contact')).click();

         // Add button is present and disabled (blank contact is missing required fields)
         expect(element(by.id("btnAdd")).isPresent()).toBe(true);
         expect(element(by.id("btnAdd")).isEnabled()).toBe(false);

         // Fill in the form's required fields
         element(by.id("firstName")).clear().sendKeys(testContacts[i].firstName);
         element(by.id("lastName")).clear().sendKeys(testContacts[i].lastName);

         // Add button is enabled - required fields are populated
         expect(element(by.id("btnAdd")).isEnabled()).toBe(true);

         // Fill in the rest of the fields
         element(by.id("street")).clear().sendKeys(testContacts[i].address.street);
         element(by.id("city")).clear().sendKeys(testContacts[i].address.city);
         element(by.id("state")).clear().sendKeys(testContacts[i].address.state);
         element(by.id("zip")).clear().sendKeys(testContacts[i].address.zip);
         element(by.id("homePhone")).clear().sendKeys(testContacts[i].homePhone);
         element(by.id("mobile")).clear().sendKeys(testContacts[i].mobile);
         element(by.id("email")).clear().sendKeys(testContacts[i].email);
         element(by.id("website")).clear().sendKeys(testContacts[i].website);

         // Click add
         element(by.id("btnAdd")).click();
         // The toast is in the way! Wait for it to go away.
         browser.sleep(3000);
      }

      // Verify the new contacts are in the list
      browser.get("http://localhost:7001/angularcrud/#/list");

      rows = element.all(by.repeater("person in $data")).all(by.id("cellName"));
      expect(rows.getText()).toContain("lastname1, firstname1");
      expect(rows.getText()).toContain("lastname2, firstname2");
      expect(rows.getText()).toContain("lastname3, firstname3");
      expect(rows.getText()).toContain("lastname4, firstname4");
      expect(rows.getText()).toContain("lastname5, firstname5");
   });

});