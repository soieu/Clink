package com.josam.clink.user;

import lombok.Data;

@Data
public class User_SNS_DetailVO {
	private char sns_code;
	private char user_no;
	private String sns_token_value;
	private char register_datetime;
	private String register_id;
	private char update_datetime;
	private String updater_id;
}
