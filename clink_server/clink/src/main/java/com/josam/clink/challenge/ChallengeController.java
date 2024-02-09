package com.josam.clink.challenge;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.josam.clink.user.User_MasterVO;

//http://localhost:port/challenge/index.do?userNo=1
@RequestMapping("/challenge")
@Controller
public class ChallengeController {
	@Autowired
	ChallengeService challengeService;
	
	@GetMapping("/")
	@ResponseBody
	public void test() {
		System.out.println("잘 실행하고 있어욤");
	}

	@GetMapping("/main-info")
	@ResponseBody
	public ChallengePageVO challenge(@RequestParam String userNo) {

		boolean check=checkChallenge(userNo);
		System.out.println(check);
		ChallengePageVO cpvo = new ChallengePageVO();
		if(check) {
			User_MasterVO uvo = new User_MasterVO();
			uvo.setUser_no(userNo);
			ChallengeVO cvo = challengeService.myChallenge(uvo);
			List<HistoryVO> today = challengeService.todayHistory(uvo);
			BigDecimal value= new BigDecimal("0");
			for(HistoryVO hvo: today) {
				value = value.add(hvo.getTransaction_amount());
			}
			cpvo.setChallengeId(cvo.getChallenge_no());
			cpvo.setTitle(cvo.getChallenge_title());
			cpvo.setDescription(cvo.getChallenge_description());
			cpvo.setGoal(cvo.getChallenge_amount());
			cpvo.setUserNo(userNo);
			cpvo.setValue(value);
			cpvo.setToday(today);
			cpvo.setChart(challengeService.weekHistory(uvo));
			cpvo.setChart1(challengeService.weekHistory(uvo));
			System.out.println(cpvo);
			return cpvo; 
		}
		else {
			return null;
		}

	}
	
	@GetMapping("/pay-info")
	@ResponseBody
	public ChallengePageVO refresh(@RequestParam String userNo, String startDate, String endDate) {

		HistoryVO hvo = new HistoryVO();
		hvo.setUser_no(userNo);
		hvo.setStartDate(startDate+" 00:00:00");
		hvo.setEndDate(endDate+" 23:59:59");
		ChallengePageVO cpvo = new ChallengePageVO();
		cpvo.setToday(challengeService.selectedHistory(hvo));
		
		return cpvo;
	}
	
	@GetMapping("/pay-delete")
	@ResponseBody
	public Boolean delete(@RequestParam String userNo, String datetime, String content) {

		HistoryVO hvo = new HistoryVO();
		hvo.setUser_no(userNo);
		hvo.setTransaction_datetime(datetime);
		hvo.setTransaction_info_content(content);
		if(challengeService.deleteHistory(hvo)>0)return true;
		else return false;
	}
	
	@PostMapping("/pay-update")
	@ResponseBody
	public boolean update(@RequestBody HistoryVO hvo) {

		
		if(challengeService.updateHistory(hvo)>0)return true;
		else return false;
	}
	
	
	
	/*
	 *새로운 챌린지 등록 */
	@PostMapping("/register")
	@ResponseBody
	public void registerChallenge (@RequestBody ChallengeVO cvo) {

		challengeService.registerChallenge(cvo);
	}
	
	public boolean checkChallenge(String userNo) {
		return challengeService.checkChallenge(userNo);

	}

}
