package com.josam.clink.communityManager;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class CommentVO {
	private int comment_id;
	private int board_no;
	private String comment_content;
	private Timestamp register_datetime;
	private String register_id;
	private Timestamp update_datetime;
	private String update_id;
	private int parent_id;
	private String photo_url;
	private String user_no;
}
