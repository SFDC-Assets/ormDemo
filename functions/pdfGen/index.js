"use strict";

const { jsPDF } = require("jspdf");


/**
 * Attempts to create and manipulate a pdf based on some inputs
 * 
 * @param event: represents the data associated with the occurrence of an event, and
 *                 supporting metadata about the source of that occurrence.
 * @param context: represents the connection to Functions and your Salesforce org.
 * @param logger: logging handler used to capture application logs and trace specifically
 *                 to a given execution of a function.
 */
module.exports = async function (event, context, logger) {
  logger.info(
    `Invoking environmentjs Function with payload ${JSON.stringify(
      event.data || {}
    )}`
  );
  const { recordId, body } = event.data;
  logger.info(recordId);

  const doc = new jsPDF();
  doc.text("Hello world!", 10, 10);
  // doc.save("a4.pdf");

  // var pdf = Buffer.from(doc.output(), base64);
  // var data = new FormData();
  // data.append('data' , pdf);

  // logger.info(JSON.stringify(doc));
  logger.info(doc.output());

  const uowa = context.org.dataApi.newUnitOfWork();

  // Register a new Account for Creation
  const contentVersion = uowa.registerCreate({
    type: "ContentVersion",
    fields: {
      ContentLocation: "S",
      PathOnClient: "RiskReview.pdf",
      Title: "Risk Review",
      VersionData: doc.output()
    }
  });
  
  logger.info(`AAAAAAAAAAAAAAAAAA`);

      try {
          // Commit the Unit of Work with all the previous registered operations
          const response = await context.org.dataApi.commitUnitOfWork(uowa);
          const result = {
              contentVersionId: response.get(contentVersion).id,
          }
  
          logger.info(result);
  
      } catch (err) {
          const errorMessage = `Failed to insert record. Root Cause : ${err.message}`;
          logger.error(errorMessage);
          throw new Error(errorMessage);
      }

  logger.info(`BBBBBBBBBBBBBBBBBBBB`);
  
      const conDoc = await context.org.dataApi.query(
          `SELECT ContentDocumentId FROM ContentVersion WHERE Id =${result.contentVersionId}`);
  
      logger.info(conDoc.ContentDocumentId);
  
      // Once we've saved the document, this next UOW will associate it with the record
      const uowb = context.org.dataApi.newUnitOfWork();
  
      // Register a new Account for Creation
      const contentDocumentLink = uowb.registerCreate({
          type: "ContentDocumentLink",
          fields: {
              LinkedEntityId: "S",
              ContentDocumentId: conDoc.ContentDocumentId,
              shareType: "V"
          }
      });
  
  //     try {
  //         // Commit the Unit of Work with all the previous registered operations
  //         const response = await context.org.dataApi.commitUnitOfWork(uow);
  //         const result = {
  //             contentVersionId: response.get(contentVersion).id,
  //         }
  //     } catch (err) {
  //         const errorMessage = `Failed to insert record. Root Cause : ${err.message}`;
  //         logger.error(errorMessage);
  //         throw new Error(errorMessage);
  //     }};

  return recordId;
}