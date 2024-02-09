package com.josam.clink.communityPost;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface CommunityPostMapper {
	public String testss();
	public List<CommunityPostVO> getPostsbyRecent(Map<String, Object> parameters);
	public List<CommunityPostVO> getPostsbyLike(@Param("category_no")String category_no,@Param("hashtag") String hashtag);
	public List<CommunityPostVO> getBestPosts();
	public List<CommunityPostVO> list();
	public List<CommunityPostVO> freeList(); 
	public List<CommunityPostVO> infoList(); 
	public List<CommunityPostVO> annList();
	public List<String> getHashtag(int category_no);
	public int getLastBoardNo(Map<String, Object> parameters);
	public int getBoardCount(Map<String, Object> parameters);
	
}
