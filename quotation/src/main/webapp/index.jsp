<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:fb="http://ogp.me/ns/fb#">
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@page contentType="text/html;charset=UTF-8"%>
<fmt:setBundle basename="l10n.string" var="msg" />

<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html lang="en"> <!--<![endif]-->

<style type="text/css">
img.displayed {display: block; float: left; margin-right:5px; }
</style>
<head>
<title>Quotation</title>
<meta name="description" content="Quotation brings you over 35000 random quotes from thousands of authors. Quotation showcases quotes from ancient times to present day. They are a stunning representation of those words that have influenced and molded our language and culture." />
<meta name="author" content="bwgz.org">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<meta name="quotation_mid" content="">
<meta name="author_mid" content="">
<meta property="og:url" content="http://quotation.bwgz.org" />
<meta property="og:title" content="Quotation" />
<meta property="og:description" content="Quotation brings you over 35000 random quotes from thousands of authors. Quotation showcases quotes from ancient times to present day. They are a stunning representation of those words that have influenced and molded our language and culture." />
<meta property="og:image" content="http://quotation.bwgz.org/images/favicons/quotation512x512.png" />

<!-- CSS
================================================================================================= -->
<link rel="stylesheet" href="/css/base.css">
<link rel="stylesheet" href="/css/themes/type_04.css">
<link rel="stylesheet" href="/css/themes/color_01.css">

<!--[if lt IE 9]>
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->

<!-- Favicons
================================================================================================= -->
<link rel="shortcut icon" type="image/png" href="/images/favicons/quotation16x16bw.png">
<link rel="apple-touch-icon" href="/images/favicons/quotation48x48bw.png">
<link rel="apple-touch-icon" sizes="72x72" href="/images/favicons/quotation72x72bw.png">

<!-- JS
================================================================================================= -->
<script src="/js/libs/modernizr.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="/js/libs/jquery.easing.1.3.min.js"></script>
<script src="/js/libs/jquery.fitvids.js"></script>
<script src="/js/script.js"></script>

<script src="/js/date.js"></script>
<script src="/js/quotation.js"></script>
<script src="/js/twitter.js"></script>

<script src="//apis.google.com/js/client.js?onload=onLoadGoogleClient"></script>
<script src="//maps.google.com/maps/api/js?key=AIzaSyAXwb8gGqL5QfOLAmKyT7vF3OHEtiaV-Nw&sensor=false"></script>

<link href="/jsImgSlider/1/js-image-slider.css" rel="stylesheet" type="text/css" />
<script src="/jsImgSlider/1/js-image-slider.js" type="text/javascript"></script>

</head>
<body>

<!-- Write preloader to page - this allows the site to load for users with JS disabled -->
<script type="text/javascript">
	document.write("<div id='sitePreloader'><div id='preloaderImage'><img src='/images/site_preloader.gif' alt='Preloader' /></div></div>");
	var locale=<%= "\"" + request.getLocale().toString() + "\"" %>;
	var localeDatePattern=<%= "\"" + ((java.text.SimpleDateFormat) java.text.DateFormat.getDateInstance(java.text.DateFormat.SHORT, request.getLocale())).toPattern() + "\"" %>.replace("yy", "yyyy");
