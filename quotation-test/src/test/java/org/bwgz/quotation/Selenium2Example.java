package org.bwgz.quotation;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class Selenium2Example  {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new FirefoxDriver();

        driver.get("http://localhost:8080");
        System.out.println("Page title is: " + driver.getTitle());

        (new WebDriverWait(driver, 10)).until(new ExpectedCondition<Boolean>() {
        	public Boolean apply(WebDriver driver) {
            	WebElement element = driver.findElement(By.id("quotation"));
                System.out.printf("text: %s\n",  element.getText());
                return element.isDisplayed() ? !element.getText().isEmpty() : false;
            }
        });
        
    	WebElement element = driver.findElement(By.id("quotation"));
    	
    	final String quotation = element.getText();
        System.out.printf("text: %s\n", quotation);

        Thread.sleep(3000);

        element = (new WebDriverWait(driver, 10))
            	.until(ExpectedConditions.elementToBeClickable(By.id("quotation")));
        
        System.out.printf("element: %s\n",  element);
        if (element != null) {
        	element.click();
        }

        Thread.sleep(3000);

        element = (new WebDriverWait(driver, 10))
        	.until(ExpectedConditions.elementToBeClickable(By.id("refresh_link")));
        
        System.out.printf("element: %s\n",  element);
        if (element != null) {
        	element.click();
        }

        (new WebDriverWait(driver, 10)).until(new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver driver) {
            	WebElement element = driver.findElement(By.id("quotation"));
                System.out.printf("text: %s\n",  element.getText());
                String text = element.getText();
                
                return !text.isEmpty() ? !text.equals(quotation): false;
            }
        });

    	element = driver.findElement(By.id("quotation"));
        System.out.printf("text: %s\n", element.getText());
        
        Thread.sleep(3000);

        driver.quit();
    }
}
