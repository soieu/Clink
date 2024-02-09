package com.josam.clink.challenge;

import java.math.BigDecimal;
import java.util.List;

import lombok.Data;

@Data
public class ChallengePageVO {
	
	private String challengeId;
	private String userNo;
	private String title;
	private String description;
	private BigDecimal goal;
	private BigDecimal value; //오늘 사용한 금액
	private List<HistoryVO> today; //오늘자 거래내역
	private List<ChartVO> chart; //일주일치 거래내역
	private List<ChartVO> chart1; //일주일치 거래내역
}
