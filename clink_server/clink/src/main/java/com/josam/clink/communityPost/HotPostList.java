package com.josam.clink.communityPost;

import java.util.List;

import lombok.Data;

@Data
public class HotPostList {
	private List<CommunityPostVO> HotPost;
	private List<CommunityPostVO> HotFreePost;
	private List<CommunityPostVO> HotInfoPost;
	private List<CommunityPostVO> HotAnnPost;
}
