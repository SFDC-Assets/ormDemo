sfdx force:org:create -f config/functions-scratch-def.json -a orm
sfdx force:source:push
sfdx automig:load -d ./data
sfdx shane:user:password:set -p salesforce1 -g User -l User
sfdx force:user:permset:assign -n orm_app
sfdx force:user:permset:assign -n Functions
sfdx force:user:create -f users/user1.xml
sfdx force:user:create -f users/user2.xml
sfdx force:user:create -f users/user3.xml
sfdx force:org:open

## Login to functions
# sf login functions
## Create functions environment
# sf env create compute -o orm -a docGenCompute
## commit functions first
# sf deploy functions -o orm
## 
# 

# Test command
# echo "GenerateRiskDoc.test('Alice');" | sfdx force:apex:execute -f /dev/stdin
# sf env log tail -e docGenCompute