package com.josam.clink.security.filter;


import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.time.Instant;
import java.util.Date;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.MediaType;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.josam.clink.security.JWTUtil;
import com.josam.clink.security.exception.RefreshTokenException;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import lombok.extern.slf4j.Slf4j;
@Slf4j
public class RefreshTokenFilter extends OncePerRequestFilter {

	
	private JWTUtil jwtUtil;
	private String refreshPath;
	
	public RefreshTokenFilter (JWTUtil jwUtil, String refreshPath) {
		this.jwtUtil = jwUtil;
		this.refreshPath = refreshPath;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String path = request.getRequestURI();
		if (!path.equals(refreshPath)) { // 
			log.info("skip refresh token filter......");
			filterChain.doFilter(request, response);
			return;
		}
		log.info("Refresh Token Filter............");
		
		// 전송된 JSON에서 accessToken과 refreshToken을 파싱한다.
		Map<String, String> tokens = parseRequestJSON(request);
		String accessToken = tokens.get("accessToken");
		String refreshToken = tokens.get("refreshToken");
		log.info("accessToken:"+accessToken);
		log.info("refreshToken:"+refreshToken);
		
		// accessToken 검증
		try {
			checkAccessToken(accessToken);
		}catch(RefreshTokenException e) {
			e.sendResponseError(response);
			return; // 더이상 진행할필요없으므로
		}
		// refreshToken 검증
		try {
			Map<String, Object> refreshClaims = checkRefreshToken(refreshToken);
			log.info(refreshClaims.toString());
			
			// Refresh Token의 유효시간이 얼마남지 않은 경우
			Integer exp = (Integer)refreshClaims.get("exp");
			Date expTime = new Date(Instant.ofEpochMilli(exp).toEpochMilli()*1000);
			Date current = new Date(System.currentTimeMillis());
			
			// 만료시간과 현재시간 간격
			long gapTime = (expTime.getTime()-current.getTime());
			log.info("gapTime:"+gapTime);
			
			String mid = (String)refreshClaims.get("mid");
			// AccessToken 새로 생성
			String accessTokenValue = jwtUtil.generationToken(Map.of("mid", mid), 1);
			String refreshTokenValue = tokens.get("refreshToken");
			
			if (gapTime < (60*60*1000*24*3)) {
				log.info("new Refresh Token required...");
				refreshTokenValue = jwtUtil.generationToken(Map.of("mid",mid), 1);
			}
			
			log.info("Refresh Token Result.......................");
			log.info("accessToken:" + accessTokenValue);
			log.info("refreshToken:" + refreshTokenValue);
			sendTokens(accessTokenValue, refreshTokenValue, response);
			
		}catch(RefreshTokenException e) {
			e.sendResponseError(response);
			return; // 더이상 진행할필요없으므로
		}
		
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
	
	private void checkAccessToken(String accessToken) throws RefreshTokenException {
		try {
			jwtUtil.validateToken(accessToken);
		} catch (ExpiredJwtException e) {
			log.info("Access Token has expired");
		} catch (Exception e) {
			throw new RefreshTokenException(RefreshTokenException.ErrorCase.NO_ACCESS);
		}
	}
	private Map<String, Object> checkRefreshToken(String refreshToken) throws RefreshTokenException {
		try {
			Map<String, Object> values = jwtUtil.validateToken(refreshToken);
			return values;
		} catch (ExpiredJwtException e) {
			throw new RefreshTokenException(RefreshTokenException.ErrorCase.OLD_REFRESH);
		} catch (MalformedJwtException e) {
			log.info("MalformedJwtException......................");
			throw new RefreshTokenException(RefreshTokenException.ErrorCase.NO_REFRESH);
		} catch (Exception e) {
			throw new RefreshTokenException(RefreshTokenException.ErrorCase.NO_REFRESH);
		}
	}
	
	private void sendTokens(String accessTokenValue, String refreshTokenValue, HttpServletResponse response) {
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		try {
			Map<String, String> keyMap = Map.of("accessToken", accessTokenValue, "refreshToken", refreshTokenValue);
			ObjectMapper om = new ObjectMapper();
			String json = om.writeValueAsString(keyMap);
			response.getWriter().print(json);
		} catch (Exception e) {
			log.info(e.getMessage());
		}
	}
}
