/*
 * Test the UI for the AngularCRUD application. This tests the Add/Edit
 * screen elements that have special validations. They either are required,
 * have a min and/or max length, use html5 special text inputs (email, url)...
 */

/* global browser, by, element, expect, protractor */

describe("AngularCRUD form validation", function() {

   /*
    * These optional functions run before and after this test suite. Use then to setup
    * (initialize data) and teardown (clean up after ourselves) for this full test suite.
    */
   beforeAll(function() {});
   afterAll(function() {});

   /*
    *  Setup - this runs before each test (each it()). This calls
    *  the load url so each test starts at the same place with the
    *  same initial data.
    */
   beforeEach(function() {
      // Return to the entry page
      // browser.get("http://localhost:7001/angularcrud/");
      browser.get("https://angularcrudbootstrap.firebaseapp.com/");

      // Click the New Contact link
      element(by.linkText('New Contact')).click();
   });

   /*
    *  Tear-down - runs after each test
    */
   afterEach(function() {});


   /*
    * Test the firstName field validations
    */
   it ("firstName validations", function() {
      // Get a handle to the edit screen elements
      var firstName = element(by.id("firstName"));

      /*   Validate initial state   */

      // Verify the field is present
      expect(firstName.isPresent()).toBe(true);

      // Check presence of error messages
      expect(element(by.id("firstNameErrorRequired")).isPresent()).toBe(false);
      expect(element(by.id("firstNameErrorMinLength")).isPresent()).toBe(false);
      expect(element(by.id("firstNameErrorMaxLength")).isPresent()).toBe(false);

      // Add button is disabled as this is a blank contact
      expect(element(by.id("btnAdd")).isEnabled()).toBe(false);

      /*   Fill in a value that is too short   */

      firstName.clear().sendKeys("1");
//      browser.pause();
//      browser.sleep(1000);

      // Check presence of error messages
      expect(element(by.id("firstNameErrorRequired")).isPresent()).toBe(false);
      expect(element(by.id("firstNameErrorMinLength")).isPresent()).toBe(true);
      expect(element(by.id("firstNameErrorMaxLength")).isPresent()).toBe(false);

      // Add button is disabled as this is an invalid contact
      expect(element(by.id("btnAdd")).isEnabled()).toBe(false);

      /*   Fill in a value that is too long   */

      firstName.clear().sendKeys("1234567890123456789012345");

      // Check presence of error messages
      expect(element(by.id("firstNameErrorRequired")).isPresent()).toBe(false);
      expect(element(by.id("firstNameErrorMinLength")).isPresent()).toBe(false);
      expect(element(by.id("firstNameErrorMaxLength")).isPresent()).toBe(true);

      // Add button is disabled as this is an invalid contact
      expect(element(by.id("btnAdd")).isEnabled()).toBe(false);

      /*   Blank value and dirty, field should have the "required" message   */

      firstName.clear().sendKeys("");

      // Check presence of error messages
      expect(element(by.id("firstNameErrorRequired")).isPresent()).toBe(true);
      expect(element(by.id("firstNameErrorMinLength")).isPresent()).toBe(false);
      expect(element(by.id("firstNameErrorMaxLength")).isPresent()).toBe(false);

      // Add button is disabled as this is a blank contact
      expect(element(by.id("btnAdd")).isEnabled()).toBe(false);

   });


   /*
    * Test the lastName field validations
    */
   it ("lastName validations", function() {
      // Get a handle to the edit screen elements
      var lastName = element(by.id("lastName"));

      /*   Validate initial state   */

      // Verify the field is present
      expect(lastName.isPresent()).toBe(true);

      // Check presence of error messages
      expect(element(by.id("lastNameErrorRequired")).isPresent()).toBe(false);
      expect(element(by.id("lastNameErrorMinLength")).isPresent()).toBe(false);
      expect(element(by.id("lastNameErrorMaxLength")).isPresent()).toBe(false);

      // Add button is disabled as this is a blank contact
      expect(element(by.id("btnAdd")).isEnabled()).toBe(false);

      /*   Fill in a value that is too short   */

      lastName.clear().sendKeys("1");

      // Check presence of error messages
      expect(element(by.id("lastNameErrorRequired")).isPresent()).toBe(false);
      expect(element(by.id("lastNameErrorMinLength")).isPresent()).toBe(true);
      expect(element(by.id("lastNameErrorMaxLength")).isPresent()).toBe(false);

      // Add button is disabled as this is an invalid contact
      expect(element(by.id("btnAdd")).isEnabled()).toBe(false);

      /*   Fill in a value that is too long   */

      lastName.clear().sendKeys("1234567890123456789012345");

      // Check presence of error messages
      expect(element(by.id("lastNameErrorRequired")).isPresent()).toBe(false);
      expect(element(by.id("lastNameErrorMinLength")).isPresent()).toBe(false);
      expect(element(by.id("lastNameErrorMaxLength")).isPresent()).toBe(true);

      // Add button is disabled as this is an invalid contact
      expect(element(by.id("btnAdd")).isEnabled()).toBe(false);

      /*   Blank value and dirty, field should have the "required" message   */

      lastName.clear().sendKeys("");

      // Check presence of error messages
      expect(element(by.id("lastNameErrorRequired")).isPresent()).toBe(true);
      expect(element(by.id("lastNameErrorMinLength")).isPresent()).toBe(false);
      expect(element(by.id("lastNameErrorMaxLength")).isPresent()).toBe(false);

      // Add button is disabled as this is a blank contact
      expect(element(by.id("btnAdd")).isEnabled()).toBe(false);
   });



   /*
    * Test the state field validations
    */
   it ("state validations", function() {
      // Initialize this contact with the required fields
      element(by.id("firstName")).sendKeys("Test");
      element(by.id("lastName")).sendKeys("User");

      // Add button is enabled as this is a valid contact
      expect(element(by.id("btnAdd")).isEnabled()).toBe(true);

      // Get a handle to the edit screen elements
      var state = element(by.id("state"));

      // Verify the field is present
      expect(state.isPresent()).toBe(true);

      // Fill in a value that is too short
      state.clear().sendKeys("1");
      browser.sleep(500);
      expect(element(by.id("stateErrorMinLength")).isPresent()).toBe(true);
      expect(element(by.id("stateErrorMaxLength")).isPresent()).toBe(false);

      // Add button is disabled as this is not a valid contact
      expect(element(by.id("btnAdd")).isEnabled()).toBe(false);

      // Fill in a value that is too long
      state.clear().sendKeys("12345");
      browser.sleep(500);     // Some tests seem to run faster than the error message processing
      expect(element(by.id("stateErrorMinLength")).isPresent()).toBe(false);
      expect(element(by.id("stateErrorMaxLength")).isPresent()).toBe(true);

      // Add button is disabled as this is not a valid contact
      expect(element(by.id("btnAdd")).isEnabled()).toBe(false);
   });


   /*
    * Test the state field validations
    */
   it ("zip validations", function() {
      // Initialize this contact with the required fields
      element(by.id("firstName")).sendKeys("Test");
      element(by.id("lastName")).sendKeys("User");

      // Add button is enabled as this is a valid contact
      expect(element(by.id("btnAdd")).isEnabled()).toBe(true);

      // Get a handle to the edit screen elements
      var zip = element(by.id("zip"));

      // Verify the field is present
      expect(zip.isPresent()).toBe(true);

      // Fill in a value that is too short
      zip.clear().sendKeys("1");
      browser.sleep(500);
      expect(element(by.id("zipErrorMinLength")).isPresent()).toBe(true);
      expect(element(by.id("zipErrorMaxLength")).isPresent()).toBe(false);

      // Add button is disabled as this is not a valid contact
      expect(element(by.id("btnAdd")).isEnabled()).toBe(false);

      // Fill in a value that is too long
      zip.clear().sendKeys("123456");
      browser.sleep(500);
      expect(element(by.id("zipErrorMinLength")).isPresent()).toBe(false);
      expect(element(by.id("zipErrorMaxLength")).isPresent()).toBe(true);

      // Add button is disabled as this is not a valid contact
      expect(element(by.id("btnAdd")).isEnabled()).toBe(false);
   });


   /*
    * Test the email field validations
    */
   it ("email validations", function() {
      // Initialize this contact with the required fields
      element(by.id("firstName")).sendKeys("Test");
      element(by.id("lastName")).sendKeys("User");

      // Add button is enabled as this is a valid contact
      expect(element(by.id("btnAdd")).isEnabled()).toBe(true);

      // Get a handle to the edit screen elements
      var email = element(by.id("email"));

      // Verify the field is present
      expect(email.isPresent()).toBe(true);

      // Fill in a value that is valid
      email.clear().sendKeys("fred@flintstone.com");
      browser.sleep(500);
      expect(element(by.id("emailError")).isPresent()).toBe(false);

      // Add button is disabled as this is not a valid contact
      expect(element(by.id("btnAdd")).isEnabled()).toBe(true);

      // Fill in a value that is invalid
      email.clear().sendKeys("fredflintstone.com");
      browser.sleep(500);
      expect(element(by.id("emailError")).isPresent()).toBe(true);

      // Add button is disabled as this is not a valid contact
      expect(element(by.id("btnAdd")).isEnabled()).toBe(false);
   });


   /*
    * Test the email field validations
    */
   it ("website validations", function() {
      // Initialize this contact with the required fields
      element(by.id("firstName")).sendKeys("Test");
      element(by.id("lastName")).sendKeys("User");

      // Add button is enabled as this is a valid contact
      expect(element(by.id("btnAdd")).isEnabled()).toBe(true);

      // Get a handle to the edit screen elements
      var website = element(by.id("website"));

      // Verify the field is present
      expect(website.isPresent()).toBe(true);

      // Fill in a value that is valid
      website.clear().sendKeys("http://flintstone.com");
      browser.sleep(500);
      expect(element(by.id("websiteError")).isPresent()).toBe(false);

      // Add button is disabled as this is not a valid contact
      expect(element(by.id("btnAdd")).isEnabled()).toBe(true);

      // Fill in a value that is invalid
      website.clear().sendKeys("flintstonecom");
      browser.sleep(500);
      expect(element(by.id("websiteError")).isPresent()).toBe(true);

      // Add button is disabled as this is not a valid contact
      expect(element(by.id("btnAdd")).isEnabled()).toBe(false);
   });

});