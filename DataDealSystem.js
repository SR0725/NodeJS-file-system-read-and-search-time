const fs = require('fs');
const system = {
    mainPath: 'data',
    content: {},
}
var urlTransport = function(table){
    return `${system.mainPath}/${table}/`;
}

var InitSystem = function(){
    try {
        if (!fs.existsSync('data')) {
            fs.mkdirSync('data')
        }
    } catch (err) {
        console.error(err)
    }
}

/////////////////////////////////////////////////////
//資料表單建立
    //同步
    var tableCreate = function(tableName){
        let table = `${system.mainPath}/${tableName}`
        try {
            if (!fs.existsSync(table)) {
                fs.mkdirSync(table);
                contentCreat(table);
            }else{
                console.warn("資料表建立警告!\n["+tableName+"]資料表已經存在")
            }
        } catch (err) {
            console.error(err)
        }


        function contentCreat(table){
            fs.writeFile(table + '/content.txt',  '["content"]', function (err) {
                if (err)
                    console.log(err);
            });
        }
    }


/////////////////////////////////////////////////////
//目錄取得
    //非同步
    var contentGet = async function (type) {
        var url = urlTransport(type);
        var buffer = getSync(type, "content");
        return buffer;
    }

    //同步
    var contentGetSync = function (type) {
    var url = urlTransport(type);
    var buffer = getSync(type, "content");
    return buffer;
}


/////////////////////////////////////////////////////
//目錄判定
    //非同步
    var contentTest = async function (type, id) {
        var url = urlTransport(type);
        var buffer = getSync(type, "content");
        for(let i = 0; i < buffer.length; i ++ ){
            if(buffer[i] == id){
                return true;
            }
        }
        return false;
    }

    //同步
    var contentTestSync = function (type, id) {
        var url = urlTransport(type);
        var buffer = getSync(type, "content");
        for(let i = 0; i < buffer.length; i ++ ){
            if(buffer[i] == id){
                return true;
            }
        }
        return false;
    }


/////////////////////////////////////////////////////
//目錄減少
    //同步
    var contentRemove = function (type, id) {
        var url = urlTransport(type);
        var buffer = getSync(type, "content");
        var toRemove = 1;
        buffer = buffer.filter(function(id) {
            return item !== toRemove
        });
        fs.writeFile(url + 'content.txt', JSON.stringify(buffer), function (err) {
            if (err)
                console.log(err);
        });
    }


/////////////////////////////////////////////////////
//目錄增加
    //同步
    var contentAdd = function (type, id) {
        try {

            var url = urlTransport(type);
            var buffer = null;
            if( !(type in system.content) ){
                system.content[type] = getSync(type, "content");
            }

            system.content[type].push(id);
            var buffer = system.content;

            fs.writeFile(url + 'content.txt', JSON.stringify(system.content[type]), function (err) {
                if (err)
                    console.log(err);
            });
        } catch (e) {

        }

    }


/////////////////////////////////////////////////////
//新增某值與某檔案中
    //同步
    var add = function (type, id, obj) {
        var url = urlTransport(type);
        contentAdd(type, id);
        fs.writeFile(url + id + '.txt', JSON.stringify(obj), function (err) {
            if (err)
                console.log(err);
            else
                console.log(`寫入資料庫 => ${id} 寫入資料`);
        });
    }


/////////////////////////////////////////////////////
//插入或修改某值在某檔案中
    //同步
    var insert = function (type, id, sort, msg) {
    var url = urlTransport(type);
    var buffer = get(type, id);
    buffer.sort = msg;
    fs.writeFile(url + id + '.txt', JSON.stringify(buffer), function (err) {
        if (err)
            console.log(err);
    });
}


/////////////////////////////////////////////////////
//判定數值是否與某檔案的某值相同
    //非同步
    var testfor = async function (type, id, sort, testvalue) {
    var url = urlTransport(type);
    try {
        var data = fs.readFileSync(url + id + '.txt', 'utf8');
        return (JSON.parse(data.toString()).sort == testvalue) ? true : false;
    } catch(err) {
        console.log("檔案讀取出錯:"+err);
    }
}

    //同步
    var testforSync = function (type, id, sort, testvalue) {
    var url = urlTransport(type);
    try {
        var data = fs.readFileSync(url + id + '.txt', 'utf8');
        return (JSON.parse(data.toString()).sort == testvalue) ? true : false;
    } catch(err) {
        console.log("檔案讀取出錯:"+err);
    }
}


/////////////////////////////////////////////////////
//回傳某檔案的某值
    //非同步
    var getfor = async function (type, id, sort) {
    var url = urlTransport(type);
    try {
        var data = fs.readFileSync(url + id + '.txt', 'utf8');
        return JSON.parse(data.toString()).sort;
    } catch(err) {
        console.log("檔案讀取出錯:"+err);
    }
}

    //同步
    var getforSync = function (type, id, sort) {
    var url = urlTransport(type);
    try {
        var data = fs.readFileSync(url + id + '.txt', 'utf8');
        return JSON.parse(data.toString())[sort];
    } catch(err) {
        console.log("檔案讀取出錯:"+err);
    }
}


/////////////////////////////////////////////////////
//回傳某檔案的完整值
    //非同步
    var get = async function (type, id) {
        var url = urlTransport(type);
        try {
            var data = fs.readFileSync(url + id + '.txt', 'utf8');
            return JSON.parse(data.toString());
        } catch(err) {
            console.log("檔案讀取出錯:"+err);
        }
    }

    //同步
    var getSync = function (type, id) {
        var url = urlTransport(type);
        try {
            var data = fs.readFileSync(url + id + '.txt', 'utf8');
            return JSON.parse(data.toString());
        } catch(err) {
            console.log("檔案讀取出錯:"+err);
        }
    }


/////////////////////////////////////////////////////
//回傳某檔案的完整值
    //非同步
    var getfromIndex = async function (type, dataIndex) {
        var url = urlTransport(type);
        var buffer = getSync(type, "content");
        if(buffer.length < dataIndex){
            return "NULL";
        }else{
            let index = buffer.length - dataIndex - 1;
            return getSync(type, buffer[index]);
        }
    }

    //同步
    var getfromIndexSync = function (type, dataIndex) {
        var url = urlTransport(type);
        var buffer = getSync(type, "content");
        if(buffer.length < dataIndex - 1){
            return "NULL";
        }else{
            let index = buffer.length - dataIndex - 1;
            return getSync(type, buffer[index]);
        }
    }


InitSystem();
module.exports = {
    tableCreate,
    contentGet,
    contentGetSync,
    get,
    getfor,
    insert,
    add,
    testfor,
    contentTest,
    getSync,
    getforSync,
    testforSync,
    contentTestSync,
    getfromIndexSync,
    getfromIndex
};
