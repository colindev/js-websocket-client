var qs = require('querystring');

self['GET'] = function(prop){
    var data = qs.parse(location.href.replace(/^[^?]+\?/, ''));

    return typeof prop == 'undefined' ? data : data[prop];
};
