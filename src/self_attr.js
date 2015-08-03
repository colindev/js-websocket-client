;(function(factory){

    module.exports = factory();

})(function(){

    return function(prop){
        var scripts = document.getElementsByTagName('script'),
            dom = scripts[scripts.length - 1];

            return dom ? dom.getAttribute(prop) : null;
    };

});