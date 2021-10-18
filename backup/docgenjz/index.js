import { jsPDF } from "jspdf";

/**
 * Describe Docgen here.
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
    var pdf = doc.output('blob');
    // doc.save("a4.pdf");

    var data = new FormData();
    data.append('data' , pdf);

    logger.info(JSON.stringify(doc));

    // const uowa = context.org.dataApi.newUnitOfWork();

    // // Register a new Account for Creation
    // const contentVersion = uowa.registerCreate({
    //     type: "ContentVersion",
    //     fields: {
    //         ContentLocation: "S",
    //         PathOnClient: "RiskReview.pdf",
    //         Title: "Risk Review",
    //         VersionData: data
    //     }
    // });

    // try {
    //     // Commit the Unit of Work with all the previous registered operations
    //     const response = await context.org.dataApi.commitUnitOfWork(uowa);
    //     const result = {
    //         contentVersionId: response.get(contentVersion).id,
    //     }

    //     logger.info(result);

    // } catch (err) {
    //     const errorMessage = `Failed to insert record. Root Cause : ${err.message}`;
    //     logger.error(errorMessage);
    //     throw new Error(errorMessage);
    // }

    // const conDoc = await context.org.dataApi.query(
    //     `SELECT ContentDocumentId FROM ContentVersion WHERE Id =${result.contentVersionId}`);

    // logger.info(conDoc);


    // const uowb = context.org.dataApi.newUnitOfWork();

    // // Register a new Account for Creation
    // const contentDocumentLink = uowb.registerCreate({
    //     type: "ContentDocumentLink",
    //     fields: {
    //         LinkedEntityId: "S",
    //         ContentDocumentId: conDoc.ContentDocumentId,
    //         shareType: "V"
    //     }
    // });

    // try {
    //     // Commit the Unit of Work with all the previous registered operations
    //     const response = await context.org.dataApi.commitUnitOfWork(uow);
    //     const result = {
    //         contentVersionId: response.get(contentVersion).id,
    //     }
    // } catch (err) {
    //     const errorMessage = `Failed to insert record. Root Cause : ${err.message}`;
    //     logger.error(errorMessage);
    //     throw new Error(errorMessage);
    // }

// ContentVersion conVer = new ContentVersion();
// conVer.ContentLocation = 'S'; // to use S specify this document is in Salesforce, to use E for external files
// conVer.PathOnClient = 'testing.txt'; // The files name, extension is very important here which will help the file in preview.
// conVer.Title = 'Testing Files'; // Display name of the files
// conVer.VersionData = EncodingUtil.base64Decode(yourFilesContent); // converting your binary string to Blog
// insert conVer;    //Insert ContentVersion


// // First get the Content Document Id from ContentVersion Object
// Id conDoc = [SELECT ContentDocumentId FROM ContentVersion WHERE Id =:conVer.Id].ContentDocumentId;
// //create ContentDocumentLink  record 
// ContentDocumentLink conDocLink = New ContentDocumentLink();
// conDocLink.LinkedEntityId = '0066F00000qNVUv'; // Specify RECORD ID here i.e Any Object ID (Standard Object/Custom Object)
// conDocLink.ContentDocumentId = conDoc;  //ContentDocumentId Id from ContentVersion
// conDocLink.shareType = 'V';
// insert conDocLink;

}