</script>
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/" + locale + "/all.js#xfbml=1";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
</script><div class="container">
	
	<!-- Header begins ========================================================================== -->
	<header class="sixteen columns">
		<div id="logo">
			<h1>Quotation</h1>
			<h2>A quotation at the right moment is like bread to the famished.</h2>
			<!--
			<img src="images/logo.png" width="275" height="35" alt="Logo" />
			-->
		</div>
		<nav>
			<ul>
				<li><button id="workPage"><fmt:message key="home" bundle="${msg}"/></button></li>
				<li><button id="aboutPage"><fmt:message key="mobile" bundle="${msg}"/></button></li>
			</ul>
		</nav>
		<hr />
	</header>
	<!-- Header ends ============================================================================ -->
	
	<!-- Work page begins ======================================================================= -->
	<div id="work">
	
		<div class="sixteen columns" id="col1">
		
			<!-- Project begins ================================================================= -->
			<div class="project">
				<div class="projectThumbnail">
					<blockquote>
						<h3 id="quotation">
 						</h3>
					</blockquote>
				</div>
				<div>
					<span style="float: left;">
	  					<a id="twitter_link" href="https://twitter.com" target="_blank"><img src="https://dev.twitter.com/sites/default/files/images_documentation/bird_black_16_0.png" alt="Tweet" /></a>
					</span>
					<span style="float: right;">
	  					<a id="refresh_link" onclick="randomQuotation()"><img id="refresh_image" src="/images/refresh16x16.png" alt="Refresh" /></a>
					</span>
				</div>
				
				<div class="projectInfo" style="width: 100%">
					<div class="projectNavCounter"></div>
					<div class="projectNav">
						<div class="projectNavClose"><button class="closeButton"><fmt:message key="close" bundle="${msg}"/></button></div>
						<div class="projectNavButtons"><button class="prev"></button><button class="next"></button></div>
					</div>
					<ul id="quotation_details">
						<li id="author_name_li">
							<strong><span id="author_name"></span></strong>&nbsp;<span id="author_notable_for" style="display:none;"></span>
						</li>
						<li id="quotation_description" style="display:none;">
						</li>
						<li id="quotation_spoken_by_character_li" style="display:none;">
							<strong><fmt:message key="spoken_by_character" bundle="${msg}"/>: </strong><span id="quotation_spoken_by_character"></span>
						</li>
						<li id="quotation_source_li" style="display:none;">
							<strong><fmt:message key="source" bundle="${msg}"/>: </strong><span id="quotation_source"></span>
						</li>
						<li id="author_summary_li">
							<img class="displayed" id="author_image" style="display:none;"/>
							<span id="author_description" style="display:none;"></span>
						</li>
						<li id="author_birth_li" style="display:none;">
							<strong><fmt:message key="born" bundle="${msg}"/>: </strong><span id="author_birth_date"></span>&nbsp;<span id="author_birth_place" style="display:none;"></span>
						</li>
						<li id="author_death_li" style="display:none;">
							<strong><fmt:message key="died" bundle="${msg}"/>: </strong><span id="author_death_date"></span>&nbsp;<span id="author_death_place" style="display:none;"></span>
						</li>
						<li id="author_website_li" style="display:none;">
							<strong><fmt:message key="website" bundle="${msg}"/>: </strong><a id="author_website_url" href="" target="_blank"></a>
						</li>
					</ul>
					<ul>
						<li style="text-align: right">
							<a id="freebase_link" href="http://freebase.com" target="_blank"><img src="http://www.gstatic.com/freebase/img/freebase-cc-by-61x23.png"alt="Freebase Creative Commons" /></a>
						</li>
					</ul>
				</div>
				
			</div>
			<!-- Project ends =================================================================== -->
			
		
		</div><!-- col1 -->
		<div class="fb-like" data-href="http://quotation.bwgz.org" data-width="450" data-show-faces="false" data-send="false"></div>
	</div>
	<!-- Work page ends ========================================================================= -->
	
	<!-- About page begins ====================================================================== -->
	<div id="about">
		
		<!-- Column 1 begins ==================================================================== -->
		<div class="eight columns">
			
			<h3>Quotation for Android&trade;</h3>
			<p>
			Quotation brings you over 35000 random quotes from thousands of authors. Quotation showcases
			quotes from ancient times to present day. They are a stunning representation of those words
			that have influenced and molded our language and culture.
			</p>
			<p>
			<h4>Features:</h4>
			<ul class="disc">
				<li>Two app widgets for the desktop.</li>
				<li>A short description of the author and a link to Wikipedia.</li>
				<li>Share the quotation by Twitter, Facebook, or email</li>
			</ul>
			<p>
				Quotation for Android is available for free at 
				<a href="https://play.google.com/store/apps/details?id=org.bwgz.quotation">
				Google Play
				</a>
				.
			</p>
			<p>
				<a href="https://play.google.com/store/apps/details?id=org.bwgz.quotation">
				  <img alt="Android app on Google Play"
				       src="https://developer.android.com/images/brand/en_app_rgb_wo_45.png" />
				</a>
			</p>
			<p>Android is a trademark of Google Inc.</p>
		</div>
		<!-- Column 1 ends ====================================================================== -->
		
		<!-- Column 2 begins ==================================================================== -->
		<div class="eight columns">
			
		    <div id="sliderFrame">
		        <div id="slider">
		            <img src="/images/mobile/app-widget-1.png"/>
		            <img src="/images/mobile/app-1.png"/>
		            <img src="/images/mobile/app-2.png"/>
		            <img src="/images/mobile/app-4.png"/>
		            <img src="/images/mobile/app-5.png"/>
		            <img src="/images/mobile/app-6.png"/>
		            <img src="/images/mobile/app-7.png"/>
		            <img src="/images/mobile/app-8.png"/>
		            <img src="/images/mobile/app-9.png"/>
		            <img src="/images/mobile/app-10.png"/>
		        </div>
			</div>
			
		</div>
		<!-- Column 2 ends ====================================================================== -->
	</div>
	<!-- About page ends ======================================================================== -->
	
	<!-- Footer begins ========================================================================== -->
	<footer class="sixteen columns">
		<hr />
		<div style="text-align: center" id="footerLinks">
			<ul  style="text-align: center">
				<li>&copy; 2013 <a href="http://www.bwgz.org" target="_blank">bwgz.org</a>. All rights reserved.</li>
				<li><a href="/policies.html" target="_blank">Terms &amp; Privacy</a></li>
				<li>Powered by <a href="http://www.typeandgrids.com" target="_blank">Type &amp; Grids</a></li>
			</ul>
		</div>
	</footer>
	<!-- Footer ends ============================================================================ -->
		
</div><!-- container -->
</body>
</html>