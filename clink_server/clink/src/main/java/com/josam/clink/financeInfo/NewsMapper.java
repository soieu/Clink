package com.josam.clink.financeInfo;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface NewsMapper  {
	public List<NewsVO> getNewsData();
	public void insertNewsData(NewsVO nvo);
	public void deleteNewsData();
}
