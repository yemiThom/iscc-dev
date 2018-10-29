Applozic provide easy settings to customise your ui themes color, pop-up messages etc. You need to follow below steps to enable/change these settings:


### Android

 **1**. Download applozic-settings.json file from here [Json file](https://github.com/AppLozic/Applozic-Android-SDK/tree/master/app/src/main/assets/applozic-settings.json)
 
 **2**. Create a assets directory in app-->main and paste that applozic-settings.json file in assets directory
 
#### Applozic settings  Json Properites detail



  
| Properites | Sample Value | Description |
| ---------- | ------| ----------- |
| sentMessageBackgroundColor | Color hex (#FF03A9F4) |  Sent message chat bubble color |
| receivedMessageBackgroundColor| Color hex (#FFFFFFFF) | Received message chat bubble color |
| sendButtonBackgroundColor | Color hex (#FF03A9F4) | Send button background color |
| attachmentIconsBackgroundColor | Color hex (#FF03A9F4) |Attachment icons background color |
| channelCustomMessageBgColor | Color hex (#cccccc) | Group add,remove,left message background color |
| sentContactMessageTextColor | Color hex (#FFFFFFFF) | Sent contact message text color |
| receivedContactMessageTextColor| Color hex (#000000)|Received contact message text color |
| sentMessageTextColor | Color hex (#FFFFFFFF) | Sent message text color |
| receivedMessageTextColor | Color hex (#000000) |  Received message text color |
| messageEditTextTextColor | Color hex (#000000) | Edit text text color |
| sentMessageLinkTextColor | Color hex (#5fba7d) |  Sent message hyper link text color |
| receivedMessageLinkTextColor | Color hex (#FFFFFFFF) |  Received message hyper link text color |
| messageEditTextHintTextColor | Color hex (#bdbdbd) | Edit text hint text color |
| noConversationLabelTextColor | Color hex  (#000000) | No Conversation Label text color |
| conversationDateTextColor | Color hex (#333333) | Message data text color |
| conversationDayTextColor | Color hex  (#333333) | Message day text color |
| messageTimeTextColor | Color hex  (#838b83) |    Message time text color |
| channelCustomMessageTextColor | Color hex (#666666) |  Group add,remove,left message text color |
| sentMessageBorderColor | Color hex  (#FF03A9F4) |Sent Message chat bubble border color |
| receivedMessageBorderColor | Color hex  (#FFFFFFFF )| Received message chat bubble border color |
| channelCustomMessageBorderColor | Color hex  (#cccccc) |Group add,remove,left message border color |
| noConversationLabel| String | No  conversation text label |
| noSearchFoundForChatMessages | String | No search found text label |
| totalRegisteredUserToFetch | int (Prefered 100)| Total Registerer User to get from server for conatct list |
| maxAttachmentAllowed | int (Prefered 10) | Maximum attachment allowed to attch while sending Multiple attchemnets |
| locationShareViaMap | true/false | Location share activity |
| startNewFloatingButton | true/false |Start New Conversation Plus (+) FloatingActionButton |
| startNewButton | true/false | Start New Conversation Plus (+) Button |
| onlineStatusMasterList | true/false | Online status Green Dot in Chat list |
| startNewGroup | true/false | Create group  option | 
| inviteFriendsInContactActivity | true/false | Invite friends button in Conatct list when no contcats are there |
| registeredUserContactListCall | true/false | Registered users contact list call |
| createAnyContact | true/false | Launch a chat with any user in contact list | 
| userProfileFragment |  true/false | Show other user profile on click of App bar|
| messageSearchOption | true/false | Message search option |
| hideGroupAddMembersButton | true/false | Hide the add memeber option in group |
| hideGroupNameUpdateButton | true/false | Hide group name and group image change option  in group |
| hideGroupExitButton | true/false | Hide group exit option button in group |
| hideGroupRemoveMemberOption | true/false | Hide remove member option  from group |
| profileOption | true/false | Show and hide the profile option |
| restrictedWordMessage | String | Restricted words are not allowed |
| hideAttachmentButton | true/false | Show and hide media attachment button |

#### Customizing attachment options.

You can hide particular attachment options by setting value as **false** in attachmentOptions in applozic-settings.json file. 
```
"attachmentOptions": {
      ":location": true,
      ":camera": true,
      ":file": true,
      ":audio": true,
      ":video": true,
      ":contact": true
    }
```
Example : to hide location option in attachment set **":location": false**. 



