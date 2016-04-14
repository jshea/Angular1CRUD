/*
 * Do not commit your connection information to GitHub!
 */
package com.mydomain.person.model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 *
 */
public class DBConnection {

   public static Connection getConnection() {
      Connection conn = null;

      try {
         // MySQL
//       Class.forName("com.mysql.jdbc.Driver");
//       conn = DriverManager.getConnection("jdbc:mysql://server:port/DATABASE", UID, PW);

         // Oracle
         Class.forName("oracle.jdbc.OracleDriver");
         conn = DriverManager.getConnection("jdbc:oracle:thin:@server:port:sid", "uid", "pw");
      }
      catch (SQLException | ClassNotFoundException ex) {
         Logger.getLogger(DBConnection.class.getName()).log(Level.SEVERE, null, ex);
      }

      return conn;
   }

}
