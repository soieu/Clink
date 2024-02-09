package com.josam.clink.user;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface UserMapper {
	// 회원가입
	int insert(User_MasterVO vo);

	// 로그인
	Map<String, Object> login(User_MasterVO vo);
	
	// 유저 번호 가져오기
	String getUserNo(String user_id);
	
	// 챌린지 등록 정보 가져오기
	int getChallengeDetailsByUserId(String user_no);

	// 아이디 중복체크
	int checkDuplicateId(String user_id);
	
	// 정보 확인
	User_MasterVO getUserInfo(User_MasterVO vo);

	User_MasterVO selectUserById(String user_id);
	
	// 프로필 사진 업로드
	int profileImage(User_MasterVO vo);

	// 개인정보 업데이트
	int update(User_MasterVO vo);

	// 계좌등록
	int registAccount(Account_DetailVO vo);
	
	// 계좌 수정
	int updateAccount(Account_DetailVO vo);

	// 계좌확인
	List<Account_DetailVO> checkAccount(Account_DetailVO vo);
	
	// 토큰확인
	User_MasterVO findById(String username);

}
