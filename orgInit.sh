sf demoutil org create scratch -p operational -e risk.mgmt -d 5 -w 60 -f config/project-scratch-def.json -s
sf project deploy start
sfdx automig:load -d ./data
sf demoutil user password set -p salesforce1 -g User -l User
sf org assign permset -n  orm_app
sf org assign permset -n  Functions
sf org open
## Login to functions
# sf login functions
## Create functions environment
# sf env create compute -o orm -a docGenCompute
## commit functions first
# sf deploy functions -o orm
# sf env log tail -e docGenCompute
