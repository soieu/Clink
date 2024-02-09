package com.josam.clink.main;

import java.util.List;

import com.josam.clink.challenge.SuccessVO;

import lombok.Data;

@Data
public class MainPageVO {
	
	String user_no;
	BadgeVO badge;
	QuoteVO quote;
	StreakVO streakData;
	ReportVO report;
//	List<MonthDataVO> monthData;
//	DataVO vo;

	// 받는 값 :
	// userid / 퀴리조회를 위한 아이디 받기

	// 보내는 값 :

	// 사용자 이름
	// random quote,
	// 4month data Map,

	// 연속날짜 계산 결과 (4month data로 계산한 결과)
	// 전체 저축할 금액
	// 어제 레포트
	// 사용금액
	// max() sum()
}
