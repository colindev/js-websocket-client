;(function(o){

    o = o(this.WebSocket);

    if (typeof module == 'object') {
        module.exports = o;
    }

    var scripts = document.getElementsByTagName('script'),
        dom = scripts[scripts.length - 1],
        export_name = dom && dom.getAttribute('name');

    if (export_name) {
        this[export_name] = o;
    }

})(function(WebSocket){
    if ( ! WebSocket) return;

    var re_event = /^on(.+)$/;

    var Conn = function(target){
        var me = this;
        var ws = new WebSocket(target);
        var events = {};
        var channels = {};

        this.close = function () {
            ws && ws.close();
            ws = null;
            return me;
        };

        this.connect = function(other){
            if (! ws) {
                if (other) target = other;
                ws = new WebSocket(target);
                bindEvents(me, ws, events);
            }

            return me;
        };

        this.isAlive = function(){
            return !! ws;
        };

        this.on = function(event, callback){
            if ( ! ws) throw new Error('還沒建立連線');
            if (typeof ws['on'+event] == 'undefined') return me;
            if (typeof callback != 'function') return me;
            if ( ! events[event]) events[event] = [];
            events[event].push(callback);

            return me;
        };

        this.emit = function(msg){
            if ( ! ws) throw new Error('還沒建立連線');
            if (typeof msg != 'string') msg = JSON.stringify(msg);
            return ws.send(msg);
        };

        this.listen = function(chan, callback){
            if ( ! channels[chan]) channels[chan] = [];
            channels[chan].push(callback);

            return me;
        };

        this.unlisten = function(chan){
            if (channels[chan]) channels[chan] = [];
            return me;
        };

        bindEvents(me, ws, events);

        // for listen
        me.on('message', function (e) {
            var m = e.data.match(/^(?:([^:]+):)?\s*([^\$]+)$/);

            if (m) {
                var chan =m[1],
                    msg = m[2];

                if ( ! chan || ! channels[chan]) return;

                try {
                    msg = JSON.parse(msg);
                } catch (e) {}
                for (var i = 0; i < channels[chan].length; i++) {
                    channels[chan][i](msg, e);
                }
            }
        });

        me.on('close', function(){
            me.close();
        });
    };

    function bindEvents(o, ws, events) {
        for (var n in ws) {
            var m = n.match(re_event);
            if ( ! m) continue;

            ws[n] = (function(name){
                return function (e) {
                    fireEvent(o, events[name], e);
                };
            })(m[1]);
        }
    }
    function fireEvent(o, events, e){
        if ( ! events) return;
        for (var i = 0; i < events.length; i++) {
            events[i].call(o, e);
        }
    }

    return {
        connect: function (url) {
            return new Conn(url);
        }
    };

});