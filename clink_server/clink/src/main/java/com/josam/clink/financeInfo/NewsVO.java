package com.josam.clink.financeInfo;

import lombok.Data;

@Data
public class NewsVO {
	private String news_title;
	private String news_link;
	private String news_img;
	
	public NewsVO(String href,String img,String title) {
		this.news_link=href;
		this.news_img=img;
		this.news_title=title;
	}
	
}
