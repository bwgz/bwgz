/*
••••••••••••••••••••••••

Powered by Type & Grids™
www.typeandgrids.com

••••••••••••••••••••••••
*/

jQuery.easing.def = "easeOutQuad";

$(document).ready(function()
{
	// Make enlarge buttons inactive if no onClick event
	$(".enlargeButton").each(function() {
        if ( $(this).attr("onClick") == undefined )  {
            $(this).addClass("projectNavInactive");
        };
    });
	
	// For fluid video embedding
	$(".video").fitVids();
	
	// Hide project info
	$(".projectInfo").css("display", "none");
	// Don't hide video info
	$(".videoInfo").css("display", "inline");
	
	// Page navigation
	var isWorkCurrentPage = true;
	var isAboutCurrentPage = false;
	
	$("#workPage").click(function()
		{
			if(!isWorkCurrentPage)
			{
				isWorkCurrentPage = true;
				isAboutCurrentPage = false;
				$("#workPage").attr("class", "currentPage");
				$("#aboutPage").removeClass("currentPage");
				
				$("#about").fadeOut(500, function()
				{
					$("#work").fadeIn(500);
				});
			}
		});
	
	$("#aboutPage").click(function()
		{
			if(!isAboutCurrentPage)
			{
				isAboutCurrentPage = true;
				isWorkCurrentPage = false;
				$("#aboutPage").attr("class", "currentPage");
				$("#workPage").removeClass("currentPage");
				
				$("#work").fadeOut(500, function()
				{
					$("#about").fadeIn(500);
				});
			}
		});
	
	// Make Work page current page
	$("#workPage").attr("class", "currentPage");
	
	// Hide About page
	//$("#about").css("display", "none");
	$("#about").fadeOut(0);
	
	// For site fade site in
	$(".container").css("display", "none");
	
});

// Remove site preloader after site is loaded
$(window).load(function() {
	$('#sitePreloader').delay(200).fadeOut(500, function() {
		$(this).remove();
	});
	
	// Fade site in
	$(".container").delay(700).fadeIn(500);
});

// Portfolio slider setup
jQuery(document).ready(function($) {
	var projectInfo = $('.projectInfo');
	var projectInfoOpen = false;

	function openProjectInfo() {
		projectInfo.stop().delay(200).slideDown(900);
		$("#info_link").attr("src", "/images/arrow-up.png");
		projectInfoOpen = true;
	}

	function closeProjectInfo() {
		projectInfo.slideUp(900);
		$("#info_link").attr("src", "/images/arrow-down.png");
		projectInfoOpen = false;
	}

	$(".projectThumbnail").click(function(e) {
		if(projectInfoOpen) {
			closeProjectInfo();
		}
		else {
			openProjectInfo();
		}
	});
	
	$("#info_link").click(function(e) {
		console.debug("info_link: " + e);
		if(projectInfoOpen) {
			closeProjectInfo();
		}
		else {
			openProjectInfo();
		}
	});
	
	$(".closeButton, #aboutPage").click(function() {
		// Add a delay to fix weird issue with resizing About page
		function closeSlider() {
			closeProjectInfo();
		}
		setTimeout(closeSlider, 1);
	});
});