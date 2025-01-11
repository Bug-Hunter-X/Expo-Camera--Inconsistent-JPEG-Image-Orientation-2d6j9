# Expo Camera JPEG Orientation Bug

This repository demonstrates a bug in the Expo Camera API where captured JPEG images sometimes have incorrect orientation.  The issue appears to be inconsistent, occurring on some devices and under certain conditions but not others.  This can lead to rotated images in your application.

## Bug Description

When using `expo-camera` to take a picture in JPEG format, the resulting image may be rotated 90, 180, or 270 degrees.  This is not consistent across devices or even across multiple captures on the same device.  The issue does not appear to be consistently reproducible, making it difficult to debug.

## Reproduction

1. Clone this repository.
2. Run `npm install` or `yarn install`.
3. Run the app on a physical device (emulators are less likely to show the issue).
4. Capture multiple images and observe the orientation inconsistencies.

## Potential Solution (bugSolution.js)

The solution involves manually correcting the orientation using the Exif data embedded in the JPEG image. This requires a library like `exif-js` which is included in `bugSolution.js`.

## Note:

This bug highlights the challenges of working with camera hardware and image metadata across different devices.  The inconsistency makes reliable image orientation a problem that requires a workaround.