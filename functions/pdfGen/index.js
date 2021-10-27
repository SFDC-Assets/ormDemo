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

  const uow = context.org.dataApi.newUnitOfWork();

  // Register a new ContentVersion for Creation
  const contentVersionId = uow.registerCreate({
    type: "ContentVersion",
    fields: {
      ContentLocation: "S",
      PathOnClient: "RiskReview.pdf",
      Title: "Risk Review",
      VersionData: doc.output()
    }
  });

  logger.info(`AAAAAAAAAAAAAAAAAA`);


  // Register a new ContentDocumentLink for Creation
//   const contentDocumentLinkId = uow.registerCreate({
//     type: "ContentDocumentLink",
//     fields: {
//         LinkedEntityId: "S",
//         ContentDocumentId: contentVersionId,
//         shareType: "V"
//     }
// });
  
logger.info(`AAAAAAAAAAAAAAAAAA`);

try {
    // Commit the Unit of Work with all the previous registered operations
    const response = await context.org.dataApi.commitUnitOfWork(uow);
    const result = {
      contentVersionId: response.get(contentVersionId).id,
      // contentDocumentLinkId: response.get(contentDocumentLinkId).id,
    }
    // const conDocId = response.get(contentVersion).Id;
    logger.info(`BBBBBBBBBBBBBBBBBBBB ` + contentVersionId + ` `);

    return result;
} catch (err) {
    const errorMessage = `Failed to insert record. Root Cause : ${err.message}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
}
  
      // Once we've saved the document, this next UOW will associate it with the record
      // const uowb = context.org.dataApi.newUnitOfWork();
  
      // logger.info(`CCCCCCCCCCCCCCCCCCCC`);
  
      // try {
      //     // Commit the Unit of Work with all the previous registered operations
      //     const response = await context.org.dataApi.commitUnitOfWork(uowb);
      //     const conDocLinkId = response.get(contentDocumentLink).id;
      //     logger.info(conDocLinkId);
      // } catch (err) {
      //     const errorMessage = `Failed to insert record. Root Cause : ${err.message}`;
      //     logger.error(errorMessage);
      //     throw new Error(errorMessage);
      // }};

  //     logger.info(`DDDDDDDDDDDDDDDDDDDD`);


  // return result;
}