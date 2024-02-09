package com.josam.clink.main;

import lombok.Data;

@Data
public class QuoteVO {

    int quote_no;
    String quote_author_name;
    String quote_content;
    
    String register_datetime;
    String register_id;
    String update_datetime;
    String update_id;
    
}
