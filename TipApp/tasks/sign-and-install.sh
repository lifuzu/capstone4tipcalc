#!/usr/bin/env bash

APP_NAME="TipApp"
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
OUTPUTDIR="$PWD/build/Release-iphoneos"

# Packaging/Archiving
xcrun -log -sdk iphoneos PackageApplication -v "$OUTPUTDIR/$APP_NAME.app" -o "$OUTPUTDIR/$APP_NAME.ipa"

# Archiving SYM
#zip -r "$OUTPUTDIR/$APP_NAME.app.dSYM.zip" "$OUTPUTDIR/$APP_NAME.app.dSYM"

# Verify ipa
ipa info "$OUTPUTDIR/$APP_NAME.ipa"

# Install to device
ios-deploy --bundle "$OUTPUTDIR/$APP_NAME.ipa"