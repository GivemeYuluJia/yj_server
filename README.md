# yj_server



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org

 ### mysql 操作
    -- 删除数据库
        drop database [数据库名称];
    
    -- 创建数据库
        create database [数据库名称];
    
    -- 创建表
        use [数据库名称]
        create table [表名称](
            id int(10) not null auto_increment,
            name varchar(20) not null default 'xx' comment '用户名',
            password varchar(50) not null commrnt '密码',
            primary key(id)
        )engine=InnoDB charset=utf8;

    -- 查看表
        show table

    -- 超看表结构
        desc user
    
    -- 删除表
        drop table [表名称]
    
    --插入表数据
        insert into [表名称]() values()

    -- 查询表数据
        select * from [表名称]

    --修改表数据
        update [表名称] set password = 'xxx' where id = x;

    -- 删除表数据
        delete from [表名称] where id = x;