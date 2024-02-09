package com.josam.clink.challenge;

import java.sql.Timestamp;

import com.josam.clink.user.User_MasterVO;

import lombok.Data;

@Data
public class ExpenseVO {
	
	private int expenseId;
	private int accountId;
	private int userNo;
	private int categoryId;
	private int expenseAmount;
	private Timestamp expenseDate;
	private String expenseDescription;
	
	private String startDate;
	private String endDate;
}
