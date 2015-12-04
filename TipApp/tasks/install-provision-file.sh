#!/usr/bin/env bash
if [ ! $# == 1 ]; then
  echo "Usage: $0 (path/to/mobileprovision)"
  exit
fi

mp=$1

uuid=`grep UUID -A1 -a ${mp}| grep -io "[-A-Z0-9]\{36\}"`

echo "Found UUID $uuid"

output="~/Library/MobileDevice/Provisioning Profiles/$uuid.mobileprovision"

echo "copying to $output.."
#cp "${mp}" "$output"

echo "done"
