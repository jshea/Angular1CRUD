package com.mydomain.person.model;

import com.mydomain.person.PersonException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class PersonDAO {
   private static final Logger logger = Logger.getLogger(PersonDAO.class.getName());
   // TODO - Set the schema to your user name. If you changed the schema in PersonDDL.sql
   //        to your username then this project just might work.
   private static final String YOUR_USER_NAME = "Your Name";


   /**
    * Get one individual based upon a unique identifier.
    *
    * @param id
    * @return
    * @throws PersonException
    */
   public static Person getPerson(int id) throws PersonException {
      Person p = null;
      Connection conn = null;
      PreparedStatement ps = null;
      ResultSet rs = null;

      try {
         conn = DBConnection.getConnection();
         ps = conn.prepareStatement(
                 "select * " +
                 "from " + YOUR_USER_NAME + "_angularcrud " +
                 "where id = ?" +
                 "order by lastName, firstName");
         ps.setLong(1, id);
         rs = ps.executeQuery();

         if (rs.next()) {
            p = new Person();

            p.setId(rs.getInt("id"));
            p.setFirstName(rs.getString("firstName"));
            p.setLastName(rs.getString("lastName"));

            p.setAddress(new Address(rs.getString("type"),rs.getString("street"),rs.getString("city"),rs.getString("state"),rs.getString("zip")));

            p.setPhone(new Phone(rs.getString("type"),rs.getString("number")));

            p.setEmail(rs.getString("email"));
            p.setWebsite(rs.getString("website"));
         }
      }
      catch (SQLException sqlEx) {
         logger.log(Level.SEVERE, sqlEx.getMessage(), sqlEx);
         throw new PersonException(sqlEx.getMessage(), sqlEx);
      }
      finally {
         // Cleanup after ourselves
         try {
            if (rs != null)   { rs.close(); }
            if (ps != null)   { ps.close(); }
            if (conn != null) { conn.close(); }
         }
         catch (SQLException sqlEx) {
            logger.log(Level.SEVERE, sqlEx.getMessage(), sqlEx);
         }
      }
      return p;
   }


   /**
    * Get all data. Warning, returned results can be big.
    *
    * @return
    * @throws PersonException
    */
   public static List<Person> getAll() throws PersonException {
      List<Person> entryList = new ArrayList<>();
      Connection conn = null;
      PreparedStatement ps = null;
      ResultSet rs = null;

      try {
         conn = DBConnection.getConnection();
         ps = conn.prepareStatement(
                 "select * " +
                 "from " + YOUR_USER_NAME + "_angularcrud " +
                 "order by lastName, firstName");
         rs = ps.executeQuery();

         while (rs.next()) {
            Person p = new Person();

            p.setId(rs.getInt("id"));
            p.setFirstName(rs.getString("firstName"));
            p.setLastName(rs.getString("lastName"));

            p.setAddress(new Address(rs.getString("type"),rs.getString("street"),rs.getString("city"),rs.getString("state"),rs.getString("zip")));

            p.setPhone(new Phone(rs.getString("type"),rs.getString("number")));

            p.setEmail(rs.getString("email"));
            p.setWebsite(rs.getString("website"));

            entryList.add(p);
         }
      }
      catch (SQLException sqlEx) {
         logger.log(Level.SEVERE, sqlEx.getMessage(), sqlEx);
         throw new PersonException(sqlEx.getMessage(), sqlEx);
      }
      finally {
         // Cleanup after ourselves
         try {
            if (rs != null)   { rs.close(); }
            if (ps != null)   { ps.close(); }
            if (conn != null) { conn.close(); }
         }
         catch (SQLException sqlEx) {
            logger.log(Level.SEVERE, sqlEx.getMessage(), sqlEx);
         }
      }
      return entryList;
   }


   /**
    * Add a new person.
    *
    * @param p
    * @return
    * @throws PersonException
    */
   public static Person add(Person p) throws PersonException {

      if (p == null) {
         throw new PersonException("Person persistence failed. Cannot persist a null Person");
      }

      Connection conn = null;
      PreparedStatement ps = null;
      ResultSet rs = null;
      Person newUser = null;

      try {
         conn = DBConnection.getConnection();
         ps = conn.prepareStatement(
                 "insert into " + YOUR_USER_NAME + "_angularcrud (" +
                 "id, firstName, lastName, " +
                 "addressType, street, city, state, zip, " +
                 "phoneType, number, " +
                 "email, website) " +
                 "values (" + YOUR_USER_NAME + "_angularcrud_seq.nextval,?,?,?,?,?,?,?,?,?,?)", Statement.RETURN_GENERATED_KEYS);

         ps.setString( 1, p.getFirstName());
         ps.setString( 2, p.getLastName());

         ps.setString( 3, p.getAddress().getStreet());
         ps.setString( 4, p.getAddress().getStreet());
         ps.setString( 5, p.getAddress().getCity());
         ps.setString( 6, p.getAddress().getState());
         ps.setString( 7, p.getAddress().getZip());

         ps.setString( 8, p.getPhone().getType());
         ps.setString( 9, p.getPhone().getNumber());

         ps.setString(10, p.getEmail());
         ps.setString(11, p.getWebsite());

         int rowCount = ps.executeUpdate();

         if (rowCount < 1) {
            throw new SQLException("Person persistence failed.");
         }
         else {
            conn.commit();

            Statement s = conn.createStatement();
            rs = s.executeQuery("select " + YOUR_USER_NAME + "_angularcrud_seq.currval from dual");
            int newId = 0;
            while (rs.next()) {
               newId = rs.getInt(1);
            }
            if (newId != 0) {
               newUser = getPerson(newId);
            }
         }
      }
      catch (SQLException sqlEx) {
         try {
            conn.rollback();
         }
         catch (SQLException e) {
            logger.log(Level.SEVERE, sqlEx.getMessage(), e);
            throw new PersonException(sqlEx.getMessage(),e);
         }
         logger.log(Level.SEVERE, sqlEx.getMessage(), sqlEx);
         throw new PersonException(sqlEx.getMessage(),sqlEx);
      }
      finally {
         // Cleanup our JDBC objects
         try {
            if (rs != null)   { rs.close(); }
            if (ps != null)   { ps.close(); }
            if (conn != null) { conn.close(); }
         }
         catch (SQLException sqlEx) {
            logger.log(Level.SEVERE, sqlEx.getMessage(), sqlEx);
         }
      }
      return newUser;
   }


   /**
    * Add a list of people. Not currently used in this example.
    *
    * @param personList
    * @throws PersonException
    */
   public static void add(List<Person> personList) throws PersonException {

      if (personList == null) {
         throw new PersonException("Person persistence failed. Cannon persist a null list");
      }

      for (Person p : personList) {
         add(p);
      }
   }


   /**
    * Update a person by replacing all values with the passed in values.
    *
    * @param p
    * @throws PersonException
    */
   public static void update(Person p) throws PersonException {

      if (p == null || p.getId() == null || p.getId() <= 0) {
         throw new PersonException("Person persistence failed. Cannot persist a null Person");
      }

      Connection conn = null;
      PreparedStatement ps = null;
      ResultSet rs = null;

      try {
         conn = DBConnection.getConnection();
         ps = conn.prepareStatement(
                 "update " + YOUR_USER_NAME + "_angularcrud set " +
                 "firstName=?, " +
                 "lastName=?, " +
                 "addressType=?, " +
                 "street=?, " +
                 "city=?, " +
                 "state=?, " +
                 "zip=?, " +
                 "phoneType=?, " +
                 "number=?, " +
                 "email=?, " +
                 "website=? " +
                 "where id=?");

         ps.setString( 1, p.getFirstName());
         ps.setString( 2, p.getLastName());
         ps.setString( 3, p.getAddress().getStreet());
         ps.setString( 4, p.getAddress().getCity());
         ps.setString( 5, p.getAddress().getState());
         ps.setString( 6, p.getAddress().getZip());
         ps.setString( 7, p.getPhone().getType());
         ps.setString( 8, p.getPhone().getNumber());
         ps.setString( 9, p.getEmail());
         ps.setString(10, p.getWebsite());
         ps.setLong(  11, p.getId());

         int rowCount = ps.executeUpdate();

         if (rowCount < 1) {
            throw new SQLException("Person persistence failed.");
         }
         conn.commit();
      }
      catch (SQLException sqlEx) {
         try {
            conn.rollback();
         }
         catch (SQLException e) {
            logger.log(Level.SEVERE, sqlEx.getMessage(), sqlEx);
            throw new PersonException(sqlEx.getMessage(), sqlEx);
         }
         logger.log(Level.SEVERE, sqlEx.getMessage(), sqlEx);
         throw new PersonException(sqlEx.getMessage(), sqlEx);
      }
      finally {
         // Cleanup our JDBC objects
         try {
            if (rs != null)   { rs.close(); }
            if (ps != null)   { ps.close(); }
            if (conn != null) { conn.close(); }
         }
         catch (SQLException sqlEx) {
            logger.log(Level.SEVERE, sqlEx.getMessage(), sqlEx);
         }
      }
   }


   /**
    * Delete one person based on their unique key.
    *
    * @param id
    * @return
    * @throws PersonException
    */
   public static boolean delete(int id) throws PersonException {
      boolean retValue = false;

      if (id == 0) {
         throw new PersonException("Person deletion failed. Cannot delete a null id");
      }

      Connection conn = null;
      PreparedStatement ps = null;

      try {
         conn = DBConnection.getConnection();
         ps = conn.prepareStatement("delete from " + YOUR_USER_NAME + "_angularcrud where id = ?");
         ps.setLong(1, id);

         int rowCount = ps.executeUpdate();

         if (rowCount > 0) {
            retValue = true;
         }
         conn.commit();
      }
      catch (SQLException sqlEx) {
         try {
            conn.rollback();
         }
         catch (SQLException e) {
            logger.log(Level.SEVERE, sqlEx.getMessage(), sqlEx);
            throw new PersonException(sqlEx.getMessage(), sqlEx);
         }
         logger.log(Level.SEVERE, sqlEx.getMessage(), sqlEx);
         throw new PersonException(sqlEx.getMessage(), sqlEx);
      }
      finally {
         // Cleanup after ourselves
         try {
            if (ps != null)   { ps.close(); }
            if (conn != null) { conn.close(); }
         }
         catch (SQLException sqlEx) {
            logger.log(Level.SEVERE, sqlEx.getMessage(), sqlEx);
         }
      }
      return retValue;
   }


   /**
    * Delete all person data from the data store.
    *
    * @throws PersonException
    */
   public static void deleteAll() throws PersonException {
      Connection conn = null;
      PreparedStatement ps = null;

      try {
         conn = DBConnection.getConnection();
         ps = conn.prepareStatement("delete from " + YOUR_USER_NAME + "_angularcrud");

         ps.executeUpdate();

         conn.commit();
      }
      catch (SQLException sqlEx) {
         try {
            conn.rollback();
         }
         catch (SQLException e) {
            logger.log(Level.SEVERE, sqlEx.getMessage(), sqlEx);
            throw new PersonException(e.getMessage(), e);
         }
         logger.log(Level.SEVERE, sqlEx.getMessage(), sqlEx);
         throw new PersonException(sqlEx.getMessage(), sqlEx);
      }
      finally {
         try {
            if (ps != null)   { ps.close(); }
            if (conn != null) { conn.close(); }
         }
         catch (SQLException sqlEx) {
            logger.log(Level.SEVERE, sqlEx.getMessage(), sqlEx);
         }
      }
   }

}
