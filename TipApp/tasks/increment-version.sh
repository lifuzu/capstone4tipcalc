#!/usr/bin/env bash
if [[ "$TRAVIS_PULL_REQUEST" != "false" ]]; then
  echo "This is a pull request. No deployment will be done."
  exit 0
fi
if [[ "$TRAVIS_BRANCH" != "master" ]]; then
  echo "Testing on a branch other than master. No deployment will be done."
  exit 0
fi

# Versioning
# https://developer.apple.com/library/ios/qa/qa1827/_index.html
## Printing the current version
agvtool what-version

## Upgrade the version and reset build number
# agvtool new-marketing-version 2.0
# agvtool new-version -all 1

## Upgrade build number
# agvtool new-version -all <any_version>
agvtool next-version -all