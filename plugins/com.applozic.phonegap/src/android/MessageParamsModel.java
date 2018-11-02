package com.applozic.phonegap;

/**
 * Created by reytum on 4/9/17.
 */

public class MessageParamsModel {

    Long startTime;
    Long endTime;
    String contactId;
    String searchString;
    Integer channelKey;
    Integer conversationId;
    Long createdAtTime;
    boolean isScroll;
    boolean isSkipRead = false;

    public Long getStartTime() {
        return startTime;
    }

    public void setStartTime(Long startTime) {
        this.startTime = startTime;
    }

    public Long getEndTime() {
        return endTime;
    }

    public void setEndTime(Long endTime) {
        this.endTime = endTime;
    }

    public String getContactId() {
        return contactId;
    }

    public void setContactId(String contactId) {
        this.contactId = contactId;
    }

    public Integer getChannelKey() {
        return channelKey;
    }

    public void setChannel(Integer channelKey) {
        this.channelKey = channelKey;
    }

    public Integer getConversationId() {
        return conversationId;
    }

    public void setConversationId(Integer conversationId) {
        this.conversationId = conversationId;
    }

    public boolean isSkipRead() {
        return isSkipRead;
    }

    public void setSkipRead(boolean skipRead) {
        isSkipRead = skipRead;
    }

    public void setSearchString(String searchString) {
        this.searchString = searchString;
    }

    public String getSearchString() {
        return searchString;
    }

    public void setCreatedAtTime(Long createdAtTime) {
        this.createdAtTime = createdAtTime;
    }

    public Long getCreatedAtTime() {
        return createdAtTime;
    }

    public void setIsScroll(boolean isScroll){
this.isScroll = isScroll;
    }

    public boolean getIsScroll(){
        return isScroll;
    }
}
