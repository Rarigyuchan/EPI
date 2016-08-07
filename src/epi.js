/**
 * ExtendedProgrammingInterface (EPI)
 * 
 * Licensed under the MIT Open Source license.
 *     See LICENSE.md for the full text.
 * 
 *     The extended programming interface or EPI defines a set of methods that
 * makes fetching certain bits of data from the API easier than it is by
 * turning large AJAX calls into simple one liners using Promises to eliminate
 * the need to use callback.
 * 
 *     By using Promises the EPI reduces and even eliminates the need to use
 * callbacks within your script making it both much cleaner to write but also
 * easier to read and follow along with. Promises also provide the ability to
 * handle errors through the .catch() method.
 * 
 *     To learn more about how promises work see the link below as well as the
 * provided EPI documentation for explanations of each method included in the
 * EPI as well as how to use it within your own scripts.
 * 
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
 * 
 * Current methods:
 *     _http:
 *         ajax
 *     user:
 *         action:
 *             ban
 *         info:
 *             userid
 */

/**
 * Some notes on contributing to the EPI
 * 
 *     First, all functions that can be written on a single line must be
 * written as such using arrow functions. Functions that can be written on a
 * single line are ones that only consist of one statement. For an example of
 * this please see ExtendedProgrammingInterface::_http::ajax()
 * 
 *     Second, when composing objects make sure that all keys start on the same
 * column and that all values do the same. Values should start no more than one
 * space after the end of the longest key and all values that would start
 * before this column must be brought up to this column using successive spaces
 * 
 *     Third, try to keep all lines at a max of 80 characters. It is fine if a
 * line must go over this limit but try to wrap it at the earliest possible
 * point in order to prevent this.
 * 
 *     Fourth, when using AJAX you must always do so in the context of a promises
 * in order to avoid the need to use a callback.
 */

(function(window, $, mw) {
    var ExtendedProgrammingInterface = {
        _http: {},
        user:  { info: {}, action: {} },
        wall:  {}
    }, epi = ExtendedProgrammingInterface;

    

/**
 * EPI::_http::ajax
 * 
 * Make an AJAX call using jQuery when given the appopriate objects
 * 
 * @param [Object] data: jQuery.ajax request object
 */
epi._http.ajax = data => $.ajax(data);
    

/**
 * EPI::user::ban
 * 
 * Bans a user from chat (if user is admin or mod)
 * 
 * @param [Object] data: {
 *                           'userId':   [Number],
 *                           'duration': [Number],
 *                           'reason':   [String]
 *                       }
 * @return [Promise]
 */
epi.user.ban = function(data) {
    return new Promise(function(resolve, reject) {
        epi._http.ajax({
            url:      mw.util.wikiScript('index'),
            type:     'POST',
            dataType: 'JSON',
            error:    (data) => reject(data),
            success:  (data) => (data.error) ? reject(data)
                                             : resolve(data),
            data:     {
	                      action:      'ajax',
	                      rs:          'ChatAjax',
	                      method:      'blockOrBanChat',
	                      userToBanId: data.userId,
	                      time:        data.duration,
	                      reason:      data.reason,
	                      mode:        'global',
	                      token:       mw.user.tokens.get('editToken')
                      }
        });
    });
};
    

/**
 * EPI::user::block
 * 
 * Blocks a user from the wiki if they are admin
 * 
 * Comments:
 *     Omit nocreate and autoblock to disable them
 *     Set them to true to enable them
 * 
 * @param [Object] data: {
 *                           'username':  [Number],
 *                           'duration':  [Number],
 *                           'reason':    [String],
 *                           'nocreate':  [Boolean],
 *                           'autoblock': [Boolean]
 *                       }
 * @return [Promise]
 */
epi.user.block = function(data) {
    return new Promise(function(resolve, reject) {
        epi._http.ajax({
            url:        mw.util.wikiScript('api'),
            type:       'POST',
            dataType:   'JSON',
            error:      (data) => reject(data),
            success:    (data) => (data.error) ? reject(data['error'])
                                               : resolve(data['block']),
            beforeSend: function(xhr, settings) {
                if (data.nocreate) settings.data += '&nocreate';
                if (data.autoblock) settings.data += '&autoblock';
            },
            data:       {
                            action:    'block',
                            user:      data.username,
                            expiry:    data.duration,
                            reason:    data.reason,
                            format:    'json',
                            token:     mw.user.tokens.get('editToken')
                        }
        });
    });
};
    

/**
 * EPI::user::getUserId
 * 
 * Get a user's ID from the API
 * 
 * Comments:
 *     I use JSONP here because jQuery will automatically parse the result
 *     of the resquest for me and return a nice little object for use to
 *     return.
 * 
 * @param [String] user: username of the user to get the ID of
 * @return [Promise]
 */
epi.user.getUserId = function(user) {
    return new Promise(function(resolve, reject) {
        epi._http.ajax({
            url:      mw.util.wikiScript('api'),
            type:     'POST',
            dataType: 'JSONP',
            error:    (data) => reject(data),
            success:  (data) => (data === 'undefined') ? reject('undefined')
                                                       : resolve(data['query']['users'][0]['userid']),
            data:     {
                          action:  'query',
                          list:    'users',
                          ususers: user,
                          usprop:  '|',
                          format:  'json'
                      }
        });
    });
};

    if (typeof window.ExtendedProgrammingInterface === 'undefined') {
        window.ExtendedProgrammingInterface = ExtendedProgrammingInterface;
        window.epi = ExtendedProgrammingInterface;
    }
})(window, jQuery, mediaWiki);