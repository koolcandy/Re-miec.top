
Lecture 13\.A 硬盘、CD\-ROM
========================


机械硬盘的结构
-------


CS240 有提到过一些，这里补充一下


* 盘片 platter：顾名思义
* 磁头 head：有多少个盘片，就会有多少个磁头。硬盘磁头和盘片之间会有一点空隙（air gap），但是软盘（floppy disk）就是紧贴的，没有空隙。
* 磁道 track：盘片上的一圈圈的同心圆环
* 扇区 sector：最小的可以寻址、读取、写入的存储单元，早期普遍是 512 字节，后来就 4096 了
* 柱面 cylinder：每个盘片上的磁道的数目是相等的。位置相同的磁道，构成了一个圆柱体的柱面。


早期硬盘对于物理地址编址的方法是 **柱面\-磁头\-扇区（CHS）**。


![](https://s2.loli.net/2023/06/30/rRVAJk49Qlef1pG.png)


![](https://s2.loli.net/2023/06/30/J2GVIdkc41wfLai.png)


课件上用一页半的篇幅讲了一下法拉第电磁感应以及磁头的读写原理。不过我觉得这个肯定不会在考试当中出现。


一些编码方式
------


### 调频编码 FM (Frequency modulation)


![](https://s2.loli.net/2023/07/03/fE42gt39wcrUaKV.png)


特点是：


* 对于 0 和 1，都要在开始的时候（交界处）改变电流方向
* 对于 1，要在中间改变电流方向


#### 锁相环 Phase lock loops


用于从 FM 信号生成时钟信号。


### MFM (Modified Frequency Modulation)


![](https://s2.loli.net/2023/07/03/7psVDhWmigRqxQI.png)


\~\~感觉图最后一小段怪怪的，是不是有错啊\~\~


特点是：


* 对于 0，只有在遇到两个或更多连续的 0 的时候，才在开始的时候改变电流方向
* 对于 1，在中间改变电流方向


相比 FM 信号，MFM 电流转变的次数基本上只有一半，因此可以拥有更高的密度。


### RLL


RLL 是 Run Length Limited 的意思。


![](https://s2.loli.net/2023/07/03/xyM7BGViowNREvI.png)


没看懂是干嘛的。只知道比 MFM 效率还高 40%。


#### RLL 2\-7


1 之间至少隔俩 0，最多隔 7 个零。


关于硬盘的一些零碎知识点
------------


### 关于性能


* access time：指的是从发出访问请求到成功访问之间的之间，约 20ms
* seek time：指的是磁头移动到指定位置的时间，约 12ms
* latency time：PLL 等设备开始读取对应磁道上的数据所需要的时间，一般 8ms
* transfer rate：指的是一秒钟能读取多少数据，硬盘 10Mb/s，软盘 1Mb/s


### 磁道/扇区的格式


![](https://s2.loli.net/2023/07/03/tvYAJLCDSRG9fbO.png)


磁道和扇区会包含编号、位置信息、数据、校验数据等信息。


### 磁盘控制器


无论是硬盘还是软盘，都需要有一个控制器，来实现磁头与盘片的同步、数据的解码、与 PC 的数据传输等功能。


如下是 8272 软盘控制器的结构示意图。但是这个应该不会考。


![](https://s2.loli.net/2023/07/03/1Sfao8vmiYH2s7b.png)


### 错误检测和修正


比如有一个电话号码，865432123\.


假如写的时候有一位不小心损坏了，变成了 8654321?3\.


有一个非常简单的方法：可以提前记录这段的数字总和（34），然后用 34 减去当前的 sum（30），就可以得到缺失数据：2\.


但是这个方式有一个缺陷：假如这一位数直接丢掉了（86543213），那就无法纠正。假如有两位都缺失，也无法纠正。


#### MDPC 编码


MDPC 是 Multidimensional parity\-check code 的意思（多维奇偶性检验码）。


比较常见的是把 16 位编码成 25 位（4 维）。一般 n 维可以纠正 n/2 个错误。


如图，用 0 表示一行或一列的和是奇数，用 1 表示是偶数：


![](https://s2.loli.net/2023/07/03/e4gaZHksh3i2t96.png)


然后就可以发现，BH 位置上的数据出错了。需要改成 0\.


### 连接方式：EIDE/SCSI


最初磁盘（硬盘软盘磁带等）是通过 IDE 接口连接到计算机的。但是这个接口只能支持两个盘，而且每个盘不能超过 528MB。


后来 IDE 被改进成了 EIDE，也就是 ATA\-2。EIDE 允许连接四个设备，而且容量限制也变大了。


SCSI 是一种菊花链的样子，可以把多个设备连接起来，一般是 Mac、RISC 工作站以及小型设备使用。当 SCSI 当中的设备需要进行数据备份的时候，可以直接由 SCSI 的控制器完成。


磁盘格式
----


一般磁盘上的数据，都是从第 0 个磁道的第 0 个扇区开始存储的。


1. 最开始是启动记录（boot record），这部分的大小不是很固定。
2. 然后是 FAT（文件分配表）
3. 为了保证稳定性，FAT 还要备份一遍
4. 根目录（root directory）
5. 数据


#### 关于 FAT


fat 是微软发明的东西。早期的 Windows 和 是 fat16，后来就渐渐的是 fat32 了。


磁盘上的扇区特别特别的多，于是 Windows 把相邻的扇区叫做一个簇（cluster），一般一个簇最大也就 32KB，也就是 64 个扇区。**簇是文件可以占用的空间的最小单位**。所以假如簇太大，然后存了一个很小的文件，会导致浪费（比如一个簇 32KB，存了 1KB 进去，那就浪费了 97% 的空间）。


每个簇都会包含自己的编号，还有下一个簇的编号。因此如果一个文件占用了多个簇，可以用类似链表的方式访问。而第一个簇的位置是保存在根目录当中。


FAT16 最多只能有 65536 个簇，所以只能存储 2G 内容。


但是如果一个磁盘大于 2G，FAT16 怎么搞？答案是，用 FAT32，或者是分区（partition），如下所述：


* 比如一个物理磁盘，假如是 6G，可以通过分区，搞成三个 2G 的（C，D，E）
* 而 fat32 就可以用 4e9 个簇。每个簇的大小甚至可以只有 1\~2 个字节，就可以用到 6G 磁盘上


顺带一提，FAT 文件系统会带有一个叫做回收站的东西（谁不知道啊）。文件删除之后其实不是真的删除，而是扔到了回收站里（谁不知道啊）。


#### 根目录


每一个文件，在跟目录当中，需要用 32 个字节来存储。其中：


* 8 个字节存文件名
* 3 个字节存扩展名
* 1 个字节存文件属性
* 10 个字节保留
* 2 个字节存文件创建时间
* 2 个字节存文件创建日期
* 2 个字节存文件所在簇的起始位置
* 4 个字节存文件的大小


最终形成了像这样的链表结构


![](https://s2.loli.net/2023/07/03/9qMnXdlpJSoIGgh.png)


RAID（Redundant Array of Inexpensive Disks）
------------------------------------------


可以让磁盘的访问变得更快，还可以让磁盘变得稳定。


具体原理大概就是说，数据分布在多个磁盘上，然后额外添加了一下校验信息。由于对于多个磁盘可以并行访问，所以可以提高读写效率。


有一些 RAID 系统还支持热插拔（hot\-swap），意思就是说，假如有一个硬盘出现了问题，可以直接拔掉，换个新的上去，然后 RAID 系统可以根据冗余数据，自动算出来之前那个硬盘的内容是什么，填给新的。


RAID 需要有一个控制器，在不同的盘之间保持数据的同步：


![](https://s2.loli.net/2023/07/03/OzdFBLHjSr7MpV6.png)


### RAID 的标准等级


#### 0 级


就是单纯的把一堆磁盘（比如，四个）连接起来，然后不使用额外的校验位，只是提高了数据的存取速度。


缺点是万一有一个盘坏了，整个阵列的数据都没了。


#### 1 级


就是把一份数据同时写入到多个盘里面，也没有额外的校验位。


#### 3 级


使用一个 **专门的盘** 存储奇偶校验信息（约占总空间 20%）。


#### 5 级


数据和奇偶校验信息是 **分布式** 的存储在多个盘上的。相比 level 3，稳定性会更好一些。


#### 10 级


就是 0 级 和 1 级的组合，因此需要至少 4 个盘。


CD\-ROM
-------


* DVD（Digital Video Disc），一般是 4\.7G；有一些双面双层 DVD 可达 17 GB（大约四倍）
* CD（680GB），可以通过 CD\-R 或 CD\-RW 等技术进行批量生产（pressing）


