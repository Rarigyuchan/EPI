//#exclude
/**
 * This file is a part of the ExtendedProgrammingInterface
 * 
 * This file is licensed under the MIT Open Source license
 */
//#end

/**
 * EPI::user::action::ban
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
epi.user.action.ban = function(data) {
    return new Promise(function(resolve, reject) {
        epi._http.ajax({
            url:      mw.util.wikiScript('index'),
            type:     'POST',
            dataType: 'JSON',
            success:  (data) => resolve(data),
            error:    (data) => reject(data),
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