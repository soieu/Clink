package com.josam.clink.challenge;

import java.math.BigDecimal;
import java.sql.Timestamp;

import lombok.Data;

@Data
public class SuccessVO {
	
	private String challenge_detail_success_date;
	private String challenge_no;
	private String user_no;
	private BigDecimal challenge_detail_success_amount;
	
	private BigDecimal result_success_amount;
	
	private String register_datetime;
	private String register_id;
	private String update_datetime;
	private String update_id;
}
