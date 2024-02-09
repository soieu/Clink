package com.josam.clink.user.mail;

import java.io.UnsupportedEncodingException;
import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMessage.RecipientType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class RegisterMail implements MailServiceInter {

	@Autowired
	JavaMailSender emailsender; // Bean 등록해둔 MailConfig 를 emailsender 라는 이름으로 autowired

	private String ePw; // 인증번호

	// 메일 내용 작성
	@Override
	public MimeMessage createMessage(String to) throws MessagingException, UnsupportedEncodingException {
//		System.out.println("보내는 대상 : " + to);
//		System.out.println("인증 번호 : " + ePw);

		MimeMessage message = emailsender.createMimeMessage();

		message.addRecipients(RecipientType.TO, to);// 보내는 대상
		message.setSubject("땡그랑 회원가입 이메일 인증");// 제목

		String msgg = "";
		msgg += "<div>";
		msgg += "<h2 style='font-size: 24px; margin-bottom: 40px; margin-top: 30px; color: #333;'>안녕하세요, 땡그랑입니다.</h2>";
		msgg += "<p style='margin-bottom: 20px; font-size: 16px; color: #333;'>아래 인증 코드를 회원가입 창으로 돌아가 입력해주세요.</p>";
		msgg += "<p style='font-size: 18px; color: #333;margin-bottom: 20px'>CODE: <strong style='color: #337ab7;'>"
				+ ePw + "</strong></p>";
		msgg += "<p style='font-size: 16px; color: #333;'>감사합니다.</p>";
		msgg += "</div>";
		message.setText(msgg, "utf-8", "html");// 내용, charset 타입, subtype
		// 보내는 사람의 이메일 주소, 보내는 사람 이름
		message.setFrom(new InternetAddress("josammosam1@naver.com", "Clink"));// 보내는 사람

		return message;
	}

	@Override
	public String createKey() {
		StringBuffer key = new StringBuffer();
		Random rnd = new Random();

		for (int i = 0; i < 8; i++) { // 인증코드 8자리
			int index = rnd.nextInt(3); // 0~2 까지 랜덤, rnd 값에 따라서 아래 switch 문이 실행됨

			switch (index) {
			case 0:
				key.append((char) ((int) (rnd.nextInt(26)) + 97));
				// a~z (ex. 1+97=98 => (char)98 = 'b')
				break;
			case 1:
				key.append((char) ((int) (rnd.nextInt(26)) + 65));
				// A~Z
				break;
			case 2:
				key.append((rnd.nextInt(10)));
				// 0~9
				break;
			}
		}

		return key.toString();
	}

	// 메일 발송
	@Override
	public String sendSimpleMessage(String to) throws Exception {

		ePw = createKey(); // 랜덤 인증번호 생성

		MimeMessage message = createMessage(to); // 메일 발송
		try {// 예외처리
			emailsender.send(message);
		} catch (MailException es) {
			es.printStackTrace();
			throw new IllegalArgumentException();
		}

		return ePw; // 메일로 보냈던 인증 코드를 서버로 반환
	}
}