package com.mydomain.person.model;

import java.util.concurrent.ThreadLocalRandom;

/**
 * This is a collection of string manipulation utilities.
 * @author jshea
 */
public class Util {

   /**
    * Remove non-digits from the phone number
    *
    * @param phoneNumber
    * @return
    */
   public static String stripPhoneNumber(String phoneNumber) {
      String tmpPhone = phoneNumber;

      if (tmpPhone==null || tmpPhone.isEmpty()) {
         return "";
      }
      else {
         tmpPhone = tmpPhone.replaceAll("[^\\d]", "");
      }
      return tmpPhone;
   }


   /**
    * Capitalize first letter of every word.
    * @param str
    * @return
    */
   public static String getProperCase(String str) {
      StringBuffer filter;
      String retVal;

      if (str==null || str.isEmpty()) {
         retVal = "";
      }
      else {
         str = str.trim().toLowerCase();

         // Convert the String to a StringBuffer for faster manipulation
         filter = new StringBuffer(str.length());
         char c;
         // Loop through each character in the String.
         for (int i=0; i < str.length(); i++) {
            c = str.charAt(i);
            if (i == 0 || str.charAt(i - 1) == ' ') {
               filter.append(String.valueOf(c).toUpperCase());
            }
            else {
               filter.append(c);
            }
         }
         retVal = filter.toString();
      }

      return retVal;
   }


   /**
    * Format a phone number into the traditional US formats if 7, 10 or 11 characters long.
    * @param phoneNumber
    * @return
    */
   public static String formatPhoneNumber(String phoneNumber) {
      if (phoneNumber==null || phoneNumber.isEmpty()) {
         return phoneNumber;
      }
      else if (phoneNumber.length()==7) {
         return phoneNumber.substring(0, 3)+ "-" + phoneNumber.substring(3, 7);
      }
      else if  (phoneNumber.length()==10) {
         return "(" + phoneNumber.substring(0, 3) + ") " +
                phoneNumber.substring(3, 6) + "-" + phoneNumber.substring(6, 10);
      }
      else if  (phoneNumber.length()==11) {
         return phoneNumber.substring(0, 1) +
                " (" + phoneNumber.substring(1, 4) + ") " +
                 phoneNumber.substring(4, 7) + "-" + phoneNumber.substring(7, 11);
      }
      else {
         return phoneNumber;
      }
   }


   /**
    * Get a random number within the bounds of min and max.
    * http://stackoverflow.com/questions/363681/generating-random-integers-in-a-specific-range
    *
    * @param min
    * @param max
    * @return
    */
   public static int getRandomNumber(int min, int max) {
      // nextInt is normally exclusive of the top value,
      // so add 1 to make it inclusive
      if (min > max) {
         throw new IllegalArgumentException("min must be smaller or equal to max");
      }
      return ThreadLocalRandom.current().nextInt(min, max + 1);
   }

}