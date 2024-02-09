package com.josam.clink.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class APIUserDTO extends User{
	
	private String mid;
	private String mpw;
	
	public APIUserDTO(String username, String password, Collection<? extends GrantedAuthority> authorities) {
		super(username, password, authorities);
		this.mid = username;
		this.mpw = password;
	}

}
