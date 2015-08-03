;(function(test){

    var sha1 = require('./sha1.js'),
        self_attr = require('./self_attr'),
        url = self_attr('ws-url') || 'ws://rde-tech.vir888.com:81/gows/',
        interval = parseInt(self_attr('ws-interval')) || 10,
        key;

    key = document && document.cookie && document.cookie.match(/PHPSESSID=([^;]+)/);
    key = key ? key[1] : new Date;
    key = sha1(key).replace(/^(\w{7}).+$/, '$1');

    test(url+'?key='+key, interval, this.console ? function(){console.log.apply(console, arguments)} : function(){});

})(function(url, intval, echo){

    var Socket = require('./SocketConnection.js');
    var ws = Socket.connect(url),
        // 單趟封包傳遞時間
        data_travel_ms = 0,
        // server 跟 local 毫秒差
        server_diff_ms = 0,
        // 發出訊息時間點(client)
        ping_ms = 0,
        // 收到訊息時間點(client)
        pong_ms = 0,
        // 收到訊息時間點(server)
        in_ms = 0,
        // 發出訊息時間點(server)
        out_ms = 0,
        guess_server_in_ms = 0,
        timer;

    if ( ! ws) return;

    ws.on('open', function(){
        ping();
        timer = setInterval(ping, parseInt(intval) * 1000);
    });

    ws.listen('pong', function(msg){
        msg.
            replace(/in:(\d+)/, function(m, $1){

                pong_ms = (new Date).getTime();

                in_ms = parseInt($1);

                // 計算封包單趟毫秒
                data_travel_ms = (((new Date).getTime() - ping_ms) / 2) >> 0;

                // 計算與 server 毫秒差
                server_diff_ms = in_ms - (ping_ms + data_travel_ms);

                echo({
                    pong_ms: pong_ms,
                    ping_ms: ping_ms,
                    'pong:in': in_ms,
                    data_travel_ms: data_travel_ms,
                    server_diff_ms: server_diff_ms,
                    guess_server_in_ms: guess_server_in_ms,
                    guess_miss_ms: guess_server_in_ms - in_ms
                })
            }).
            replace(/out:(\d+)/, function(m, $1){
                out_ms = parseInt($1);
                echo({
                    'pong:out': out_ms
                })
            });
    });

    ws.listen('broadcast-ping', function(msg){
        var reply;

        ws.emit(reply = 'broadcast-pong:'+((new Date).getTime() + server_diff_ms + data_travel_ms));

        echo('emit: ['+reply+']');
    });

    ws.on('close', function () {
        timer = clearInterval(timer);
    });

    function ping(){
        var reply;
        ping_ms = (new Date).getTime();
        guess_server_in_ms = ping_ms + server_diff_ms + data_travel_ms;
        ws.emit(reply = 'ping:'+guess_server_in_ms);

        echo({
            emit: reply,
            ping_ms: ping_ms
        });
    }

});
