package com.josam.clink.communityManager;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.josam.clink.communityPost.CommunityPostVO;

@Mapper
public interface CommunityManagerMapper {
	
	public CommunityPostVO getPost(int board_no); 
	public void updateBoard(CommunityPostVO cpvo);
	public void insertComment(CommentVO cvo);
	public int getCommentId();
	public void deleteBoard(int board_no);
	public void deleteComment(int comment_id);
	public List<CommentVO> getComment(int board_no);
	public void insertPost(CommunityPostVO pvo);

	public void insertHashtag(String category_no,String hashtag,int boardNo);
	public void insertLike(LikeVO lvo);
	public void plusLike(int board_no);
	public void deleteLike(LikeVO lvo);
	public void minusLike(int board_no);
	public int getLike(String user_id, int board_no);
	public int getCommentCount(int board_no);

	public int getBoardNo();

	public int getBoardViews(int board_no);
	public void updateBoardViews(int getBoardViews,int board_no);
	public int hasReply(int parent_id);

}
