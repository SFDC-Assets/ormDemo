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
  const { recordId, title, question1, question2, question3, question4, question5, response1, response2, response3, response4, response5 } = event.data;
  logger.info(recordId);

  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(title + " Risk Review", 25, 25);
  doc.setFontSize(9);
  doc.text(question1, 10, 50);
  doc.text(response1, 20, 60);
  doc.text(question2, 10, 80);
  doc.text(response2, 20, 90);
  doc.text(question3, 10, 110);
  doc.text(response3, 20, 120);
  doc.text(question4, 10, 140);
  doc.text(response4, 20, 150);
  doc.text(question5, 10, 170);
  doc.text(response5, 20, 180);

  const file = doc.output();
  const pdfFile=Buffer.from(file).toString('base64');
  logger.info(pdfFile);

  const uow = context.org.dataApi.newUnitOfWork();

  // Register a new ContentVersion for Creation
  const contentVersionId = uow.registerCreate({
    type: "ContentVersion",
    fields: {
      ContentLocation: "S",
      PathOnClient: title + ".pdf",
      Title: "Risk Review",
      VersionData: pdfFile,
      FirstPublishLocationId: recordId
    }
  });

  try {
      // Commit the Unit of Work with all the previous registered operations
      const response = await context.org.dataApi.commitUnitOfWork(uow);
      const result = {
        contentVersionId: response.get(contentVersionId).id,
      }

      return result;
  } catch (err) {
      const errorMessage = `Failed to insert record. Root Cause : ${err.message}`;
      logger.error(errorMessage);
      throw new Error(errorMessage);
  }
}