package com.josam.clink.security;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;

@Service
@Log
@RequiredArgsConstructor
public class APIUserDetailsService implements UserDetailsService {
	
	private final APIUserRepository apiUserRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<APIUser> result = apiUserRepository.findById(username);
		
		APIUser apiUser = result.orElseThrow(()->new UsernameNotFoundException("회원이 존재하지 않습니다."));
		
		log.info("APIUserDetailsService");
		APIUserDTO dto = new APIUserDTO(apiUser.getMid(), apiUser.getMpw(), List.of(new SimpleGrantedAuthority("ROLE_USER")));
		log.info(dto.toString());
		return dto;
	}
}
