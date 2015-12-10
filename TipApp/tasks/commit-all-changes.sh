#!/usr/bin/env bash

## Record the upgraded build number
VERSION="$( cd ios && agvtool what-marketing-version | grep Found | head -1 | cut -d ' ' -f 4 | tr -d '"' )"
BUILD="$( cd ios && agvtool what-version | grep -E '\d+' | cut -d ' ' -f 5 )"

# Config git user
git config --global user.email "lifuzu@yahoo.com"
git config --global user.name "lifuzu"

# Reset origin with authentication credentials
# http://stackoverflow.com/questions/19845679/build-with-travis-ci-and-push-some-files-folder-to-another-repository
git remote rm origin
git remote add origin https://lifuzu:"${GH_TOKEN}"@github.com/lifuzu/capstone4tipcalc.git

#[ -z "$1" ] && ( echo 'Please input a comment.'; exit 1;)
# Add all changes which should be checked in soon
git add ios/*
# Commit the change with the comment
git commit -m "Upgrade to version $VERSION($BUILD)."
# Push the change
git push origin master
