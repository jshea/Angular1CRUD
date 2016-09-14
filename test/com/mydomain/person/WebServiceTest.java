package com.mydomain.person;

import com.mydomain.person.model.Person;
import com.sun.jersey.api.client.ClientResponse;
import java.util.List;
import org.junit.After;
import org.junit.AfterClass;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

/**
 *
 * @author jshea
 */
public class WebServiceTest {
	private static WebServiceUtil wsUtil = null;

    public WebServiceTest() {}


	@BeforeClass
	public static void setUpClass() throws Exception {
		wsUtil = new WebServiceUtil();
	}

	@AfterClass
	public static void tearDownClass() throws Exception {
      // Do any global data cleanup
	}

	@Before
	public void setUp() {
      // Do setup prior to each test
   }

	@After
	public void tearDown() { }


	/**
	 *
	 *
	 */
	@Test
	public void testWebServices() {
      List<Person> personList;
      Person before, after;

      // assertTrue(after.toString().equals(before.toString()));

      /*
       * Test getAll (and by implication, deleteAll if there was data before we started)
       */

      // Delete all data
		ClientResponse cr = wsUtil.runDelete("/deleteall");
		assertEquals(200, cr.getStatus());

      // Get the full list of everybody in our db
		cr = wsUtil.runGet("/");
      // There should be no response body because all data was deleted
		assertEquals(204, cr.getStatus());

      /*
       * Test adding a person
       */

      // Create a person to add, update, delete (fold, spindle, mutilate...)
      before = new Person();
      before.setFirstName("Jim");
      before.setLastName("Shea");
      before.getAddress().setStreet("4800 Oak Grove Dr");
      before.getAddress().setCity("Pasadena");
      before.getAddress().setState("CA");
      before.getAddress().setZip("91109");
      before.getAddress().setType("Work");
      before.getPhone().setNumber("7145551212");
      before.getPhone().setType("Work");
      before.setWebsite("http://jpl.nasa.gov");

      // Note add returns the saved values. This is from a select from the table.
		cr = wsUtil.runPost("/", before);
      // Should be HTTP 201 - Created
		assertEquals(201, cr.getStatus());
      after = WebServiceUtil.jsonToPerson(cr.getEntity(String.class));

      /*
       * After will have its unique id set so we set before's id to after's id. This
       * is a cheat so we can compare their toString() values.
       */
      before.setId(after.getId());

      assertTrue("Added person was... well, added!", after.toString().equals(before.toString()));

      // Get the full list of everybody in our db
//      personList = PersonDAO.getAll();

      // List size should be 1 because we added one person object
//      assertEquals("Should have just one person", 1, personList.size());

      /*
       * Test updating and retrieving one person.
       */

      // Update our test object with new values
      before.setFirstName("Fred");
      before.setLastName("Flintstone");
      before.getAddress().setStreet("123 Granite Rd");
      before.getAddress().setCity("Bedrock");
      before.getAddress().setState("");
      before.getAddress().setZip("00001");
      before.getAddress().setType("Work");
      before.getPhone().setNumber("1");
      before.getPhone().setType("Work");
      before.setWebsite("http://fred.org");

      // Note update doesn't return the saved values.
//      PersonDAO.update(before);

      // Get our person again
//      after = PersonDAO.getPerson(before.getId());

      // Did the update stick?
//      assertTrue("Updated person was... wait for it, updated!", after.toString().equals(before.toString()));

      // Get the full list of everybody in our db
//      personList = PersonDAO.getAll();

      // Did anybody sneak into our table? List size should be 1 because we added/updated one person object
//      assertEquals("Should have just one person", 1, personList.size());

      /*
       * Test deleting one person.
       */

//      PersonDAO.delete(before.getId());

      // Get the full list of everybody in our db
//      personList = PersonDAO.getAll();

      // Should be zero because we deleted our only person
//      assertEquals("Should be empty", 0, personList.size());
   }

}
