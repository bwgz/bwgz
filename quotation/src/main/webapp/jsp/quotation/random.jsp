<%@ page trimDirectiveWhitespaces="true" %>
<%@ page contentType="application/json; charset=UTF-8" %>
<% response.setHeader("Access-Control-Allow-Origin","*"); %>
<% response.setHeader("Pragma","no-cache"); %>
<%= new org.bwgz.quotation.Quotation() %>
