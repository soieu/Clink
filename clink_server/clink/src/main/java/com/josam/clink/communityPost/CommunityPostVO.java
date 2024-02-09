package com.josam.clink.communityPost;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class CommunityPostVO {
	private int board_no;
	private String user_no;
	private String category_no;
	private int board_views;
	private String board_title;
	private String board_content;
	private int board_like_count;
	private String hashtag_content;
	private Timestamp register_datetime;
	private String register_id;
	private Timestamp update_datetime;
	private String update_id;
	private int comment_count;
	private String photo_url;
}
