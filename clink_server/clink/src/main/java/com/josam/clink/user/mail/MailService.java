package com.josam.clink.user.mail;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

// 참조 : https://kitty-geno.tistory.com/43

@Service
public class MailService {
	@Autowired
	private JavaMailSender javaMailSender;
	
	public static final String ePw = createKey();

	
	public SimpleMailMessage createMail(String toUser) {
		System.out.println("보내는 대상 : "+ toUser);
        System.out.println("인증 번호 : "+ePw);
		// 단순 텍스트 구성 메일 메시지 생성
		SimpleMailMessage simpleMessage = new SimpleMailMessage();
		
		// 수신자 설정
		simpleMessage.setTo(toUser);
		
		// 메일 제목 설정
		simpleMessage.setSubject("땡그랑 회원가입 이메일 인증 번호");
		
		// 메일 내용 설정
		simpleMessage.setText("인증번호 : "+ ePw);
		
		return simpleMessage;
	}
	
	public String sendMail(String toUser) throws Exception {
		SimpleMailMessage message = createMail(toUser);
		try{
            javaMailSender.send(message); // 메일 발송
        }catch(MailException es){
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
        return ePw; // 메일로 보냈던 인증 코드를 서버로 리턴
	}

	 public static String createKey() {
	        StringBuffer key = new StringBuffer();
	        Random rnd = new Random();
	 
	        for (int i = 0; i < 8; i++) { // 인증코드 8자리
	            int index = rnd.nextInt(3); // 0이면 소문자, 1이면 대문자, 2이면 숫자로 인증코드의 한 문자 생성
	 
	            switch (index) {
	                case 0:
	                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
	                    //  a~z  (ex. 1+97=98 => (char)98 = 'b')
	                    break;
	                case 1:
	                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
	                    //  A~Z
	                    break;
	                case 2:
	                    key.append((rnd.nextInt(10)));
	                    // 0~9
	                    break;
	            }
	        }
	        return key.toString();
	    }
}
