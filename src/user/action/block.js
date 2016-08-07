//#exclude
/**
 * This file is a part of the ExtendedProgrammingInterface
 * 
 * This file is licensed under the MIT Open Source license
 */
//#end

/**
 * EPI::user::action::block
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
epi.user.action.block = function(data) {
    return new Promise(function(resolve, reject) {
        epi._http.ajax({
            url:        mw.util.wikiScript('api'),
            type:       'POST',
            dataType:   'JSON',
            success:    (data) => resolve(data),
            error:      (data) => reject(data['error']),
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