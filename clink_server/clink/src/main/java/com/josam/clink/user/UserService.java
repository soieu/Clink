package com.josam.clink.user;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	@Autowired
	UserMapper userMapper;

	@Autowired
	private PasswordEncoder passwordEncoder;

	// 회원가입
	public User_MasterVO insert(User_MasterVO vo) {
		// 비밀번호 암호화
		vo.setPassword(passwordEncoder.encode(vo.getPassword()));
		vo.setUser_name(passwordEncoder.encode(vo.getUser_name()));
		vo.setEmail(passwordEncoder.encode(vo.getEmail()));
		vo.setUser_no(Long.toString(System.currentTimeMillis()).substring(8));
		vo.setRegister_id(Long.toString(System.currentTimeMillis()).substring(8));

		int r = userMapper.insert(vo);
		if (r == 1) {
			String userNo = userMapper.getUserNo(vo.getUser_id());
			vo.setUser_no(userNo);
			return vo;
		} else {
			return null;
		}
	}

	// 로그인
	public Map<String, Object> login(User_MasterVO vo) {
		Map<String, Object> newVO = userMapper.login(vo);
		String no= newVO.get("user_no").toString();
		if (newVO != null) {
			boolean result = passwordEncoder.matches(vo.getPassword(), (String) newVO.get("password"));
			if (result) {
				int challengeDetails = userMapper.getChallengeDetailsByUserId(no);
				newVO.put("challengeDetails", challengeDetails);
				return newVO;
			}
		}
		return null;
	}

	// 정보 확인
	public User_MasterVO getUserInfo(User_MasterVO vo) {
		return userMapper.getUserInfo(vo);
	}
	
	public User_MasterVO getUserById(String user_id) {
		return userMapper.selectUserById(user_id);
	}

	// 아이디 중복확인
	public int checkDuplicateId(String user_id) {
		return userMapper.checkDuplicateId(user_id);
	}

	// 프로필 사진 업로드
	public int profileImage(User_MasterVO vo) {
		return userMapper.profileImage(vo);
	}

	// 개인정보 수정
	public int update(User_MasterVO vo) {
		if (vo.getNick_name().equals(null)) {
			User_MasterVO newVO = new User_MasterVO();
			vo.setNick_name(newVO.getNick_name());
		} else if (vo.getPassword().equals(null)) {
			User_MasterVO newVO = new User_MasterVO();
			vo.setNick_name(newVO.getNick_name());
		}
		return userMapper.update(vo);
	}

	// 계좌 확인
	public List<Account_DetailVO> checkAccount(Account_DetailVO vo) {
		return userMapper.checkAccount(vo);
	}

	// 계좌 등록
	public int registAccount(Account_DetailVO vo) {
		return userMapper.registAccount(vo);
	}

	// 계좌 수정
	public int updateAccount(Account_DetailVO vo) {
		return userMapper.updateAccount(vo);
	}

}
