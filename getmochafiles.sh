
# !/bin/bash

# This script downloads and posts fvt results to DLMS.

i="0"
INSTANCE_COUNT=$1

while [[ $i -lt $INSTANCE_COUNT ]]
do

rm -rf dra3-fvt-download
cf download dra3-fvt app -i $i --omit "app/node_modules; app/tests; app/lib; app/routes; app/vendor; app/.app-management; tmp; rin.pid; logs" --verbose
cd dra3-fvt-download/app
echo '\nContents of instance'$i:
cat fvttest.json > fvttest_$i.json
i=$((i+1))

done