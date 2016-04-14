package com.mydomain.person;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.mydomain.person.model.Person;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import javax.ws.rs.core.MediaType;


/**
 *
 * @author jshea
 */
public class WebServiceUtil {
   private final Gson gson = new Gson();
   private Client client;

   private final String BASE_URI = "http://localhost:7001/angularcrud/ws/person/";        // LocalHost


   public WebServiceUtil() {
      init();
   }


   private void init() {
      client = Client.create();
   }


   /*   Jersey client   */


   /**
    * Run a GET request for specified URL. Used by SystemTest.
    *
    * @param url URL (without leading slash) relative to the BASE_URI
    *            (is appended to BASE_URI)
    * @return A ClientResponse
    */
   public ClientResponse runGet(String url) {
      ClientResponse cr;
      WebResource webResource = client.resource(BASE_URI).path(url);

         cr = webResource
              .accept(MediaType.APPLICATION_JSON)
              .get(ClientResponse.class);

      return cr;
   }

   /**
    *
    * @param url URL to run. This is the end of the URL to be appended to the
    *            BASE_URI. Note: omit the leading slash. The Jersey client will
    *            concatenate the BASE_URI + "/" + URL together.
    * @param payload payload to run with URL
    * @return ClientResponse
    */
   public ClientResponse runPost(String url, Object payload) {
      ClientResponse cr;
      WebResource webResource = client.resource(BASE_URI).path(url);

         cr = webResource
              .accept(MediaType.APPLICATION_JSON)
              .type(MediaType.APPLICATION_JSON)
              .post(ClientResponse.class, gson.toJson(payload));

         //System.out.println("WebServiceUtil.runPost: ", gson.toJson(payload));
      return cr;

   }


   /**
    * Used by LogTest
    *
    * @param url
    * @return
    */
   public ClientResponse runDelete(String url) {
      WebResource webResource = client.resource(BASE_URI).path(url);
      ClientResponse cr = webResource
              .delete(ClientResponse.class);

      return cr;
   }



   /**
    * This is the deserialzation of the JSON payload. This takes a person in JSON and returns
    * the data in a Java Person object.
    *
    * @param json
    * @return
    */
   public static Person jsonToPerson(String json) {
      Gson gson = new Gson();

      // Since we have complex types, we need to manually parse them
      JsonParser parser = new JsonParser();
      // The root element is a JSON object
      JsonObject jsonObj = parser.parse(json).getAsJsonObject();

      // Do the conversion
      Person person = gson.fromJson(json, Person.class);

      return person;
   }


   /**
    * Compare two objects to see if their contents are equal. This does a deep compare.
    *
    * @param before
    * @param after
    * @return
    */
   public boolean payloadsEqual(Person before, Person after) {
      StringBuilder payloads = new StringBuilder();
      payloads.append("Before\n");
      if (before==null) {
         payloads.append("null");
      }
      else {
         payloads.append(before.toString());
      }
      payloads.append("After\n");
      if (after==null) {
         payloads.append("null");
      }
      else {
         payloads.append(after.toString());
      }

      // Validate that the objects have their required fields set
      // "Before" object
      if (before==null ||
         before.getFirstName()==null || before.getFirstName().isEmpty() ||
         before.getLastName()==null  || before.getLastName().isEmpty()) {
         throw new IllegalArgumentException("Before object validation" + payloads);
      }

      // "After" object
      if (after==null ||
         after.getFirstName()==null || after.getFirstName().isEmpty() ||
         after.getLastName()==null  || after.getLastName().isEmpty()) {
         throw new IllegalArgumentException("After object validation" + payloads);
      }

      // Now that we're pretty sure they're valid objects, lets compare them

      return before.toString().equals(after.toString());
   }
}