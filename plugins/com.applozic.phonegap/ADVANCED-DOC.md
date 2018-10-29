Refer to the below documentation for a deeper integration if you wish to perform some chat related functions directly from your app's interface without using the Applozic UI toolkit:

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
  
  ##### Add Group Member
  ```
    var groupDetails = {
        'groupId': GROUP_ID,
        'clientGroupId': CLIENT_GROUP_ID, //use either groupId or clientGroupId
        'userId': USER_ID_TO_ADD
    }
    applozic.addGroupMember(groupDetails, function() {}, function() {});
  ```
  
  
  ##### Remove Group Member
  ```
    var groupDetails = {
        'groupId': GROUP_ID,
        'clientGroupId': CLIENT_GROUP_ID, //use either groupId or clientGroupId
        'userId': USER_ID_TO_ADD
    }
    applozic.removeGroupMember(groupDetails, function() {}, function() {});
  ```

#### Topic Based Chat

    ```
       var topicDetail = {
                        'title': 'Hyundai Electric i20', // Product title
                        'subtitle': 'electric car',      // Product subTitle or Product Id
                        'link': 'https://www.applozic.com/assets/resources/images/applozic_logo.gif',  // Product image link
                        'key1': 'Mileage: ',  // Small text anything like Qty (Optional)
                        'value1': '18 kmpl',  // Value of key1 ex-10 (number of quantity) Optional
                        'key2': 'Price: ',    // Small text anything like MRP (product price) (Optional)
                        'value2': '$50k'   // Value of key2 ex-$100  (Optional)
                    };
                    var conversation = {
                        'topicId': 'topic-11', //Unique topic id
                        'userId': 'demouser', //SET UserId for which you want to launch chat or conversation,
                       // 'groupId': groupKey,  // Set groupId for which you want to launch chat, use either userId or groupId
                        'topicDetail': JSON.stringify(topicDetail)
                    };
                    
                    applozic.startTopicBasedChat(conversation, function() {}, function() {});
    ```


### Unread count


#### Total unreadcount

```
   applozic.getUnreadCount(function(response){
     var count = response;
    },
    function(error){alert(error)
   });

```

#### Unread count for user

```
   var userId = 'USER_ID'; //pass UserId with which unread count 
   applozic.getUnreadCountForUser(userId,function(response){
     var count = response;
    },
    function(error){alert(error)
   });

```


#### Unreadcount for group

```
   var groupId = 'GROUP_ID'; // pass groupId in which unreadcount required

  applozic.getUnreadCountForGroup(groupId,function(response){
       var count = response;
    },
     function(error){
    });

```
