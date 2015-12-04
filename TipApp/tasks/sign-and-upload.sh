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
PROVISIONING_PROFILE="$HOME/Google Drive/iOS/TipApp_Ad_Hoc.mobileprovision"
OUTPUTDIR="$PWD/build/Release-iphoneos"
CERTIFICATE="iPhone Distribution: Fuzu Li (7RAR9E88NY)"

xcrun -v -log -sdk iphoneos PackageApplication "$OUTPUTDIR/$APP_NAME.app" -o "$OUTPUTDIR/$APP_NAME.ipa" -sign "$CERTIFICATE" -embed "$PROVISIONING_PROFILE"

#

# # CERTIFICATE="iOS Distribution: Fuzu Li"
# # unzip the ipa
# unzip -q "$OUTPUTDIR/$APP_NAME.ipa"
# # remove the signature
# rm -rf Payload/*.app/_CodeSignature Payload/*.app/CodeResources
# # replace the provision
# cp "$PROVISIONING_PROFILE" Payload/${APP_NAME}.app/embedded.mobileprovision
# # sign with the new certificate (--resource-rules has been deprecated OS X Yosemite (10.10), it can safely be removed)
# /usr/bin/codesign -f -s "$CERTIFICATE" Payload/*.app
# # zip it back up
# zip -qr $OUTPUTDIR/${APP_NAME}_signed.ipa Payload

# # zipping dSYM for testfairy upload
# ( cd $OUTPUTDIR ; zip -r -X "$OUTPUTDIR/$APP_NAME.app.dSYM.zip" *.dSYM )

# # upload to testfairy
# testfairy-uploader --api-key "20033978c7355cf77822363c6c310202f2d5937e" $OUTPUTDIR/${APP_NAME}.ipa 