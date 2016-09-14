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
public class Phone implements Serializable {
   private static final long serialVersionUID = 1L;

   private String type     = ""; // Ex Home, Work, Mobile...
   private String number   = ""; // Number wo formatting (no space, dash, parens...)


   /**
    * Constructors
    */
   public Phone() { }


   public Phone(String type, String number) {
      setType(type);
      setNumber(number);
   }


   public Phone(Phone p) {
      setType(p.getType());
      setNumber(p.getNumber());
   }


   // Type
   public String getType() {
      return type;
   }
   public void setType(String val) {
      this.type = (val != null ? val : "");
   }

   // Number
   public String getNumber() {
      return number;
   }
   public void setNumber(String val) {
      this.number = (val != null ? Util.stripPhoneNumber(val) : "");
   }
   @XmlTransient
   public String getNumberFormatted() {
      return Util.formatPhoneNumber(number);
   }


   /*
   * Override toString() to be a JSONish output. Facilitates debugging
   * and unit test comparison.
   */
   @Override
   public String toString() {
      StringBuilder sb = new StringBuilder();

      sb.append("{");

      sb.append("type:").append(type).append(",\n");
      sb.append("number:").append(number).append("\n");

      sb.append("}");

      return sb.toString();
   }

}
