const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const dds = require('./DataDealSystem.js');


dds.tableCreate("test10000")//建立名為test10000資料夾
dds.tableCreate("test1")//建立名為test1資料夾
setTimeout(test10000Set, 100, 0);//延遲100ms後激活test10000Set(0)
setTimeout(test1Set, 100);//延遲100ms後激活test1Set()

function test10000Set(i) {//生成 10000筆資料再test10000
    var str = ""
    for (var j = 0; j < (Math.floor(Math.abs(Math.sin(i / 10)) * 1000) % 5) + 5; j++) {
        str += String.fromCharCode( Math.floor(Math.abs(Math.cos(j / 10)) * i * 1000 % 26) + 65);
    }
    dds.add("test10000", str, {data:str});
    if(i < 10000)
        setTimeout(test10000Set, 1, i+1);
    else
        TestStart()
}
function test1Set() {//生成 1筆資料再test1
    dds.add("test1", "test", {data:"testdawdafwafwafafsfesfesefsfsfsfesf中文˙"});
}

function TestStart() {//開始測試

    console.time("nullTest");  //測試for迴圈空跑10000次
    nullTest()
    function nullTest() {
        for(let i = 0; i < 10000; i++) {

        }
    }
    console.timeEnd("nullTest");

    console.time("stringTest");  //測試雜湊函數所需要的時間
    stringTest()
    function stringTest() {
        for(let i = 0; i < 10000; i++) {
            var str = ""
            for (var j = 0; j < (Math.floor(Math.abs(Math.sin(i / 10)) * 1000) % 5) + 5; j++) {
                str += String.fromCharCode( Math.floor(Math.abs(Math.cos(j / 10)) * i * 1000 % 26) + 65);
            }
        }
    }
    console.timeEnd("stringTest");


    console.time("test10000");   //測試在10000份資料讀取10000份資料所需要的時間
    test10000()
    function test10000() {
        for(let i = 0; i < 10000; i++) {
            var str = ""
            for (var j = 0; j < (Math.floor(Math.abs(Math.sin(i / 10)) * 1000) % 5) + 5; j++) {
                str += String.fromCharCode( Math.floor(Math.abs(Math.cos(j / 10)) * i * 1000 % 26) + 65);
            }
            dds.getSync('test10000',str);
        }
    }
    console.timeEnd("test10000");

    console.time("test1");  //測試讀取10000份資料所需要的時間
    test1()
    function test1() {
        for(let i = 0; i < 10000; i++) {
            dds.getSync('test1',"test");
        }
    }
    console.timeEnd("test1");
}
