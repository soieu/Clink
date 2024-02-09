package com.josam.clink.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class CustomServletConfig implements WebMvcConfigurer{

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
//		registry.addResourceHandler("/**") // 핸들러 추가
//				.addResourceLocations("classpath:/static/") // 클래스패스 설정시 끝에 꼭 / 넣어주자.
//				.setCachePeriod(20); // 초단위
		// 이미지URL
		registry.addResourceHandler("/images/**")
 		.addResourceLocations("file:///var/property/img/");
	}
	
}
