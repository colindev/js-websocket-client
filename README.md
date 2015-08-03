# Socket Client

此專案提供工具
1. [SocketConnection.js] Client 端連線工具
2. [測試界面] Client 端連線測試界面
3. [test-001.js] Client 端嵌入式測試工具

### demo SocketConnection.js

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

### demo UI

[測試界面]

### 線上測試

```html
<script src="http://rde-tech.vir888.com/socket/test-001.min.js"></script>
<!-- or -->
<script 
src="http://rde-tech.vir888.com/socket/test-001.min.js"
ws-url="ws://another.websocket.url"
ws-interval="5"
></script>
```

[test-001.html] Demo


[測試界面]:http://rde-tech.vir888.com/socket/client.html
[SocketConnection.js]:src/SocketConnection.js
[test-001.js]:src/test-001.js
[test-001.html]:http://rde-tech.vir888.com/socket/test-001.html?src=test-001.min.js&ws-url=ws://rde-tech.vir888.com:81/gows/
