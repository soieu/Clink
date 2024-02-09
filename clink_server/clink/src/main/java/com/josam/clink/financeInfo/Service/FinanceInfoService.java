package com.josam.clink.financeInfo.Service;

import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.josam.clink.financeInfo.NewsMapper;
import com.josam.clink.financeInfo.NewsVO;
import com.josam.clink.financeInfo.Controller.GptTest;
import com.twitter.penguin.korean.TwitterKoreanProcessorJava;
import com.twitter.penguin.korean.tokenizer.KoreanTokenizer;
import com.twitter.penguin.korean.tokenizer.KoreanTokenizer.KoreanToken;

import scala.collection.Seq;

@Service
public class FinanceInfoService {

	@Value("${chatGPT.secret.key}")
	private String apiKey;
	
	@Autowired
	NewsMapper nmp;
	
	public List<NewsVO> getNewsData() {
		List<NewsVO> list = nmp.getNewsData();
		return list;
	}


	//@Scheduled(cron = "10 26 0/1 * * *")
	public void run() {
		nmp.deleteNewsData();

	}

	
	//@Scheduled(cron = "10 24 0/1 * * *")
	public void insertNewsData() {
		List<NewsVO> list = new ArrayList<>();
		List<String> newstitleList = new ArrayList<>();	
		try {
			Document doc = Jsoup.connect("https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid1=101&sid2=259").get();
			Elements img = doc.getElementsByAttributeValue("class","photo");
			Elements atag = img.select("a");
			Elements imgtag=atag.select("img");
			for(int i=0;i<atag.size();i++) {
				NewsVO nvo = new NewsVO(atag.get(i).attr("href"),imgtag.get(i).attr("src"),imgtag.get(i).attr("alt"));
				newstitleList.add(i+"."+imgtag.get(i).attr("alt"));
				list.add(nvo);
			}
			GptTest gpt = new GptTest();

			String newsIndex=gpt.gptTest(newstitleList,apiKey);
			String[] al=newsIndex.split(",");
			for(int i=0;i<=al.length;i++) {
				int titleIdx = Integer.parseInt(al[i].trim());
				NewsVO nvo =list.get(titleIdx);
				nmp.insertNewsData(nvo);
			}

		} catch (Exception e) {
		}
	}
}

