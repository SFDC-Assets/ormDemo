public with sharing class GenerateRiskDoc {
    public static String test(String recordId, String body) {
        System.debug('Invoking docgen function');

        System.JSONGenerator jGen = System.JSON.createGenerator(false);
        jGen.writeStartObject();
        jGen.writeStringField('recordId', recordId);
        jGen.writeStringField('body', body);
        jGen.writeEndObject();
        String docGenArgs = jGen.getAsString(); 
        System.debug('args are ' + docGenArgs);

        functions.Function myFunction = functions.Function.get('ormDemo.docgen');
        functions.FunctionInvocation invocation = myFunction.invoke(docGenArgs);
        String response = invocation.getResponse();

        System.debug('Response from myfunction ' + response);
        return response;
    }
}