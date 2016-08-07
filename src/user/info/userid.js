//#exclude
/**
 * This file is a part of the ExtendedProgrammingInterface
 * 
 * This file is licensed under the MIT Open Source license
 */
//#end

/**
 * EPI::user::info::userid
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
epi.user.info.userid = function(user) {
    return new Promise(function(resolve, reject) {
        epi._http.ajax({
            url:      mw.util.wikiScript('api'),
            type:     'POST',
            dataType: 'JSONP',
            success:  (data) => resolve(data['query']['users'][0]['userid']),
            error:    (data) => reject(data['error']),
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