<%@ page trimDirectiveWhitespaces="true" %>
<%@ page contentType="application/json; charset=UTF-8" %>
<% response.setHeader("Access-Control-Allow-Origin","*"); %>
<%= new org.bwgz.quotation.Quotation() %>
