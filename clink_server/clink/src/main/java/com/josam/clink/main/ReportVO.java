package com.josam.clink.main;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class ReportVO {
	

	BigDecimal yesterday_saving; //어제 저축 금액
	BigDecimal total_saving; // 전체 저축 금액

	String yesterday; //어제 날짜
	BigDecimal yesterday_used; //어제 사용 금액
	BigDecimal sum; // 총 사용 금액
	BigDecimal high; // 가장 비싼 결제
	BigDecimal low; // 가장 저렴한 결제
	BigDecimal avg; // 평균 결제 금액
	
	String category;	//가장 많이 사용한 카테고리
	String categoryAmount;	// 카테고리사용금액
}
