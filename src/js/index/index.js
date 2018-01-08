
function a() {
    console.log("这是index JS");


    $.ajax({
        url: "http://127.0.0.1:8080/jsonp",
        type: "GET",
        dataType: "jsonp", //指定服务器返回的数据类型
        success: function (data) {
            //var result = JSON.stringify(data); //json对象转成字符串
            console.log("index:",data);
        }
    });
}
a();