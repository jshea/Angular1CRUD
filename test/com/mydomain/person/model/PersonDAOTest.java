package com.mydomain.person.model;

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
public class PersonDAOTest {
   // To support (future) carrying data over from one test to another, make these class level variables.
   List<Person> personList;
   Person before, after;

   public PersonDAOTest() { }


   @BeforeClass
   public static void setUpClass() { }

   @AfterClass
   public static void tearDownClass() { }


   @Before
   public void setUp() { }

   @After
   public void tearDown() { }


   /**
    * Test getAll (and by implication, deleteAll if there was data before we started)
    *
    * @throws java.lang.Exception
    */
   @Test
   public void testGetAll() throws Exception {
      /*
       * Test getAll (and by implication, deleteAll if there was data before we started)
       */

      // Delete all data
      PersonDAO.deleteAll();

      // Get the full list of everybody in our db
      personList = PersonDAO.getAll();

      // List size should be 0 because everybody was deleted
      assertEquals("Everybody was deleted", 0, personList.size());

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
      before.getPhone().setType("Mobile");
      before.setWebsite("http://jpl.nasa.gov");

      // Note add returns the saved values. This is from a select from the table.
      after = PersonDAO.add(before);
      /*
       * After will have its unique id set so we set before's id to after's id. This
       * is a cheat so we can compare their toString() values.
       */
      before.setId(after.getId());

      assertTrue("Added person was... well, added!", after.toString().equals(before.toString()));

      // Get the full list of everybody in our db
      personList = PersonDAO.getAll();

      // List size should be 1 because we added one person object
      assertEquals("Should have just one person", 1, personList.size());

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
      before.getPhone().setType("Mobile");
      before.setWebsite("http://fred.org");

      // Note update doesn't return the saved values.
      PersonDAO.update(before);

      // Get our person again
      after = PersonDAO.getPerson(before.getId());

      // Did the update stick?
      assertTrue("Updated person was... wait for it, updated!", after.toString().equals(before.toString()));

      // Get the full list of everybody in our db
      personList = PersonDAO.getAll();

      // Did anybody sneak into our table? List size should be 1 because we added/updated one person object
      assertEquals("Should have just one person", 1, personList.size());

      /*
       * Test deleting one person.
       */

      PersonDAO.delete(before.getId());

      // Get the full list of everybody in our db
      personList = PersonDAO.getAll();

      // Should be zero because we deleted our only person
      assertEquals("Should be empty", 0, personList.size());
   }

}
