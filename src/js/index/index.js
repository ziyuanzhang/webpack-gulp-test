
function a() {
    console.log("这是index JS");


  /*   $.ajax({
        url: "http://127.0.0.1:8080/jsonp",
        type: "GET",
        dataType: "jsonp", //指定服务器返回的数据类型
        success: function (data) {
            //var result = JSON.stringify(data); //json对象转成字符串
            console.log("index:", data);
        }
    }); */
    var prid = "5094412400";
    var token = "9026326a52a38bd3c6df58ae83e67fcd75c984b8fa11016f5543db6283c113042c167ed254c2c1e041fade1c895a3fbb98aa0b3d4b1eef1aa6a5de6cc40c6b9e92a32f9ec4ecf882e4d9d3854d423b08";
    $.ajax({
        url: "/v1/shoppers/me/carts/active?productId=" + prid,
        data: {
            token: token,
            format: "json",
            method: "post",
            quantity: "0",
            expand: "lineItems.lineItem.product.sku",
            testOrder: "true"
        },
        dataType: "jsonp",
        error: function (data) {
            console.log("DR:失败", data);
        },
        success: function (data) {
            console.log("DR:正常", data);
        }
    });

}
a();