sfdx force:org:create -f config/functions-scratch-def.json -a orm
sfdx force:source:push
sfdx automig:load -d ./data
sfdx shane:user:password:set -p salesforce1 -g User -l User
sfdx force:user:permset:assign -n orm_app
sfdx force:org:open

# Test command
# echo "GenerateRiskDoc.test('Alice');" | sfdx force:apex:execute -f /dev/stdin