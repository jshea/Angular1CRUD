package com.mydomain.person.model;


import java.io.Serializable;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/*
 * This is a person/contact Data Transfer Object (DTO).
 */

/**
 * Data object representing an individual.
 *
 * @author jshea
 */
@XmlRootElement
public class Person implements Serializable {
   private static final long serialVersionUID = 1L;

   private Integer id         = null;
   private String  firstName  = "";
   private String  lastName   = "";
   private Address address    = new Address();
   private Phone   phone      = new Phone();
   private String  email      = "";
   private String  website    = "";


   /**
    * Constructors
    */
   public Person() { }

   public Person(String firstName, String lastName,
                 String phone,
                 String email, String website) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.website = website;
   }

   public Person(Person p) {
      this.firstName = p.getFirstName();
      this.lastName = p.getLastName();
      this.address = p.getAddress();
      this.phone = p.getPhone();
      this.email = p.getEmail();
      this.website = p.getWebsite();
   }


   // Id
   public Integer getId() {
      return id;
   }
   public void setId(Integer id) {
      this.id = id;
   }

   // First Name
   public String getFirstName() {
      return firstName;
   }
   public void setFirstName(String firstName) {
      this.firstName = (firstName!=null?firstName:"");
   }

   // Last Name
   public String getLastName() {
      return lastName;
   }
   public void setLastName(String lastName) {
      this.lastName = (lastName!=null?lastName:"");
   }

   // Address
   public Address getAddress() {
      return address;
   }
   public void setAddress(Address address) {
      this.address = address;
   }

   // Phone number
   public Phone getPhone() {
      return phone;
   }
   public void setPhone(Phone phone) {
      this.phone = phone;
   }

   // Email
   public String getEmail() {
      return email;
   }
   public void setEmail(String email) {
      this.email = (email!=null?email:"");
   }

   // Website
   public String getWebsite() {
      return website;
   }
   public void setWebsite(String website) {
      this.website = website;
   }


   /* Utility methods */

   @XmlTransient
   public String getName() {
      return Util.getProperCase(firstName+" "+lastName);
   }
   @XmlTransient
   public String getFullName() {
      return getName();
   }


   /*
   * Override toString() to be a JSONish output. Facilitates debugging
   * and unit test comparison.
   */
   @Override
   public String toString() {
      StringBuilder sb = new StringBuilder();

      sb.append("{");

      sb.append("id:").append(id).append(",\n");
      sb.append("firstName:").append(firstName).append(",\n");
      sb.append("lastName:").append(lastName).append(",\n");
      sb.append("address:").append(address.toString()).append(",\n");
      sb.append("phone:").append(phone).append(",\n");
      sb.append("email:").append(email).append(",\n");
      sb.append("website:").append(website).append("\n");

      sb.append("}");

      return sb.toString();
   }

}