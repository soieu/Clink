package com.josam.clink.financeInfo.Controller;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.JsonObject;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONObject;


public class GptTest {
	
	
	/**
	 *chatGPT를 이용한 뉴스 리스트생성
	 **/
	public String gptTest(List<String> newsTitleList,String apikey) throws IOException{//
		
		String ep="https://api.openai.com/v1/chat/completions";

		JSONObject payload = new JSONObject();
		JSONObject message = new JSONObject();
		JSONArray messages =new JSONArray();
			
		message.put("role", "user");
		message.put("content",newsTitleList+ "위의 기사제목들 중에 전혀 다른 제목으로 10개를 제목을 제외한 인덱스 번호만 뽑아줘 ");
		messages.put(message);
			
		payload.put("model", "gpt-3.5-turbo");
		payload.put("messages", messages);
		payload.put("temperature", 0.7);

		StringEntity inputEntity = new StringEntity(payload.toString(),ContentType.APPLICATION_JSON);
			    
		HttpPost post =new HttpPost(ep);
		post.setEntity(inputEntity);
		post.setHeader("Authorization","Bearer " + apikey);

		post.setHeader("Content-Type", "application/json");
			
		HttpClient httpClient= HttpClients.createDefault();
		HttpResponse response = httpClient.execute(post);
		HttpEntity entity = response.getEntity();
			
			
		String resJsonString = new String(entity.getContent().readAllBytes(), StandardCharsets.UTF_8);
	    JSONObject resJson = new JSONObject(resJsonString).getJSONArray("choices").getJSONObject(0);
	        
	    String newsIndex = resJson.getJSONObject("message").getString("content");

		return newsIndex;
	}
}
