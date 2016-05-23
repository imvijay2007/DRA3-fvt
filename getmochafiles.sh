
# !/bin/bash

# This script downloads and posts fvt results to DLMS.

i="0"
INSTANCE_COUNT=$1

tok1=`cf oauth-token`
tok2=$(echo $tok1 | sed -n 's/.*Bearer \(.*\)/\1/p')
tok="bearer $tok2"

if [ -z "$CF_ORG" ]; then
    org='vjegase@us.ibm.com'
else
    org=$CF_ORG
fi
if [ -z "$DLMS_TEST" ]; then
    server='https://dlms.stage1.ng.bluemix.net'
else
    server=$DLMS_TEST
fi

rand=$(cat /proc/sys/kernel/random/uuid)
proj=ResultsDemoDRA_$rand

while [[ $i -lt $INSTANCE_COUNT ]]
do

rm -rf dra3-fvt-download
cf download dra3-fvt app -i $i --omit "app/node_modules; app/tests; app/lib; app/routes; app/vendor; app/.app-management; tmp; rin.pid; logs"
cd dra3-fvt-download/app
#echo 'Contents of instance '$i:
#x=$(cat fvttest.json)

p_response=$(curl -k -X POST --header "Authorization: $tok" --header "Content-Type: multipart/form-data" -F project_name=$proj -F org_name=$org -F lifecycle_stage=unittest -F tool_name=mocha -F artifact_name=fvttest.json -F description="DRA3-fvt's mocha fvt test results." -F contents_type=application/json -F contents=@fvttest.json "$server/v1/results_multipart")
echo $p_response

cd ../..
#echo $x > fvttest_$i.json

i=$((i+1))

done