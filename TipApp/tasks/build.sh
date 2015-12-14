#!/usr/bin/env bash

if [[ "$TRAVIS_PULL_REQUEST" != "false" ]]; then
  echo "This is a pull request. No deployment will be done."
  exit 0
fi
if [[ "$TRAVIS_BRANCH" != "master" ]]; then
  echo "Testing on a branch other than master. No deployment will be done."
  exit 0
fi

APP_NAME="TipApp"

# Building without signature
# xctool -project ios/$APP_NAME.xcodeproj \
#        -scheme $APP_NAME \
#        -sdk iphoneos \
#        -configuration Release \
#        OBJROOT=$PWD/build \
#        SYMROOT=$PWD/build \
#        ONLY_ACTIVE_ARCH=NO \
#        CODE_SIGN_IDENTITY="" \
#        CODE_SIGNING_REQUIRED=NO \
#        clean build

# Building with signature
export CERTIFICATE="iPhone Distribution: Fuzu Li (7RAR9E88NY)"
export SDKROOT="/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs/iPhoneOS9.1.sdk"
xctool -project ios/$APP_NAME.xcodeproj \
       -scheme $APP_NAME \
       -sdk iphoneos \
       -configuration Release \
       OBJROOT=$PWD/build \
       SYMROOT=$PWD/build \
       ONLY_ACTIVE_ARCH=NO \
       CODE_SIGN_IDENTITY="$CERTIFICATE" \
       'PROVISIONING_PROFILE=bda6cdc9-c917-40e8-a9b0-27d0ebb870cc' \
       'CODE_SIGN_RESOURCE_RULES_PATH=$(SDKROOT)/ResourceRules.plist' \
       clean build
unset SDKROOT
unset CERTIFICATE