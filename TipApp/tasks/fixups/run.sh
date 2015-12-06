#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
# http://stackoverflow.com/questions/26497863/xcode-6-1-error-while-building-ipa/26499526#26499526
# http://cutting.io/posts/packaging-ios-apps-from-the-command-line/
cp "$DIR/PackageApplication" "/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/usr/bin/PackageApplication"
