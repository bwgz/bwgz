package org.bwgz.quotation;


import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class QuotationPage {
    @FindBy(xpath = "//meta[@name='quotation_mid']")
    private WebElement quotationMid;
    
    @FindBy(xpath = "//meta[@name='author_mid']")
    private WebElement authorMid;
    
    @FindBy(id = "quotation")
    private WebElement quotation;

    @FindBy(id = "quotation_description")
    private WebElement quotationDescription;

    @FindBy(id = "quotation_spoken_by_character")
    private WebElement quotationSpokenByCharacter;

    @FindBy(id = "quotation_source")
    private WebElement quotationSource;

    @FindBy(id = "author_name")
    private WebElement authorName;

    @FindBy(id = "author_notable_for")
    private WebElement authorNotablFor;

    @FindBy(id = "author_description")
    private WebElement authorDescription;

    @FindBy(id = "author_birth_date")
    private WebElement authorBirthDate;

    @FindBy(id = "author_birth_place")
    private WebElement authorBirthPlace;

    @FindBy(id = "author_death_date")
    private WebElement authorDeathDate;

    @FindBy(id = "author_death_place")
    private WebElement authorDeathPlace;

    @FindBy(id = "author_website_url")
    private WebElement authorWebsiteUrl;

    @FindBy(id = "twitter_link")
    private WebElement twitterLink;
    
    @FindBy(id = "freebase_link")
    private WebElement freebaseLink;

    @FindBy(id = "refresh_link")
    private WebElement refreshLink;
    
	public WebElement getQuotationMid() {
		return quotationMid;
	}

	public WebElement getAuthorMid() {
		return authorMid;
	}

	public WebElement getQuotation() {
		return quotation;
	}

	public WebElement getQuotationDescription() {
		return quotationDescription;
	}

	public WebElement getQuotationSpokenByCharacter() {
		return quotationSpokenByCharacter;
	}

	public WebElement getQuotationSource() {
		return quotationSource;
	}

	public WebElement getAuthorName() {
		return authorName;
	}

	public WebElement getAuthorNotablFor() {
		return authorNotablFor;
	}

	public WebElement getAuthorDescription() {
		return authorDescription;
	}

	public WebElement getAuthorBirthDate() {
		return authorBirthDate;
	}

	public WebElement getAuthorBirthPlace() {
		return authorBirthPlace;
	}

	public WebElement getAuthorDeathDate() {
		return authorDeathDate;
	}

	public WebElement getAuthorDeathPlace() {
		return authorDeathPlace;
	}

	public WebElement getAuthorWebsiteUrl() {
		return authorWebsiteUrl;
	}

	public WebElement getTwitterLink() {
		return twitterLink;
	}

	public WebElement getFreebaseLink() {
		return freebaseLink;
	}

	public WebElement getRefreshLink() {
		return refreshLink;
	}

    public void refresh(WebDriver driver) {
    	(new WebDriverWait(driver, 10)).until(ExpectedConditions.elementToBeClickable(By.id(refreshLink.getAttribute("id"))));
    	refreshLink.click();
    }
    
    public void clickQuotation(WebDriver driver) {
    	(new WebDriverWait(driver, 10)).until(ExpectedConditions.elementToBeClickable(By.id(quotation.getAttribute("id"))));
    	quotation.click();
    }

}
