知识点

1 什么是http

2 http用途

3 http与https

4 http的缓存

5 cookie 与 session

1.cookies存储在浏览器中,可在浏览器控制台下查看.按照域名,路经,存储时间等分权限存储的.
2.session存储在服务器中,一般默认用文件方式存储在服务器,存储方式一般为类似json的方式.session存储原理很简单,即使服务器端语言不支持也可自己实现.
3.session的使用需要客户端来发送识别,也就是session_id.这个session_id可以用cookies存储并发送,也可以直接附在url中传送.由于url传送会不太友好,现在一般用cookies传送.所以禁用cookies会有影响,就只能用url方式传送了.但cookies不是唯一的方式.
3.现在一般使用cookies存储session_id和一些校验工作,主要数据都存储在session.这样容易控制和统计.但具体如何使用两者你可按照自己想法去做.
5.session除了用文件方式存储,还可以存储在各种数据库,或者内存数据库,比如redis等中.建议不要存在mysql等数据库,因为session的读取写入很频繁,对数据库压力很大.建议存储在内存数据库中.
