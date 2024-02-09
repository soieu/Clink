package com.josam.clink.communityManager;

import java.time.Duration;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.josam.clink.communityPost.CommunityPostVO;

@Controller
@RequestMapping("/community")
public class CommunityManagerController {
	
	@Autowired
	private CommunityManagerService communityManagerService;
	
	
	/**
	 * 
	 * @param board_no 게시물 번호
	 * @return 특정 게시물 번호의 내용 반환
	 */
	@GetMapping(value = {"/post", "/post/update"})
	@ResponseBody
	public Map<String, Object> getPost(@RequestParam int board_no) {
		communityManagerService.updateBoardViews(board_no);
		Map<String, Object> response = new HashMap<> ();
		CommunityPostVO communityPostVO = communityManagerService.getPost(board_no);
		int commentCount = communityManagerService.getCommentCount(board_no);
		
		response.put("communityPostVO", communityPostVO);
		response.put("commentCount", commentCount);
		return response;
	}

	@PostMapping("/post/insert")
	@ResponseBody
	public void insertPost(@RequestBody CommunityPostVO pvo) {
		communityManagerService.insertPost(pvo);
		System.out.println(pvo);
		int boardNo=communityManagerService.getBoardNo();

		String[] hashtag_list=pvo.getHashtag_content().split(",");
		System.out.println();
		for(int i=0;i<hashtag_list.length;i++) {
			System.out.println(hashtag_list[i]);
			communityManagerService.insertHashtag(pvo.getCategory_no(),hashtag_list[i],boardNo);
		}
	}
	
	@PostMapping("/post/update")
	@ResponseBody
	public void updatePost(@RequestBody CommunityPostVO cpvo) {
		cpvo.setUpdate_id(cpvo.getUpdate_id());
		communityManagerService.updateBoard(cpvo);
//		String[] hashtag_list=cpvo.getHashtag_content().split(",");
//		for(int i=0;i<hashtag_list.length;i++) {
//			System.out.println(hashtag_list[i]);
//			communityManagerService.insertHashtag(cpvo.getCategory_no(),hashtag_list[i]);
//		}
	}
	
	/**
	 * 
	 * @param board_no 게시물 번호
	 * @return 특정 게시물 번호에 달린 댓귿들을 list로 반환
	 */
	@GetMapping("/post/comment")
	@ResponseBody
	public List<CommentVO> getComment(@RequestParam int board_no){
		return communityManagerService.getComment(board_no);
	}
	
	/**
	 * 댓글달기
	 * parent_id = comment_id -> 일반댓글
	 * parent_id가 들어온 경우 -> 대댓글
	 * @param vo
	 */
	@PostMapping("/post/comment/insert")
	@ResponseBody
	public void insertComment(@RequestBody CommentVO cvo) {	
		if(0 == cvo.getParent_id()) {
			cvo.setParent_id(communityManagerService.getCommentId()+1); // 현재 달릴 댓글의 id 받아오기 -> 대댓글이 아니면 parent_id와 comment_id 통일시키기
		}
		communityManagerService.insertComment(cvo);
	}
	
	@PostMapping("/post/delete")
	@ResponseBody
	public void deleteBoard(int board_no) {
		// 게시글 생성한 사람만 삭제할 수 있게 예외처리하는걸 여기서해야할까
		// 어차피 프론트엔드 단에서 삭제, 수정 버튼은 생성한 사람만 보이게 할 것
		communityManagerService.deleteBoard(board_no);
	}
	
	@PostMapping("/post/comment/delete")
	@ResponseBody
	public int deleteComment(int comment_id, int parent_id) {
		// hasReply 값이 1이면 -> 삭제 불가, 0이면 삭제 가능
		if(comment_id == parent_id && communityManagerService.hasReply(parent_id) == 1) {
			return 1; 
		} else {
			communityManagerService.deleteComment(comment_id);
			return 0;
		}
	}
	
	@GetMapping("/post/like")
	@ResponseBody
	public int getLike(@RequestParam String user_id, @RequestParam int board_no) {
		return communityManagerService.getLike(user_id, board_no);
	}
	
	@PostMapping("/post/like/insert")
	@ResponseBody
	public void like(LikeVO lvo, int board_no) {
		communityManagerService.like(lvo, board_no);
	}
	
	@PostMapping("/post/like/delete")
	@ResponseBody
	public void unlike(LikeVO lvo, int board_no) {
		communityManagerService.unlike(lvo, board_no);
	}
	
	@GetMapping("/post/updateBoardViews")
	@ResponseBody
	public void updateBoardViews(int board_no) {
		System.out.println("업데이트 뷰"+board_no);
		communityManagerService.updateBoardViews(board_no);
	}
}
	
