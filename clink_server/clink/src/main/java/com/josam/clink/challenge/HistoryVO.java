package com.josam.clink.challenge;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class HistoryVO {
	
	private String transaction_datetime;
	private String account_no;
	private String bank_code;
	private String user_no;
	private BigDecimal transaction_amount;
	private String transaction_info_content;
	private String transaction_code;
	private String history_delete_yn;
	
	private String register_datetime;
	private String register_id;
	private String update_datetime;
	private String update_id;
	
	private String startDate;
	private String endDate;
}
