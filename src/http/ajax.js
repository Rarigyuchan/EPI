//#exclude
/**
 * This file is a part of the ExtendedProgrammingInterface
 * 
 * This file is licensed under the MIT Opens Source license
 */
//#end

/**
 * EPI::_http::ajax
 * 
 * Make an AJAX call using jQuery when given the appopriate objects
 * 
 * @param [Object] data: jQuery.ajax request object
 */
epi._http.ajax = data => $.ajax(data);