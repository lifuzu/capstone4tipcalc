#!/usr/bin/env bash

# Don't need to change versionName so far, since TestFairy has a format like: 1.0.1#16

# versionName=`cat app/build.gradle | grep "^versionCode=" | awk -F= '{print $2}' | tr -d ' '`
# newVersionCode=`expr $oldVersionCode + 1`
# echo "New version code: $newVersionCode"

# cat gradle.properties | sed "s/^versionCode=$oldVersionCode/versionCode=$newVersionCode/g" > gradle.properties.new
# mv gradle.properties.new gradle.properties
# git add gradle.properties
# git commit -m "NO-JIRA: Increment versionCode to $newVersionCode"
# git push origin ${BRANCH}:${BRANCH}