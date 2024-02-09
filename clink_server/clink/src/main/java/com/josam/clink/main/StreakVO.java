package com.josam.clink.main;

import java.util.List;

import lombok.Data;

@Data
public class StreakVO {

	private String from;
	private String to;
	private List<StreakdataVO> streakData;

}
