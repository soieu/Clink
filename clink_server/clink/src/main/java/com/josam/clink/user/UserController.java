package com.josam.clink.user;

import java.io.File;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.josam.clink.user.mail.RegisterMail;

@RequestMapping("/user")

@Controller
public class UserController {
	@Autowired
	UserService userService;

	@Autowired
	RegisterMail registerMail;

	@PostMapping("/join.do")
	@ResponseBody
	public User_MasterVO join(@RequestBody User_MasterVO user_MasterVO) {
		User_MasterVO uv = userService.insert(user_MasterVO);
		if (uv!=null) {
			return uv;
		} else {
			return null;
		}
	}
	
	// 마이페이지 사용자 정보 가져오기
	@PostMapping("/mypage.do")
	@ResponseBody
	public User_MasterVO getUserInfo(@RequestBody User_MasterVO user_MasterVO) throws Exception {
		User_MasterVO getUserInfo = userService.getUserInfo(user_MasterVO);
		return getUserInfo;
		// 없으면 null 반환
	}

	// 로그인
	@PostMapping("/login.do")
	@ResponseBody
	public Map<String, Object> login(@RequestBody User_MasterVO user_MasterVO) throws Exception {
		Map<String, Object> login = userService.login(user_MasterVO);
		if (login == null) {
			return null;
		} else {
			return login;
		}
	}
	
	// 아이디 중복체크
	@PostMapping("/check-duplicate-id.do")
	@ResponseBody
	public String checkDuplicateId(@RequestBody User_MasterVO user_MasterVO) {
		int checkDuplicateId = userService.checkDuplicateId(user_MasterVO.getUser_id());
		if (checkDuplicateId == 0) {
			return "success";
		} else {
			return "fail";
		}
	}

	// 개인정보 수정
	@PostMapping("/update.do")
	@ResponseBody
	public String update(@RequestBody User_MasterVO user_MasterVO) {
		int r = userService.update(user_MasterVO);
		if (r == 0) {
			return "fail";
		} else {
			return "success";
		}
	}
	
	// 등록된 계좌 있는지 확인
	@PostMapping("/check-account.do")
	@ResponseBody
	public List<Account_DetailVO> checkAccount(@RequestBody Account_DetailVO account_DetailVO) throws Exception {
		List<Account_DetailVO> checkAccount = userService.checkAccount(account_DetailVO);
		return checkAccount;
		// 없으면 null 반환
	}


	// 계좌 등록
	@PostMapping("/regist-account.do")
	@ResponseBody
	public int registAccount(@RequestBody Account_DetailVO account_DetailVO) throws Exception {
		int registAccount = userService.registAccount(account_DetailVO);
		if (registAccount == 0) {
			return 0;
		} else {
			return 1;
		}
	}

	// 계좌 수정
	@PostMapping("/update-account.do")
	@ResponseBody
	public int updateAccount(@RequestBody Account_DetailVO account_DetailVO) throws Exception {
		int updateAccount = userService.updateAccount(account_DetailVO);
		if (updateAccount == 0) {
			return 0;
		} else {
			return 1;
		}
	}

	// 프로필 이미지 등록
	@PostMapping("/photo-url.do")
	@ResponseBody
	public String profileImage(User_MasterVO user_MasterVO, MultipartFile file) {
		System.out.println("user_MasterVO" + user_MasterVO);
		System.out.println("file" + file);
		if (!file.isEmpty()) {
			String org = file.getOriginalFilename();
			user_MasterVO.setPhoto_url(org);
			String uploadFolder = "/var/property/img";
			File saveFile = new File(uploadFolder + "/" + org);
			try {
				file.transferTo(saveFile);
			} catch (Exception e) {
				e.printStackTrace();
			}
			int r = userService.profileImage(user_MasterVO);
			if (r == 1)
				return org;
			else
				return null;
		} else {
			return null;
		}
	}

	// 이메일 인증
	@PostMapping("/emailAuth.do")
	@ResponseBody
	public String emailAuth(@RequestParam(value = "email", required = false) String email) throws Exception {
		String code = registerMail.sendSimpleMessage(email);
		return code;
	}
}