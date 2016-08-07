//#exclude
/**
 * This file is a part of the ExtendedProgrammingInterface
 * 
 * This file is licensed under the MIT Open Source license
 */
//#end

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