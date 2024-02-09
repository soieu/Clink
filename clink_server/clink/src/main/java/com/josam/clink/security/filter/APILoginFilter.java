package com.josam.clink.security.filter;


import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;
@Slf4j
public class APILoginFilter extends AbstractAuthenticationProcessingFilter {
	
	// 아이디 비밀번호 검증해서 토큰만드는 애

	public APILoginFilter(String defaultFilterProcessesUrl) {
		super(defaultFilterProcessesUrl);
	}
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
		log.info("APILoginFilter");
		Map<String, String> json = parseRequestJSON(request);
		System.out.println(json);
		
		// 인증처리
		UsernamePasswordAuthenticationToken authenticationToken 
			= new UsernamePasswordAuthenticationToken(json.get("mid"), json.get("mpw"));
		
		return getAuthenticationManager().authenticate(authenticationToken);
	}
	
	private Map<String, String> parseRequestJSON(HttpServletRequest request) {
		try (Reader reader = new InputStreamReader(request.getInputStream())) {
			ObjectMapper om = new ObjectMapper();
			return om.readValue(reader, Map.class);
		} catch (Exception e) {
			log.info(e.getMessage());
		}
		return null;
	}
}
