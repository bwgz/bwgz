package org.bwgz.quotation;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.thoughtworks.selenium.SeleneseTestBase;

public class SimpleTest extends SeleneseTestBase  {

	@Before
	public void setUp() throws Exception {
        setUp("http://localhost:8080/", "*chrome");
	}

	@Test
	public void testAdvancedSearch() throws Exception {
		selenium.open("http://localhost:8080/");
		selenium.waitForPageToLoad("5000");
		Thread.sleep(3000);
		selenium.click("id=refresh_link");
		Thread.sleep(3000);
		selenium.click("id=quotation");
		Thread.sleep(3000);
		selenium.click("id=refresh_link");
		Thread.sleep(3000);
	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}

}
