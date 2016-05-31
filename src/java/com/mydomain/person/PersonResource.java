package com.mydomain.person;

import com.mydomain.person.model.Person;
import com.mydomain.person.model.PersonDAO;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST Web Service
 *
 * @author jshea
 */
@Path("person")
public class PersonResource {


   /**
    * Get all people in the database
    *
    * @return
    * @throws PersonException
    */
   @GET
   @Produces(MediaType.APPLICATION_JSON)
   public Response getAll() throws PersonException {
      Response response;
      List<Person> people = PersonDAO.getAll();
      if (people == null || people.isEmpty()) {
         response = Response.status(Response.Status.NO_CONTENT).build();
      }
      else {
         /*
          * StackOverflow to the rescue. Using Response/build throws a message body writer error for Java class
          * java.util.ArrayList, and Java type class java.util.ArrayList, and MIME media type application/json
          * was not found.
          *
          * This solution is from:
          * http://stackoverflow.com/questions/6081546/jersey-can-produce-listt-but-cannot-response-oklistt-build
          */
         GenericEntity<List<Person>> entity = new GenericEntity<List<Person>>(people) {};

         response = Response.status(Response.Status.OK).entity(entity).build();
      }

      return response;
   }


   /**
    * Get one person by primary key
    *
    * @param id
    * @return
    * @throws PersonException
    */
   @GET
   @Path("/{id}")
   @Produces(MediaType.APPLICATION_JSON)
   public Response getPerson(@PathParam("id") int id) throws PersonException {
      Response response;
      Person p = PersonDAO.getPerson(id);
      if (p == null) {
         response = Response.status(Response.Status.NO_CONTENT).build();
      }
      else {
         response = Response.status(Response.Status.OK).entity(p).build();
      }

      return response;
   }


   /**
    * Create a person. Also implements update for callers
    * that cannot use PUT.
    *
    * @param p
    * @return
    * @throws PersonException
    */
   @POST
   @Consumes(MediaType.APPLICATION_JSON)
   @Produces(MediaType.APPLICATION_JSON)
   public Response add(Person p) throws PersonException {
      Person newPerson;

      if (p.getId() == null) {   // This is an add
         newPerson = PersonDAO.add(p);
      }
      else {                        // We have an ID so this is an update. Caller should have used PUT method.
         PersonDAO.update(p);
         newPerson = PersonDAO.getPerson(p.getId());
      }

      Response response;

      if (newPerson == null) {
         // Something went wrong
         response = Response.status(Response.Status.NOT_MODIFIED).entity(p).build();
      }
      else if (p.getId() != null) {
         // Action was an update (passed in data had an ID) that was successful
         return Response.status(Response.Status.OK).entity(newPerson).build();
      }
      else {
         // Action was an add
         response = Response.status(Response.Status.CREATED).entity(newPerson).build();
      }

      return response;
   }


   /**
    * Update an existing person
    *
    * @param p
    * @return
    * @throws PersonException
    */
   @PUT
   @Consumes(MediaType.APPLICATION_JSON)
   @Produces(MediaType.APPLICATION_JSON)
   public Response update(Person p) throws PersonException {
      PersonDAO.update(p);
      return Response.status(Response.Status.OK).entity(PersonDAO.getPerson(p.getId())).build();
   }


   /**
    * Delete one person based on primary key.
    *
    * @param id
    * @return
    * @throws PersonException
    */
   @DELETE
   @Path("/{id}")
   @Consumes(MediaType.APPLICATION_JSON)
   public Response delete(@PathParam("id") int id) throws PersonException {
      boolean success = PersonDAO.delete(id);
      if (success) {
         return Response.status(Response.Status.NO_CONTENT).build();
      }
      else {
         return Response.status(Response.Status.BAD_REQUEST).build();
      }
   }


   /**
    * Delete all existing entries.
    *
    * @return
    * @throws PersonException
    */
   @DELETE
   @Path("/deleteall")
   @Consumes(MediaType.APPLICATION_JSON)
   public Response deleteAll() throws PersonException {
      PersonDAO.deleteAll();
      // ok returns 200 if there's a body and 204 if no body
      // Why does this return 200?
      return Response.ok().build();
   }

}
