package com.josam.clink;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.josam.clink.financeInfo.Service.FinanceInfoService;

import net.bytebuddy.utility.visitor.LineNumberPrependingMethodVisitor;

@EnableScheduling
@SpringBootApplication
public class ClinkApplication {
	public static void main(String[] args) {
		SpringApplication.run(ClinkApplication.class, args);
	}

}
