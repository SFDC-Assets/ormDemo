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
  logger.info("generating pdf...");

  const doc = new jsPDF();
  doc.text("Hello world!", 10, 10);
  doc.save("a4.pdf");

  logger.info(JSON.stringify(doc));

  return "results";
};
