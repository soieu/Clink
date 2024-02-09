package com.josam.clink.challenge;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.josam.clink.user.User_MasterVO;

@Mapper
public interface ChallengeMapper {
	
	List<HistoryVO> getALLHistory(User_MasterVO vo);
	List<SuccessVO> getAllHistoryForInsertSuccess(User_MasterVO vo);
	int insertSuccess(SuccessVO svo);
	ChallengeVO myChallenge(User_MasterVO vo);
	List<HistoryVO> todayHistory(User_MasterVO vo);
	List<HistoryVO> yesterdayHistory(User_MasterVO vo);
	List<ChartVO> weekHistory(User_MasterVO vo);
	List<HistoryVO> selectedHistory(HistoryVO vo);
	int deleteHistory(HistoryVO vo);
	int updateHistory(HistoryVO vo);


	//챌린지를 등록
	void registerChallenge(ChallengeVO cvo);
	int checkChallenge(String userNo);
}
