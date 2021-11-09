public with sharing class GenerateRiskDoc {
    @InvocableMethod(label='Generate Risk Document' description='Creates & attaches risk document to risk review record.' category='Approvals')
    public static List<String> invokeDocGen(List<Input> input) {
        System.debug('Invoking docgen function');
		Input payload = input.get(0);
        List<String> responses = new List<String>();
        
        functions.Function myFunction = functions.Function.get('ormDemo.pdfgen');
        functions.FunctionInvocation invocation = myFunction.invoke(JSON.serialize(payload));
        
        if (invocation.getStatus() == functions.FunctionInvocationStatus.ERROR) {
            throw new CalloutException( (invocation.getError() != null ? invocation.getError().getMessage(): 'UNKNOWN') );
        }
        String response = invocation.getResponse();
        System.debug('Response from myfunction ' + response);
        responses.add(response);
        
        return responses;
    }

    public class Input {
        @InvocableVariable
        public String recordId;
        @InvocableVariable
        public String title;
        @InvocableVariable
        public String question1;
        @InvocableVariable
        public String question2;
        @InvocableVariable
        public String question3;
        @InvocableVariable
        public String question4;
        @InvocableVariable
        public String question5;
        @InvocableVariable
        public String response1;
        @InvocableVariable
        public String response2;
        @InvocableVariable
        public String response3;
        @InvocableVariable
        public String response4;
        @InvocableVariable
        public String response5;
    }
}