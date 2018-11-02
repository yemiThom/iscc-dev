### Add Applozic Chat to existing App



#### Step 1: Install Chat Plugin

Install the plugin

```
    $ cordova plugin add https://github.com/AppLozic/Applozic-Cordova-Ionic-PhoneGap-Chat-Plugin.git
```    
    
Note: For Ionic, use 

```
    $ ionic cordova plugin add https://github.com/AppLozic/Applozic-Cordova-Ionic-PhoneGap-Chat-Plugin.git
``` 

Plugin works only on android and iOS, for web (browser) support, check the javascript plugin at:
	https://www.applozic.com/docs/web-chat-plugin.html

##### Android

Open /platforms/android/ folder in Android Studio.
If you see gradle wrapper error then open gradle/wrapper/gradle-wrapper.properties
Change distributionUrl to point to 2.14.1-all
distributionUrl=https\://services.gradle.org/distributions/gradle-2.14.1-all.zip


##### iOS

Open /platforms/ios/YOUR_PROJECT_NAME.xcodeproj in Xcode.
Verify if the Applozic.framework is added in "Embedded Binaries". If not, then add it to the "Embedded Binaries" by clicking the + button under Project General Settings -> Embedded Binaries.
Remove duplicate entry from "Linked Framework and Libraries" if any.



#### Step 2: Login/Register User

```js
    var alUser = {
            'userId' : userId,   //Replace it with the userId of the logged in user
            'password' : password,  //Put password here
            'authenticationTypeId' : 1,
            'applicationId' : 'applozic-sample-app',  //replace "applozic-sample-app" with Application Key from Applozic Dashboard
            'deviceApnsType' : 0    //Set 0 for Development and 1 for Distribution (Release)
        };

   applozic.login(alUser, function() {
       applozic.registerPushNotification(function() {}, function(){});
       applozic.launchChat(function() {}, function() {});
   }, function() {});
```

NOTE: Call it after the platform is ready, for example:

```
	platform.ready().then(() => {
  		 var alUser = {
            'userId' : 'debug3',   //Replace it with the userId of the logged in user
            'password' : 'debug3',  //Put password here
            'authenticationTypeId' : 1,
            'applicationId' : 'applozic-sample-app' //replace "applozic-sample-app" with Application Key from Applozic Dashboard
        };

	   applozic.login(alUser, function() {
	        		applozic.launchChat(function() {}, function() {});
	        	}, function() {});
    });
```

#### Step 3: Launch Chat


##### Main Chat screen

```
applozic.launchChat(function() {console.log("success");}, function () {console.log("error");});
```

##### Launch Chat with a specific User

```
applozic.launchChatWithUserId(userId, function() {console.log("success");}, function () {console.log("error");});
```

##### Launch Chat with specific Group 

```
applozic.launchChatWithGroupId(groupId, function() {console.log("success");}, function () {console.log("error");});
```


#### Step 4: Contact List

```
applozic.showAllRegisteredUsers(false, function() {}, function() {});
// create a contacts array and pass it to addContacts function. Below is the sample:               
var contacts = [
                    {'userId' : 'adarsh', 'displayName' : 'Adarsh Kumar'}, 
                    {'userId' : 'ranjeet', 'displayName' : 'Ranjeet Priyadarshi'}
                ];
applozic.addContacts(contacts, function() {}, function() {});
```


##### Android
Set the following in platforms/android/assets/applozic-settings.json properties file.
```
"registeredUserContactListCall": false, // set to true for displaying all registered users in the contact list
"startNewButton": true,
```


#### Step 5: Push Notification Setup

##### Android
   Goto /platforms/android/build.gradle
   Add the following under buildscript -> dependencies
   ```
   classpath 'com.google.gms:google-services:3.0.0'
   ```
   
   Add the following at the bottom of the file:
   ```
   apply plugin: 'com.google.gms.google-services'
   ```
   
   After adding, it will look something like this:
   ```
   buildscript {
       repositories {
           mavenCentral()
           jcenter()
       }
       
       // Switch the Android Gradle plugin version requirement depending on the
       // installed version of Gradle. This dependency is documented at
       // http://tools.android.com/tech-docs/new-build-system/version-compatibility
       // and https://issues.apache.org/jira/browse/CB-8143
       dependencies {
          classpath 'com.android.tools.build:gradle:2.2.1'
          classpath 'com.google.gms:google-services:3.0.0'
       }
   }

   apply plugin: 'com.google.gms.google-services'
   ```
    
   From login success callback, call applozic.registerPushNotification(function() {}, function(){});
   
   For push notifications, you must have a Firebase account: 
   Signup to https://console.firebase.google.com/ and create your application and generate push notification services file.
   
   Download google-services.json from your Firebase Console and paste it to /platforms/android/ folder
   
   Go to Applozic Dashboard, update the FCM/GCM Server Key from Firebase account to your Applozic application.
   "Edit Application -> Push Notification -> Android -> FCM/GCM Server Key"



##### iOS
    
   Open AppDelegate.m file under /platforms/ios/YOUR_PROJECT/Classes/
   Add code as mentioned in the following documentation:
   https://www.applozic.com/docs/ios-chat-sdk.html#step-4-push-notification-setup



#### Step 6: Logout

```
applozic.logout(function() {console.log("success");}, function () {console.log("error");});
```
