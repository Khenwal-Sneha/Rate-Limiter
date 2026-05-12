package com.demo.ratelimiter.service;

import java.util.HashMap;

import org.springframework.stereotype.Service;

@Service
public class RateLimiterService {
    private static final int MAX_REQUESTS=5;
    private static final long WINDOW_SIZE_MS=60*1000; //in ms

    private final HashMap<String,UserRequestInfo> userRequestMap=new HashMap<>();

    public boolean allowRequest(String userId){
        long currentTime=System.currentTimeMillis();

        //If new user
        if(!userRequestMap.containsKey(userId)){
            userRequestMap.put(userId,new UserRequestInfo(1,currentTime));
            return true;
        }

        int reqCount=userRequestMap.get(userId).getRequestCount();
        long startTime=userRequestMap.get(userId).getWindowStartTime();


        //If window is completed
        if(startTime-currentTime > WINDOW_SIZE_MS){
            userRequestMap.put(userId,new UserRequestInfo(1,currentTime));
            return true;
        }

        //If window is not completed
        if(reqCount<MAX_REQUESTS){
            userRequestMap.get(userId).setRequestCount(reqCount+1);
            return true;
        }

        // If we do this then it will not be proper implementation as, if again request is sent before completion of window,then it will give true which should not be the case
        // userRequestMap.remove(userId);
        return false;
    }
}
