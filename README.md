# Socket Client

此專案提供兩個工具
1. [SocketConnection.js]
2. [測試界面]

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
```
[test-001.min.js]

[測試界面]:http://rde-tech.vir888.com/socket/client.html
[SocketConnection.js]:src/SocketConnection.js
[test-001.min.js]:test-001.min.js
