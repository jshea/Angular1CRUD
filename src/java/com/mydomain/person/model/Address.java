package com.mydomain.person.model;

import java.io.Serializable;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 * Data object representing an individual.
 *
 * @author jshea
 */
@XmlRootElement
public class Address implements Serializable {
   private static final long serialVersionUID = 1L;

   private String street = "";
   private String city   = "";
   private String state  = "";
   private String zip    = "";


   /**
    * Constructors
    */
   public Address() {
   }


   public Address(String street, String city, String state, String zip) {
      setStreet(street);
      setCity(city);
      setState(state);
      setZip(zip);
   }


   public Address(Address p) {
      setStreet(p.getStreet());
      setCity(p.getCity());
      setState(p.getState());
      setZip(p.getZip());
   }


   // Address
   public String getStreet() {
      return street;
   }
   public void setStreet(String street) {
      this.street = (street != null ? street : "");
   }


   // City
   public String getCity() {
      return city;
   }
   public void setCity(String city) {
      this.city = (city != null ? city : "");
   }


   // State
   public String getState() {
      return state;
   }
   public void setState(String state) {
      this.state = (state != null ? state : "");
   }


   // Zip
   public String getZip() {
      return zip;
   }
   public void setZip(String zip) {
      this.zip = (zip != null ? zip : "");
   }


   @XmlTransient
   public String getFullAddress() {
      // TODO this needs to be validated with all variations of fields addr, city,
      // state, zip being filled in & blank, to ensure formatting is correct
      return getStreet() + "\n " +
             getCity() +
             (getCity().isEmpty() || (getState() + getZip()).isEmpty() ? " " : ", ") +
             getState() + " " +
             getZip();
   }


   /*
   * Override toString() to be a JSONish output. Facilitates debugging
   * and unit test comparison.
   */
   @Override
   public String toString() {
      StringBuilder sb = new StringBuilder();

      sb.append("{");

      sb.append("street:").append(street).append(", ");
      sb.append("city:").append(city).append(", ");
      sb.append("state:").append(state).append(", ");
      sb.append("zip:").append(zip);

      sb.append("}");

      return sb.toString();
   }

}
