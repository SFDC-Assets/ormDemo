sfdx shane:org:create -f config/project-scratch-def.json -d 30 -s --userprefix operational -o risk.mgmt
sfdx force:source:push
sfdx automig:load ./data
sfdx shane:user:password:set -p salesforce1 -g User -l User
sfdx force:user:permset:assign -n orm_app
sfdx force:org:open

