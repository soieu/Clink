package com.josam.clink.challenge;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class ChallengeVO {
	private String challenge_no;
	private String user_no;
	private String challenge_title;
	private String challenge_description;
	private BigDecimal challenge_amount;
	
	private String register_datetime;
	private String	register_id;
	private String update_datetime;
	private String update_id;
	
	private String from;
	private String to;
}
