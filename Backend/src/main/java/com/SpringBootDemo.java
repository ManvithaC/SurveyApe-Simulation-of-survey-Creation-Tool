package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class SpringBootDemo {
    public static void main(String[] args){
        SpringApplication.run(SpringBootDemo.class,args);
    }
}