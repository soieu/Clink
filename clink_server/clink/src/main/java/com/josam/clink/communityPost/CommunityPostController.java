package com.josam.clink.communityPost;

import java.io.IOException;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import org.jsoup.nodes.Document;
import org.apache.ibatis.annotations.Param;

import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import org.jsoup.nodes.Document;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.josam.clink.communityManager.CommunityManagerService;
import com.josam.clink.financeInfo.NewsVO;



@Controller
public class CommunityPostController {
	
	@Autowired
	private CommunityPostService commPService;
	
	@Autowired
	private CommunityManagerService communityManagerService;
	
	@GetMapping("/community/posts")
	@ResponseBody
	public List<CommunityPostVO> getPosts(@RequestParam Map<String, Object> parameters){
		String category_no = (String) parameters.get("category_no");
	    String hashtag = (String) parameters.get("hashtag");
	    String filter = (String) parameters.get("filter");
	    
		List<CommunityPostVO> data = new ArrayList<>();
		
		// 1. category_no = 0 => 베스트 게시판
		if("0".equals(category_no)) {
			data = commPService.getBestPosts();
			return data;
		}
		// 2. category_no != 0 && filter = 1 (최신순)
		if("1".equals(filter)){
			data = commPService.getPostsbyRecent(parameters);
		}
		// 3. category_no != 0 && filter = 2 (인기순)
		if("2".equals(filter)){
			data = commPService.getPostsbyLike(category_no,hashtag);
		}
		return data;
		
	}
	
	@GetMapping("/community/hot-posts")
	@ResponseBody
	public List<Object> getHotPost() throws IOException{
		List<Object> communityInfo =new ArrayList<>();
		communityInfo.add(commPService.getHotPostList()); //최근 인기 게시물 리스
		communityInfo.add(commPService.getFinNewsData());
		return communityInfo;
	}
	
	@GetMapping("/community/hot-hashtag")
	@ResponseBody
	public List<String> getHotHashtag(@RequestParam int category_no) {
		List<String> list=commPService.getHashtag(category_no);
//		System.out.println("이건 카테고리 번호:"+category_no);
		return list;
	}
}
