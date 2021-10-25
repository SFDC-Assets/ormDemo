// import jsPDF from "jspdf";

// const { jsPDF } = require("jspdf");
/**
 * Generates a risk document from the questions on a risk review record
 *
 * The exported method is the entry point for your code when the function is invoked. 
 *
 * Following parameters are pre-configured and provided to your function on execution: 
 * @param event: represents the data associated with the occurrence of an event, and  
 *                 supporting metadata about the source of that occurrence.
 * @param context: represents the connection to Functions and your Salesforce org.
 * @param logger: logging handler used to capture application logs and trace specifically
 *                 to a given execution of a function.
 */
 
export default async function (event, context, logger) {
    logger.info(`Invoking Docgen with payload ${JSON.stringify(event.data || {})}`);

    const doc = new jsPDF();
    doc.text("Hello world!", 10, 10);
    logger.info(`ojibowa1`);

    // var pdf = doc.output('blob');
    // doc.save("a4.pdf");

    // var data = new FormData();
    // data.append('data' , pdf);

    logger.info(doc);

    return 'got out!';

//     const uowa = context.org.dataApi.newUnitOfWork();

//     // Register a new Account for Creation
//     const contentVersion = uowa.registerCreate({
//         type: "ContentVersion",
//         fields: {
//             ContentLocation: "S",
//             PathOnClient: "RiskReview.pdf",
//             Title: "Risk Review",
//             VersionData: pdf
//         }
//     });

//     try {
//         // Commit the Unit of Work with all the previous registered operations
//         const response = await context.org.dataApi.commitUnitOfWork(uowa);
//         const result = {
//             contentVersionId: response.get(contentVersion).id,
//         }

//         logger.info(result);

//     } catch (err) {
//         const errorMessage = `Failed to insert record. Root Cause : ${err.message}`;
//         logger.error(errorMessage);
//         throw new Error(errorMessage);
//     }

//     const conDoc = await context.org.dataApi.query(
//         `SELECT ContentDocumentId FROM ContentVersion WHERE Id =${result.contentVersionId}`);

//     logger.info(conDoc);

//     // Once we've saved the document, this next UOW will associate it with the record
//     const uowb = context.org.dataApi.newUnitOfWork();

//     // Register a new Account for Creation
//     const contentDocumentLink = uowb.registerCreate({
//         type: "ContentDocumentLink",
//         fields: {
//             LinkedEntityId: "S",
//             ContentDocumentId: conDoc.ContentDocumentId,
//             shareType: "V"
//         }
//     });

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
//     }
}
