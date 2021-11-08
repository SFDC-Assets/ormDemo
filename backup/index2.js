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
  logger.info(`Invoking environmentjs Function with payload ${JSON.stringify(event.data || {} )}`);
  const { accessToken, baseUrl, apiVersion } = context.org.dataApi;

  // Setup Bulk API Authorization headers
  const authHeaders = {
    Authorization: `Bearer ${accessToken}`
  };

  // Construct API URL for Bulk API v2
  const apiUrl = `${baseUrl}/services/data/v${apiVersion}`;  

  logger.info('apiUrl=' + apiUrl);

  const { recordId, body } = event.data;
  logger.info(recordId);

  const doc = new jsPDF();
  doc.text("Hello world!", 10, 10);
  // doc.save("a4.pdf");

  const file = doc.output();
  // const file = pdf.output('datauristring').split(',')[1];
  // var blobPDF = new Blob([doc.output('bloburi')], {type: 'application/pdf'});
  // var blobPDF = new Blob([doc.output()], {type: 'application/pdf'});
  // var blobEncoding = encodeURIComponent(blobPDF);
  // var reader = new FileReader();
  // var source = reader.readAsDataURL(blobPDF);
  // var fileInput = source.result;

  // var pdf = Buffer.from(doc.output(), base64);
  // var data = new FormData();
  // data.append('data' , pdf);

  // logger.info(JSON.stringify(doc));
  logger.info(file);


  // Create a new Bulk API Job
  const { statusCode: statusCodeJob, body: bodyJob } = await request(
    `${apiUrl}/sobjects/Document`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders
      },
      body: JSON.stringify({
        operation: "upsert",
        object: "Account",
        contentType: "CSV",
        externalIdFieldName: "ExternalID__c"
      })
    }
  );



  // const formData = new FormData();
  // const fileField = document.querySelector('input[type="file"]');
  
  // formData.append('username', 'abc123');
  // formData.append('avatar', fileField.files[0]);
  
  // fetch('https://example.com/profile/avatar', {
  //   method: 'PUT',
  //   body: formData
  // })
  // .then(response => response.json())
  // .then(result => {
  //   console.log('Success:', result);
  // })
  // .catch(error => {
  //   console.error('Error:', error);
  // });
}