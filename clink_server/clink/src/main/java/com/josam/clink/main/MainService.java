package com.josam.clink.main;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.josam.clink.challenge.ChallengeService;
import com.josam.clink.challenge.ChallengeVO;
import com.josam.clink.challenge.SuccessVO;
import com.josam.clink.user.User_MasterVO;


@Service
public class MainService {
	
	@Autowired
	ChallengeService cService;
	
	@Autowired
	MainMapper mainMapper;
	
	public MainPageVO getInfo(User_MasterVO vo) {
		
		MainPageVO mpvo = new MainPageVO();
		
		//Badge
		mpvo.setBadge(mainMapper.getBadge(vo));
		
		//Quote
		mpvo.setQuote(mainMapper.getQuote());
		
		//StreakData
		ChallengeVO cvo = cService.myChallenge(vo);
		mpvo.setStreakData(getStreakData(cvo));
		
		//ReportData
		mpvo.setReport(getReportData(cvo));
		
		return mpvo;
	}
	
	public StreakVO getStreakData(ChallengeVO cvo){
		
		StreakVO svo = new StreakVO();
		
		//4개월전 ~ 오늘.
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("YYYY-MM-dd");
		
		Date today = new Date();
		String to = formatter.format(today);
		
		calendar.setTime(today);
		calendar.add(Calendar.MONTH, -4);
		String from = formatter.format(calendar.getTime());
		
		cvo.setFrom(from);
		cvo.setTo(to);
		
		svo.setFrom(from);
		svo.setTo(to);	
		svo.setStreakData(mainMapper.getStreakData(cvo));
		
		return svo;
	};
	
public ReportVO getReportData(ChallengeVO cvo){
		
		ReportVO rvo = new ReportVO();
	
		//어제, 어제 저축금액
		try {
			SuccessVO svo= mainMapper.getYesterdaySaving(cvo);
			
			//성공하지 못한날은 저장되지 않음.
			if(svo.getResult_success_amount() != null) {
				rvo.setYesterday(svo.getChallenge_detail_success_date());
				rvo.setYesterday_saving(svo.getResult_success_amount());
				rvo.setYesterday_used(svo.getChallenge_detail_success_amount());
			}
			
			//전체 저축금액
			rvo.setTotal_saving(mainMapper.getTotalSaving(cvo).getResult_success_amount());
			
			//Report
			//총 사용금액
			User_MasterVO uvo = new User_MasterVO();
			uvo.setUser_no(cvo.getUser_no());
			ReportVO temp = mainMapper.getReportData(uvo);
			rvo.setSum(temp.sum);
			rvo.setHigh(temp.getHigh());
			rvo.setLow(temp.getLow());
			rvo.setAvg(temp.getAvg());
			
			//categorical
			temp = mainMapper.getCategoryData(uvo);
			rvo.setCategory(temp.getCategory());
			rvo.setCategoryAmount(temp.getCategoryAmount());
		}catch(Exception e) {
			System.out.println(e);
		}
		return rvo;
	};
}
