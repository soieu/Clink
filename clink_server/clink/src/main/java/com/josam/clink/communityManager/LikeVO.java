package com.josam.clink.communityManager;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class LikeVO {
	private Timestamp register_datetime;
	private String user_id;
	private int board_no;
}
