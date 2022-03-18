
    -- 创建数据库
        create database egg_yjserver;
    
    -- 创建表
        use egg_yjserver;
        -- 用户表
        create table `user`(
            `id` int(10) not null auto_increment,
            `username` varchar(20) default null comment '用户名',
            `password` varchar(64) default null comment '密码',
            `avatar` text comment '头像',
            `sex` varchar(3) comment '性别',
            `phone` varchar(20) default null comment '电话',
            `email` varchar(30) default null comment '邮箱',
            `school` varchar(20) default null comment '校园简称',
            `schoolName` varchar(20) default null comment '校园名称',
            `signature` varchar(300) default null comment '用户签名',
            `organization` varchar(100) default null comment '班级组织',
            `title` varchar(100) default null comment '班级职位',
            `country` varchar(20) default null comment '国家',
            `province` varchar(20) default null comment '省会',
            `provinceKey` varchar(20) default null comment '省会key',
            `city` varchar(20) default null comment '城市',
            `cityKey` varchar(20) default null comment '城市key',
            `address` varchar(20) default null comment '地址',
            `createTime` timestamp default null comment '创建时间',
            `updateTime` timestamp default null comment '更新时间',
            primary key(`id`)
        )engine=InnoDB auto_increment=1 default charset=utf8 comment='用户表';
        INSERT INTO `user` VALUES
        {1, '马大葱'，'123456', 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F1110%252F4bbe6708j00r2bj2m000dc0008c008cg.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642580933&t=e749295b6c4feb3298de2a60111649ef', '男', '86-17850392284', '550992963@qq.com', 'FIT', '福州理工学院', 'emo小王子马大葱是也', '18级物联网工程二班', '工具人', '中国', '山西省', '140000', '大同市', '140200', '马家村马小马路 1 号', '2021-12-27 12:27:27', '2021-12-27 12:27:27'};
        
        -- 用户标签表
        create table `userTag` (
            `id` int not null auto_increment,
            `label` varchar(50) default null comment '标签名称',
            `color` int default null comment '颜色标签',
            `userId` int not null comment '用户id',
            primary key(`id`)
        ) engine=InnoDB auto_increment=1 default charset=utf8 comment='用户标签表';

        -- 用户学期表
        create table `schoolterm` (
            `id` int not null auto_increment,
            `createTime` timestamp default null comment '开始时间',
            `endTime` timestamp default null comment '结束时间',
            `term` int not null comment '学期',
            `userId` int not null comment '用户id',
            `schoolId` int not null comment '校园id',
            `title` varchar(20) default null comment '标题',
            primary key(`id`)
        ) engine=InnoDB auto_increment=1 default charset=utf8 comment='用户校园学期表';

        -- 用户成绩表
        create table `userscore` (
            `id` int not null auto_increment,
            `name` varchar(30) default null comment '课程名',
            `type` varchar(30) default null comment '课程类型',
            `credit` float not null comment '学分',
            `score` varchar(20) not null comment '成绩',
            `createTime` timestamp default null comment '创建时间',
            `connectId` int not null comment '连接学期表id',
            primary key(`id`)
        ) engine=InnoDB auto_increment=1 default charset=utf8 comment='用户校园成绩表';

        -- 校园卡订单表
        create table `campusCardOrders` (
            `id` int not null auto_increment,
            `order_number` varchar(20) default null comment '订单编号',
            `userId` int not null comment '用户id',
            `schoolId` int not null comment '校园id',
            `isPayed` int default 0 comment '是否支付 0未支付 | 1已支付',
            `payMoney` int not null comment '支付金额',
            `createTime` timestamp default null comment '创建时间',
            `updateTime` timestamp default null comment '更新时间',
            primary key(`id`)
        )engine=InnoDB auto_increment=1 default charset=utf8 comment='校园卡订单表';

        create table `outgoingForm` (
            `id` int not null auto_increment,
            `formNumber` varchar(20) default null comment '外出单编号',
            `userId` int not null comment '用户id',
            `schoolId` int not null comment '校园id',
            `professionalGrade` varchar(30) not null comment '年级专业',
            `phone` varchar(20) default null comment '电话',
            `result` varchar(200) default null comment '外出事由',
            `province` varchar(20) default null comment '省会',
            `provinceKey` varchar(20) default null comment '省会key',
            `city` varchar(20) default null comment '城市',
            `cityKey` varchar(20) default null comment '城市key',
            `address` varchar(20) default null comment '地址',
            `state` int default 0 comment '请假单状态 是否支付 -1已撤销 | 2已发送 | 3审批中 4审批通过',
            `startAt` timestamp default null comment '开始时间',
            `endAt` timestamp default null comment '结束时间',
            `createTime` timestamp default null comment '创建时间',
            primary key(`id`)
        )engine=InnoDB auto_increment=1 default charset=utf8 comment='外出请假单表';
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