package com.josam.clink.security;

import java.security.Key;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.java.Log;

@Component
@Log
public class JWTUtil {
	
	@Value("${jwt.secret.key}")
	private String key;
	
	// JWT 문자열 생성
	public String generationToken(Map<String, Object> valueMap, int days) {
		log.info("generateKey..."+key);
		
		// header
		Map<String, Object> headers = new HashMap<>();
		headers.put("typ", "JWT");
		headers.put("alg", "HS256");
		
		// payload
		Map<String, Object> payloads = new HashMap<>();
		payloads.putAll(valueMap);
		
		// 유효기간
		int time = 1 * 60 * days; // 1일
//		int time = 1 * days; // 1분
		
		String jwtStr = Jwts.builder()
				.setHeader(headers)
				.setClaims(payloads)
				.setIssuedAt(Date.from(ZonedDateTime.now().toInstant()))
				.setExpiration(Date.from(ZonedDateTime.now().plusMinutes(time).toInstant()))
				.signWith(SignatureAlgorithm.HS256, key.getBytes())
				.compact();
		
		return jwtStr;
	}
	
	  // 토큰 검증
    public Map<String, Object> validateToken(String token) throws JwtException {
        Map<String, Object> claim = null;

        Key signingKey = Keys.hmacShaKeyFor(key.getBytes());

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(token)
                .getBody();

        claim = claims;

        return claim;
    }

}
