#!/usr/bin/env bash

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