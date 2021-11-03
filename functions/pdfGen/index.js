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

  // const file = pdf.output('datauristring').split(',')[1];
  var blobPDF = new Blob([doc.output('bloburi')], {type: 'application/pdf'});
  // var blobPDF = new Blob([doc.output()], {type: 'application/pdf'});
  // var blobEncoding = encodeURIComponent(blobPDF);
  var reader = new FileReader();
  var source = reader.readAsDataURL(blobPDF);
  var fileInput = source.result;

  // var pdf = Buffer.from(doc.output(), base64);
  // var data = new FormData();
  // data.append('data' , pdf);

  // logger.info(JSON.stringify(doc));
  logger.info(doc);

  const uow = context.org.dataApi.newUnitOfWork();

  // Register a new ContentVersion for Creation
  const contentVersionId = uow.registerCreate({
    type: "ContentVersion",
    fields: {
      ContentLocation: "S",
      PathOnClient: "RiskReview.pdf",
      // origin: "H",
      Title: "Risk Review",
      VersionData: fileInput,
      FirstPublishLocationId: recordId
    }
  });

  logger.info(`AAAAAAAAAAAAAAAAAA`);

  try {
      // Commit the Unit of Work with all the previous registered operations
      const response = await context.org.dataApi.commitUnitOfWork(uow);
      const result = {
        contentVersionId: response.get(contentVersionId).id,
      }

      logger.info(`BBBBBBBBBBBBBBBBBBBB ` + result.contentVersionId + ` `);

      return result;
  } catch (err) {
      const errorMessage = `Failed to insert record. Root Cause : ${err.message}`;
      logger.error(errorMessage);
      throw new Error(errorMessage);
  }
}