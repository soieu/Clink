package com.josam.clink.main;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.josam.clink.challenge.ChallengeVO;
import com.josam.clink.challenge.SuccessVO;
import com.josam.clink.user.User_MasterVO;

@Mapper
public interface MainMapper {
	
	BadgeVO getBadge (User_MasterVO vo);
	QuoteVO getQuote ();
	List<StreakdataVO> getStreakData(ChallengeVO vo);
	SuccessVO getYesterdaySaving(ChallengeVO vo);
	SuccessVO getTotalSaving(ChallengeVO vo);
	ReportVO getReportData(User_MasterVO vo);
	ReportVO getCategoryData(User_MasterVO vo);
}
