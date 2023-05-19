var a0c1 = 0;
var general_data;

var Ajax2 = function () {
    $.getJSON("./database.json", function (data) {
        general_data = data;
    });
}();

function searchPonu(data=general_data, content){

    for (key in data){
        if (key == content){
            wording = document.getElementById('wording');
            wording.innerText = key;

            showlist = document.getElementById("showlist");
            content_heading = document.getElementById("content_heading");
            
            content_heading.innerText = "中文释义";
            showlist.innerHTML = "";
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

function searchCh(data=general_data, content){
    var is_present = 0;
    showlist.innerHTML = "";
    content_heading = document.getElementById("content_heading");
    content_heading.innerText = "多项匹配结果";

    for (key in data){
        var checkhere = 0;
        for (subitem in data[key]){
            if (subitem.match(content)){
                //如果检测不到包含就是null了，但如果检测得到就抛出checkhere = 1
                checkhere = 1;
                is_present = 1;
                break;
            } 
        }
        if (checkhere == 1){
            wording = document.getElementById('wording');
            wording.innerText = content + " 的搜索结果";
            
            showlist = document.getElementById("showlist");
            let transitem = document.createElement('li');

            let transstr = document.createElement('p');

            transstr.style = "font-weight: bold";
            transstr.innerText = key;

            transitem.appendChild(transstr);
            for (transkey in data[key]){
                let detailstr = document.createElement('p');
                detailstr.innerText = transkey;

                transitem.appendChild(detailstr);
            }
            showlist.appendChild(transitem);
            
            let redirect = document.createElement("input");
            redirect.setAttribute("type", "button");

            redirect.setAttribute("value", "跳转到" + key);

            redirect.setAttribute("onclick", "searchPonu(general_data, \""+ key +"\")");
            console.log("\""+ key +"\")");

            showlist.appendChild(redirect);

            let line = document.createElement("hr");

            showlist.appendChild(line);
        }
    }

    if (is_present == 0){

    alert("我们的词库还有所缺陷，请等待我们的后续更新！");

    }
    return 0;
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
    if (a0c1 == 0){
        searchPonu(general_data, content.value);
    }
    else{
        searchCh(general_data, content.value);
    }
}