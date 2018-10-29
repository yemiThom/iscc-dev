# Applozic Cordova PhoneGap Chat Plugin

Applozic powers real time messaging across any device, any platform & anywhere in the world. Integrate our simple SDK to engage your users with image, file, location sharing and audio/video conversations.

Signup at https://www.applozic.com/signup.html to get the application key.



## Using
    
Install the plugin

    $ cordova plugin add https://github.com/AppLozic/Applozic-Cordova-PhoneGap-Chat-Plugin.git
    

## Android
Open /platforms/android/ folder in Android Studio.
If you see gradle wrapper error then open gradle/wrapper/gradle-wrapper.properties
Change distributionUrl to point to 2.14.1-all
distributionUrl=https\://services.gradle.org/distributions/gradle-2.14.1-all.zip


## iOS

Open /platforms/ios/Applozic.xcodeproj in Xcode.
Verify if the Applozic.framework is added in "Embedded Binaries". If not, then add it to the "Embedded Binaries" by clicking the + button under Project General Settings -> Embedded Binaries.
Remove duplicate entry from "Linked Framework and Libraries" if any.



### Steps to integrate:


#### Login/Register User
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

#### Launch Chat


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


#### Contact List

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
Set the following in applozic-settings.json properties file.
```
"registeredUserContactListCall": false,
"startNewButton": true,
```


#### Push Notification Setup

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


#### Group
   ##### Create Group
   ```
     var group = {
            	'groupName': 'hey',
            	'groupMemberList': ['userid1', 'userid2', 'userid3'], // Pass list of user Ids in groupMemberList
            	'imageUrl': 'https://www.applozic.com/favicon.ico',
            	'type' : 1,    //'type' : 1, //(required) 1:private, 2:public, 5:broadcast,7:GroupofTwo
            	'metadata' : {
            		'key1' : 'value1',
            		'key2' : 'value2'
            	}
            };
     applozic.createGroup(group, function() {}, function() {});
  ```

#### Logout

```
applozic.logout(function() {console.log("success");}, function () {console.log("error");});
```



Install iOS or Android platform

    cordova platform add ios
    cordova platform add android
    
Run the code

    cordova run 

## More Info

For more information on setting up Cordova see [the documentation](http://cordova.apache.org/docs/en/latest/guide/cli/index.html)

For more info on plugins see the [Plugin Development Guide](http://cordova.apache.org/docs/en/latest/guide/hybrid/plugins/index.html)
