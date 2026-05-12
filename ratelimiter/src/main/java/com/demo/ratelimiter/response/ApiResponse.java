package com.demo.ratelimiter.response;

public class ApiResponse {
    private String message;
    private int status;
    private long timestamp;
    private int remRequests;

    public ApiResponse(String message,int status,long timestamp,int remRequests){
        this.message=message;
        this.status=status;
        this.timestamp=timestamp;
        this.remRequests=remRequests;
    }

    public String getMessage(){
        return message;
    }

    public int getStatus(){
        return status;
    }

    public long getTimeStamp(){
        return timestamp;
    }

    public int getRemRequests(){
        return remRequests;
    }
}
