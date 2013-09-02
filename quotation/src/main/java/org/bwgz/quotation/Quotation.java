package org.bwgz.quotation;

import java.io.IOException;
import java.util.Random;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

public class Quotation {
	static private String mids[];

	{
		mids = new String[] { "/m/048gfd2" };
		ObjectMapper mapper = new ObjectMapper();
		try {
			mids = mapper.readValue(Thread.currentThread().getContextClassLoader().getResourceAsStream("mids.json"), String[].class);
		} catch (JsonParseException e) {
		} catch (JsonMappingException e) {
		} catch (IOException e) {
		}
	}
	
	public String toString() {
		int index = new Random().nextInt(mids.length);
		return "{\"mid\":\"" + mids[index] + "\"}";
	}
}
