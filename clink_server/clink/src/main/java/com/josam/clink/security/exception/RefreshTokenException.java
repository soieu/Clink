package com.josam.clink.security.exception;

import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import com.fasterxml.jackson.databind.ObjectMapper;

public class RefreshTokenException extends RuntimeException {
	ErrorCase errorCase;
	
	public enum ErrorCase {
		NO_ACCESS, BAD_ACCESS, NO_REFRESH, OLD_REFRESH, BAD_REFRESH
	}
	public RefreshTokenException(ErrorCase errorCase) {
		super(errorCase.name());
		this.errorCase = errorCase;
	}
	public void sendResponseError(HttpServletResponse response) {
		response.setStatus(HttpStatus.UNAUTHORIZED.value());
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		
		try {
			ObjectMapper om = new ObjectMapper();
			
			String responseStr = om.writeValueAsString(Map.of("msg", errorCase.name(), "time", new Date()));
			response.getWriter().print(responseStr);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}
