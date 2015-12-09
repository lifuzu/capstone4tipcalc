#!/bin/sh
# if [[ "$TRAVIS_PULL_REQUEST" != "false" ]]; then
#   echo "This is a pull request. No deployment will be done."
#   exit 0
# fi
# if [[ "$TRAVIS_BRANCH" != "master" ]]; then
#   echo "Testing on a branch other than master. No deployment will be done."
#   exit 0
# fi

#PROVISIONING_PROFILE="$HOME/Library/MobileDevice/Provisioning Profiles/$PROFILE_NAME.mobileprovision"
PROVISIONING_PROFILE="$PWD/tasks/profile/TipApp_Ad_Hoc.mobileprovision"
OUTPUTDIR="$PWD/build/Release-iphoneos"
CERTIFICATE="iPhone Distribution: Fuzu Li (7RAR9E88NY)"

xcrun -log -sdk iphoneos PackageApplication -v "$OUTPUTDIR/$APP_NAME.app" -o "$OUTPUTDIR/$APP_NAME.ipa"
# -sign "$CERTIFICATE" -embed "$PROVISIONING_PROFILE"

# upload ios to testfairy
testfairy-uploader --api-key "20033978c7355cf77822363c6c310202f2d5937e" "$OUTPUTDIR/${APP_NAME}.ipa"

# upload android release to testfairy
testfairy-uploader --api-key "20033978c7355cf77822363c6c310202f2d5937e" --keystore="$PWD/tasks/certs/release-key.keystore" --storepass="$KEYSTORE_PASSWORD" --alias="$KEY_ALIAS" "$PWD/android/app/build/outputs/apk/app-release.apk"