package com.josam.clink.security;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.josam.clink.user.UserService;
import com.josam.clink.user.User_MasterVO;

@RestController
@RequestMapping("/clink")
//@CrossOrigin(origins = {"http://172.19.48.1:5500/"})
public class SecurityController {
	
	@Autowired
	UserService userService;
	
//	@ApiOperation("Sample GET doA")
	@PostMapping("/doA")
	public List<String> doA() {
		return Arrays.asList("AAA","BBB","CCC");
	}
	
	// 로그인
//	@PostMapping("/user/login.do")
//	@ResponseBody
//	public  ResponseEntity<?> handleEndpoint(@RequestHeader("Authorization") String authorizationHeader){ 
//	 // authorizationHeader에서 "Bearer {JWT}" 부분 추출
//		 String token = authorizationHeader.substring(7); // "Bearer " 부분 제외
//		System.out.println("컨트롤러 도착했니??");
//		User_MasterVO login = userService.login();
//		System.out.println("login:" + login);
//		if (login == null) {
//			return null;
//		} else {
//			return login;
//		}
//	}

}
