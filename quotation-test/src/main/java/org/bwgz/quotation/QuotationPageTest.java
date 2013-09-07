package org.bwgz.quotation;
import java.util.Date;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

public class QuotationPageTest {
	private static final Logger LOGGER = Logger.getLogger(QuotationPageTest.class .getName());
	private static final int STANDARD_TIMEOUT = 10;
	
	private int timeout = STANDARD_TIMEOUT;
	private WebDriver driver; 

	public QuotationPageTest() {
        driver = new FirefoxDriver();
	}

	public void dumpPage(final QuotationPage page) {
        LOGGER.info(String.format("quotation_mid: %s", page.getQuotationMid().getAttribute("content")));
        LOGGER.info(String.format("quotation: %s", page.getQuotation().getText()));
        LOGGER.info(String.format("quotation_description: %s", page.getQuotationDescription().getText()));
        LOGGER.info(String.format("quotation_spoken_by_character: %s", page.getQuotationSpokenByCharacter().getText()));
        LOGGER.info(String.format("quotation_source: %s", page.getQuotationSource().getText()));
        
        LOGGER.info(String.format("author_mid: %s", page.getAuthorMid().getAttribute("content")));
        LOGGER.info(String.format("author_name: %s", page.getAuthorName().getText()));
        LOGGER.info(String.format("author_notable_for: %s", page.getAuthorNotablFor().getText()));
        LOGGER.info(String.format("author_description: %s", page.getAuthorDescription().getText()));
        LOGGER.info(String.format("author_birth_date: %s", page.getAuthorBirthDate().getText()));
        LOGGER.info(String.format("author_birth_place: %s", page.getAuthorBirthPlace().getText()));
        LOGGER.info(String.format("author_death_date: %s", page.getAuthorDeathDate().getText()));
        LOGGER.info(String.format("author_death_place: %s", page.getAuthorDeathPlace().getText()));
        LOGGER.info(String.format("author_website_url: %s", page.getAuthorWebsiteUrl().getText()));
        LOGGER.info(String.format("twitter_link: %s", page.getTwitterLink().getAttribute("href")));
        LOGGER.info(String.format("freebase_link: %s", page.getFreebaseLink().getAttribute("href")));
	}
	
	public void waitForFirstQuotation(final WebElement element) {
            (new WebDriverWait(driver, timeout)).until(new ExpectedCondition<Boolean>() {
            	public Boolean apply(WebDriver driver) {
                    return element.isDisplayed() ? !element.getText().isEmpty() : false;
                }
            });
	}

	private void waitForNextQuotation(final WebElement element, final String last) {
        (new WebDriverWait(driver, timeout)).until(new ExpectedCondition<Boolean>() {
        	public Boolean apply(WebDriver driver) {
                return element.isDisplayed() ? !element.getText().equals(last) : false;
            }
        });
	}
	
	public void run(String url, int length, int pause) {
        LOGGER.info(String.format("url: %s", url));
        LOGGER.info(String.format("length: %d", length));
        
        driver.get(url);
        driver.manage().timeouts().pageLoadTimeout(timeout, TimeUnit.SECONDS);
        
        QuotationPage page = PageFactory.initElements(driver, QuotationPage.class);
    	WebElement element = driver.findElement(By.id(page.getQuotation().getAttribute("id")));
        page.clickQuotation(driver);
        
        for (int i = 0; i < length; i++) {
        	if (i == 0) {
        		waitForFirstQuotation(element);
        	}
        	else {
        		String last = page.getQuotation().getText();
        		page.refresh(driver);
        		waitForNextQuotation(element, last);
        	}
            LOGGER.info(String.format("ITERATION: %-4d [%s]", 0, new Date().toString()));
        	dumpPage(page);
        	pause(pause);
        }
        
        driver.quit();
	}

	private void pause(int pause) {
		if (pause != 0) {
			try {
				Thread.sleep(pause * 1000);
			} catch (InterruptedException e) {
			}
		}
	}
}
