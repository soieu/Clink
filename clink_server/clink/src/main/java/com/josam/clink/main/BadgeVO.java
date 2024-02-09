package com.josam.clink.main;

import lombok.Data;

@Data
public class BadgeVO {

    String user_badge_code;
    String user_no;
    String badge_date;
    String badge_description;
    
    String register_datetime;
    String register_id;
    String update_datetime;
    String update_id;
}
