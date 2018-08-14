/*!
* Http 封装包
*  此脚本依赖Jquery ，需先引入 jquery
* 
* 插件基本用法：
*           $.doPost({}) 用法和 jquery的 ajax 一致
*            $.doGet({})
* Date: 2018-08-14 
* Create by SJ
*/


var httpGlobal = (function (window) {

    /**
     * 请求
     * @param {*} options 
     * @param {*} bloading 
     */
    var doRequest = function (options, bloading) {
        this.defaults = {
            async: true,
            dataType: "json",
            type: "POST",
            url: ""
        };
        this.defaults = $.extend({}, this.defaults, options);
        this.defaults = $.extend({}, this.defaults, {
            beforeSend: function (XHR) {
                XHR.setRequestHeader("token", "sj");
                if (arguments.length > 1) {
                    if (bloading) {
                        XHR.layer = layer.load(1); //加载等待框
                    }
                }
                return XHR;
            }, complete: function (XHR) {
                if (arguments.length > 1) {
                    if (bloading) {
                        //加载等待框
                        layer.close(XHR.layer);
                    }
                }
            }
        });
        var urlInfo = this.defaults.url.split('?');
        var str = "";
        for (var i = 0; i < urlInfo.length; i++) {
            if (i == 0) {
                str = urlInfo[i] + "?random=" + Math.random() + "&";//强制ajax执行
            }
            else {
                str += urlInfo[i];
            }
        }
        this.defaults.url = str.trimEnd('&');
        return $.ajax(this.defaults);
    };

    /**
     * POST 请求
     * @param {*} options 
     * @param {*} bloading 
     */
    var doPost = function (options, bloading) {
        this.defaults = {
            type: "POST"
        };
        this.defaults = $.extend({}, this.defaults, options);
        return doRequest(this.defaults, bloading);
    };

    /**
   * GET 请求
   * @param {*} options 
   * @param {*} bloading 
   */
    var doGet = function (options, bloading) {
        this.defaults = {
            type: "GET"
        };
       this.defaults = $.extend({}, this.defaults, options);
        return doRequest(this.defaults, bloading);
    };

    return {
        doRequest: doRequest,//原生Ajax
        doPost: doPost,//post
        doGet: doGet//get
    };

})(window);
$.extend(httpGlobal);


