
var Socket = require('./SocketConnection.js'),
    sha1 = require('./sha1.js');

(function(test){

    var url = 'ws://rde-tech.vir888.com:81/gows/',
        //url = 'ws://colin.test:8001/',
        key = sha1(new Date).replace(/^(\w{7}).+$/, '$1');

    test(url+'?key='+key, 10);

})(function(url, intval){

    var ws = Socket.connect(url),
        // 單趟封包傳遞時間
        data_travel_ms = 0,
        // server 跟 local 毫秒差
        server_diff_ms = 0,
        ping_ms = 0,
        pong_ms = 0,
        timer;

    if ( ! ws) return;

    ws.on('open', function(){
        ping();
        timer = setInterval(ping, parseInt(intval) * 1000);
    });

    ws.listen('pong', function(msg){
        msg.
            replace(/in:(\d+)/, function(m, $1){
                var in_ms = parseInt($1);

                // 計算封包單趟毫秒
                data_travel_ms = (((new Date).getTime() - ping_ms) / 2) >> 0;

                // 計算與 server 毫秒差
                server_diff_ms = ping_ms - in_ms - data_travel_ms;

                console.log({
                    now: (new Date).getTime(),
                    ping_ms: ping_ms,
                    in_ms: in_ms,
                    data_travel_ms: data_travel_ms,
                    server_diff_ms: server_diff_ms
                })
            }).
            replace(/out:(\d+)/, function(m, $1){
                pong_ms = parseInt($1);

                console.log({
                    pong_ms: pong_ms
                })
            });
    });

    ws.listen('broadcast-ping', function(msg){
        var reply;

        ws.emit(reply = 'broadcast-pong:'+((new Date).getTime()+server_diff_ms));

        console.log('emit: ['+reply+']');
    });

    ws.on('close', function () {
        timer = clearInterval(timer);
    });

    function ping(){
        var reply;
        ping_ms = (new Date).getTime();
        ws.emit(reply = 'ping:'+(ping_ms+server_diff_ms));

        console.log('emit: ['+reply+']');
    }

});
