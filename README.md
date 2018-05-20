# Moses

## 登封在线商城

> 项目代号摩西 Moses（出埃及记那个，拯救以色列民族）

> ---- 游磊青（@youlq）

## 项目说明

- 项目目录结构

```
+-app                         # 前端代码
| +-components                # 界面组件
| +-services                  # 服务
| +-styles                    # 样式
| +-utils                     # 工具方法
| +-app.vue                   # 总体视图框架
| +-index.html                # 入口 HTML
| +-index.js                  # 入口 JS
|
+-build                       # 打包构建配置
+-config                      # 项目配置
| +-env                       # 不同环境的不同配置(production/development/test ...)
|
+-dist                        # 构建打包目录
+-lib                         # 后端代码
| +-config                    # 模块配置(express/log4js ...)
| +-controllers               # 控制器，主要逻辑
| +-models                    # 数据模型
| +-utils                     # 工具集合
| +-route.js                  # 后端路由
|
+-logs                        # 日志
+-node_modules                # node 模块
+-gulpfile.js                 # gulp 入口
+-package.json                # 后端依赖库描述文件
+-server.js                   # 服务启动入口
```

**`node_modules` 目录下的包要通过 `npm` 下载**

## 环境依赖

- [Node.js](http://nodejs.org/) - [下载和安装](http://nodejs.org/download)
- 数据库 [MongoDB](http://www.mongodb.org/) - [下载和安装](http://www.mongodb.org/downloads)
- [canvas](https://github.com/Automattic/node-canvas)
- 字体 `yum install -y open-sans-fonts.noarch`

### canvas 系统包依赖

- 下载相应 rpm 二进制包
- `rpm --import /etc/pki/rpm-gpg/RPM*`
- `rpm -i --force xxx.rpm`

## 使用方法

### 设置项目名称:

替换所有文件中的 `moses` 改为项目的名称

### 根据 `package.json` 下载相应包:

```
cd 到项目目录
npm install
```

### 运行平台--开发模式

```
npm start
```

### 打发行包

```
npm run build
```

项目目录下的 `dist/moses.tar.gz` 为发行包

**请参考下方 部署到 CentOS 说明**

### 部署到 CentOS 说明

CentOS 版本：CentOS 7.0

#### 安装 gcc, g++, openssl, python(要求2.6或2.7版本):

```
yum install gcc gcc-c++ openssl-devel
```

#### 安装 Node.js

```
wget https://npm.taobao.org/mirrors/node/latest/node-v5.4.1.tar.gz
tar -xf node-v5.4.1.tar.gz
cd node-v5.4.1
./configure --prefix=/moses/node
make && make install
```

修改 `/etc/profile`， 添加

```
export NODE_HOME=/moses/node
export PATH=$NODE_HOME/bin:$PATH
```

执行

```
source /etc/profile
```

#### 安装并设置 MongoDB

```
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.2.1.tgz
tar zxvf mongodb-linux-x86_64-3.2.1.tgz
mv mongodb-linux-x86_64-3.0.3.tgz /moses/mongodb
cd /moses/mongodb
mkdir -p data/db
export MONGO_HOME=/moses/mongodb
vi mongo.conf
```

内容为

```
dbpath = /moses/mongodb/data/db
logpath = /moses/mongodb/mongo.log
directoryperdb = true
logappend = true
storageEngine = wiredTiger
journal = true
rest = true
```

启动 MongoDB

```
$MONGO_HOME/bin/mongod -config $MONGO_HOME/mongo.conf
```

重新启动 mongoDB

```
$MONGO_HOME/bin/mongod -config $MONGO_HOME/mongo.conf
```

#### 安装 pm2

```
 npm install pm2@latest -g
```

**注意:详细使用可参考 [pm2 官网](https://github.com/Unitech/pm2)**

#### 部署平台发行包

复制发行包 `moses.tar.gz` 到操作系统

```
tar zxvf moses.tar.gz -d moses
cd moses
chmod 777 *.sh
```

#### 设置 MongoDB 和平台自启动

```
echo "cd /moses/moses" >> /etc/rc.local
echo "./start.sh &" >> /etc/rc.local
```

**注意:自启动只允许设置一次，`/etc/rc.local` 内容不要重复**

#### 启动 MongoDB 和平台

```
./start.sh
```

访问路径 <https://localhost:8000>

#### 关闭 MongoDB 和平台

```
./stop.sh
```
