# Socket Client

此專案提供工具

- [SocketConnection.js] Client 端連線工具
- [測試界面] Client 端連線測試界面
- [test-001.js] Client 端嵌入式測試工具

### Usage 

##### SocketConnection.js

```html

<script src="path/to/SocketConnection.js" name="SC"></script>
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

### Online Test UI

[WebSocket Test UI](https://colindev.github.io/socket/client.html)
