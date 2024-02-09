package com.josam.clink.security.handler;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.josam.clink.security.JWTUtil;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class APILoginSuccessHandler implements AuthenticationSuccessHandler {
	
	private JWTUtil jwtUtil;
	
	public APILoginSuccessHandler(JWTUtil jwtUtil) {
		this.jwtUtil = jwtUtil;
	}

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		log.info("Login Success Handler....");
		
		// 토큰생성해서 서블릿으로 응답
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		
		log.info(authentication.getName()); // username
		Map<String, Object> claim = Map.of("mid", authentication.getName());
		// Access Token 유효기간 1일
		String accessToken = jwtUtil.generationToken(claim, 1);
		// Refresh Token 유효기간 30일
		String refreshToken = jwtUtil.generationToken(claim, 5);
		
		Map<String, String> keyMap = Map.of("accessToken", accessToken, "refreshToken", refreshToken);
		ObjectMapper om = new ObjectMapper();
		String json = om.writeValueAsString(keyMap);
		response.getWriter().print(json);
	}

}
