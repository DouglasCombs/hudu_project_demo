#import "AppDelegate.h"
#import <Firebase.h> // <- FIREBASE
#import <FBSDKCoreKit/FBSDKCoreKit-swift.h> // <- FACEBOOK
#import <React/RCTBundleURLProvider.h>
#import <React/RCTBridge.h>
#import <GoogleMaps/GoogleMaps.h>
#import <React/RCTI18nUtil.h>

@implementation AppDelegate

 // <- FACEBOOK
- (BOOL)application:(UIApplication *)application openURL:(nonnull NSURL *)url options:(nonnull NSDictionary<NSString *,id> *)options {
  return [[FBSDKApplicationDelegate sharedInstance] application:application openURL:url options:options];
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [GMSServices provideAPIKey:@"AIzaSyB4MfDPM7eiAftxCK2EFMI_tRzsy4rK90Y"];  // <- GOOGLE MAPS

  // Enable forceRTL before creating the RCTBridge object
  [[RCTI18nUtil sharedInstance] allowRTL:NO];
  [[RCTI18nUtil sharedInstance] forceRTL:NO];

  // <- FIREBASE \/
  [FIRApp configure];
  // <- FIREBASE --- /\
  
  self.moduleName = @"Hudu";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  // <- FACEBOOK
  [[FBSDKApplicationDelegate sharedInstance] application:application
                         didFinishLaunchingWithOptions:launchOptions];

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
