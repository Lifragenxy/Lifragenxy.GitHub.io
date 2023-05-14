var a0c1 = 0;

function searchPonu(data, content){
    for (key in data){
        console.log(key);
        if (key == content){
            wording = document.getElementById('wording');
            wording.innerText = key;

            showlist = document.getElementById("showlist");
            
            showlist.removeChild();
            for (transkey in data[key]){
                let transitem = document.createElement('li');
                let transstr = document.createElement('p');

                transstr.style = "font-weight: bold";
                transstr.innerText = transkey;

                let detailstr = document.createElement('p');
                detailstr.innerText = data[key][transkey];

                transitem.appendChild(transstr);
                transitem.appendChild(detailstr);
                showlist.appendChild(transitem);
            }
            return 0;
        }
    }
    alert("未找到你搜寻的单词");
    return 0;
}

function searchCh(data, content){
    for (key in data){
        var checkhere = 0;
        for (subitem in data[key]){
            var detectindex = 0;
            for (charing in subitem){
                if (detectindex >= (content.length - 1)){
                    checkhere = 1;
                    break;
                }
                if (detectindex > 0 && charing != content[detectindex]){
                    detectindex = 0;
                }else if (detectindex > 0 && charing == content[detectindex]){
                    detectindex++;
                }
                if (detectindex == 0 && charing == content[0]){
                    detectindex = 1;
                }
            }
            if (checkhere == 1){
                break;
            }
        }
        if (checkhere == 1){
            wording = document.getElementById('wording');
            wording.innerText = key;

            showlist = document.getElementById("showlist");
            
            showlist.removeChild();
            for (transkey in data[key]){
                let transitem = document.createElement('li');
                let transstr = document.createElement('p');

                transstr.style = "font-weight: bold";
                transstr.innerText = transkey;

                let detailstr = document.createElement('p');
                detailstr.innerText = data[key][transkey];

                transitem.appendChild(transstr);
                transitem.appendChild(detailstr);
                showlist.appendChild(transitem);
            }
        }
    }
    alert("未找到你搜寻的单词");
    return 0;
}

function changeL(data, content){
    if (a0c1 == 0){
        searchPonu(data, content);
    }
    /*else{
        searchCh(data, content);
    }*/
}

function getData(content){
    var Ajax = function () {
        $.getJSON("./database.json", function (data) {
            changeL(data, content);
        });
    }();
}

function search(){
    content = document.getElementById('seecontent');
    show_widget = document.getElementById('formunder');

    a0c1 = 0;

    for (var i=0; i<content.value.length; i++)
    {
        var str = content.value[i];
        /*遍历字符串的每一个字符*/
        var strCode = str.charCodeAt();
        if (str != " "){
            if (strCode < 65){
                a0c1 = 1;
            }
            else if (strCode > 90 && strCode < 97){
                a0c1 = 1;
            }
            else if (strCode > 122){
                a0c1 = 1;
            }
        }
    }

    /*遍历结束，这个时候已经可以区分出调用哪个函数了*/
    getData(content);
}