# Socket Client

此專案提供兩個工具
1. [SocketConnection.js]
2. [測試界面]

### demo SocketConnection.js

```html

<script src="http://colin.test:8000" name="SC"></script>
<script>(function(){if (this.SC) {
        var conn = SC.connect('ws://your.websocket.url');
        conn.on('message', function(e){
                console.log(e.data);
        });

        conn.on('open', function(){

                conn.emit({hello:'world'});
        });

        conn.listen('news', function(msg, e){
                console.log(msg)
        });
}})();</script>

```

### demo UI

[測試界面]

[測試界面]:http://rde-tech.vir888.com/socket/client.html
[SocketConnection.js]:SocketConnection.js

