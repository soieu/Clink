package com.josam.clink.challenge;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.josam.clink.user.User_MasterVO;

@Service
public class ChallengeService {
	@Autowired
	ChallengeMapper mapper;
	
	public List<SuccessVO> getAllHistoryForInsertSuccess(User_MasterVO vo){
		return mapper.getAllHistoryForInsertSuccess(vo);
	}
	
	public int insertSuccess(SuccessVO vo) {
		return mapper.insertSuccess(vo);
	}
	
	public ChallengeVO myChallenge(User_MasterVO vo) {
		return mapper.myChallenge(vo);
	};
	
	public List<HistoryVO> todayHistory(User_MasterVO vo) {
			
			return mapper.todayHistory(vo);
	}
	
	public List<HistoryVO> yesterdayHistory(User_MasterVO vo) {
		
		return mapper.yesterdayHistory(vo);
}
	
	public List<ChartVO> weekHistory(User_MasterVO vo){
		
		return mapper.weekHistory(vo);
	};
	
	public List<HistoryVO> selectedHistory(HistoryVO vo){
		
		return mapper.selectedHistory(vo);
	};
	
	public int deleteHistory(HistoryVO vo) {
		
		return mapper.deleteHistory(vo);
	};
	public int updateHistory(HistoryVO vo) {
			
		return mapper.updateHistory(vo);
	};
	
	//새로운 챌린지 등록
	public void registerChallenge(ChallengeVO cvo) {
		mapper.registerChallenge(cvo);
	}

	//챌린지가 있는지 체크
	/*
	 *진행하고 있는 챌린지가 있으면 true
	 *진행하고 있는 챌린지가 없으면 false
	 *return */
	public boolean checkChallenge(String userNo) {
		if(mapper.checkChallenge(userNo)>0) return true;
		else return false; 
	}
}
