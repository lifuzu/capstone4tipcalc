#!/usr/bin/env bash

## Record the upgraded build number
VERSION=`agvtool what-marketing-version | grep Found | cut -d ' ' -f 4 | tr -d '"'`
BUILD=`agvtool what-version | grep -E '\d+' | cut -d ' ' -f 5`

#[ -z "$1" ] && ( echo 'Please input a comment.'; exit 1;)
# Add all changes which should be checked in soon
git add .
# Commit the change with the comment
git commit -m "Upgrade to version $VERSION($BUILD)."
# Push the change
git push origin master
