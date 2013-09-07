package org.bwgz.quotation;

import java.util.logging.Logger;

import org.apache.commons.cli.BasicParser;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.CommandLineParser;
import org.apache.commons.cli.HelpFormatter;
import org.apache.commons.cli.Option;
import org.apache.commons.cli.OptionBuilder;
import org.apache.commons.cli.Options;
import org.apache.commons.cli.ParseException;

public class QuotationPageTestRunner {
	private static final String TAG = QuotationPageTestRunner.class.getName();

	public static void main(String[] args) {
	    CommandLineParser parser = new BasicParser();
	    try {
	    	Options options = new Options();
	    	options.addOption(new Option("help", "print this message"));
	    	options.addOption(OptionBuilder.withArgName("length").hasArg().withDescription("number of quotations to view").create("length"));
	    	options.addOption(OptionBuilder.withArgName("pause").hasArg().withDescription("number of second to pause each quotation").create("pause"));
	        CommandLine line = parser.parse(options, args);
	        
	        int length = 1;
	        int pause = 0;
	        
	        if( line.hasOption("help") ) {
	        	HelpFormatter formatter = new HelpFormatter();
	        	formatter.printHelp(TAG + " [OPTIONS] file", options);
	        }
	        else {
		        if( line.hasOption("length") ) {
		        	length = Integer.valueOf(line.getOptionValue("length"));
		        }
		        if( line.hasOption("pause") ) {
		        	pause = Integer.valueOf(line.getOptionValue("pause"));
		        }
		        
		        args = line.getArgs();
		        
		        if (args.length == 0) {
			        System.err.println("usage error: url not specified");
		        }
		        else if (args.length > 1) {
			        System.err.println("usage error: only one url may be specified");
		        }
		        else {
		        	String url = args[0];
		        	
		            QuotationPageTest test = new QuotationPageTest();
		            test.run(url, length, pause);
		        }
	        }
	    }
	    catch(ParseException exp) {
	        System.err.println("usage error: " + exp.getMessage());
	    }
	}
}
