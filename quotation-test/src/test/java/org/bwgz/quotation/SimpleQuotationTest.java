package org.bwgz.quotation;


import java.util.concurrent.TimeUnit;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.PageFactory;

public class SimpleQuotationTest {

	public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new FirefoxDriver();

        driver.get("http://localhost:8080");
        driver.manage().timeouts().pageLoadTimeout(10, TimeUnit.SECONDS);
        
        QuotationPage page = PageFactory.initElements(driver, QuotationPage.class);
        page.refresh(driver);
        
        Thread.sleep(3000);
        
        driver.quit();
	}

}
