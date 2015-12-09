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
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
OUTPUTDIR="$PWD/build/Release-iphoneos"

# Packaging/Archiving
xcrun -log -sdk iphoneos PackageApplication -v "$OUTPUTDIR/$APP_NAME.app" -o "$OUTPUTDIR/$APP_NAME.ipa"

# Archiving SYM
zip -r "$OUTPUTDIR/$APP_NAME.app.dSYM.zip" "$OUTPUTDIR/$APP_NAME.app.dSYM"

# Uploading ios artifacts
testfairy-uploader --api-key "20033978c7355cf77822363c6c310202f2d5937e" \
                   "$OUTPUTDIR/${APP_NAME}.ipa"

# upload android release to testfairy
testfairy-uploader --api-key "20033978c7355cf77822363c6c310202f2d5937e" \
                   --keystore="$PWD/tasks/certs/release-key.keystore" \
                   --storepass="$KEYSTORE_PASSWORD" \
                   --alias="$KEY_ALIAS" \
                   "$PWD/android/app/build/outputs/apk/app-release.apk"
