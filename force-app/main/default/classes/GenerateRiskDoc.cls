public with sharing class GenerateRiskDoc {
    public static String test(String myName) {
        System.debug('Invoking hellofunction');

        System.JSONGenerator jGen = System.JSON.createGenerator(false);
        jGen.writeStartObject();
        jGen.writeStringField('myname', myName);
        jGen.writeEndObject();
        String helloArgs = jGen.getAsString(); 
        System.debug('args are ' + helloArgs);

        functions.Function myFunction = functions.Function.get('ormDemo.docgen');
        functions.FunctionInvocation invocation = myFunction.invoke(helloArgs);
        String response = invocation.getResponse();

        System.debug('Response from myfunction ' + response);
        return response;
    }
}
