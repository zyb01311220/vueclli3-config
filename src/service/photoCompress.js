/*
*  Created by LPF on 2018/7/6.
*  @param  fileObj   : input元素节点的file对象
*  @param  obj       : 可设置压缩后的图片宽以及质量, 默认{width:950, quality: 0.8}
*  @param  callBack  : 回调函数有一个参数,类型为对象,包含文件原名,图片base64数据,图片二进制fromDate对象
* */
function photoCompress(fileObj, obj, callBack) {

    if( fileObj.size/1024 < 800 ){
        obj.less800 = true ;
        obj.FormLess800 = new FormData() ;
        obj.FormLess800.append("file", fileObj )
    }

    obj.width = obj.width ? obj.width : 950 ;  //单位px
    // obj.size = obj.size ? obj.size : 500 ;     //单位kb
    obj.quality = obj.quality && obj.quality > 0 && obj.quality <= 1 ? obj.quality : 0.8; //单位kb

    var ready=new FileReader();
    ready.readAsDataURL(fileObj);
    ready.onload=function(){
        var ready_result=this.result;
        canvasDataURL(ready_result, obj, encodeURIComponent( fileObj.name ), callBack)
    }
}

function canvasDataURL(path, obj, fileName, callback){

    fileName = new Date().getTime()

    obj.width = obj.width ? obj.width : 600 ;  //单位px
    obj.quality = obj.quality && obj.quality > 0 && obj.quality <= 1 ? obj.quality : 0.9; //单位kb

    var img = new Image();
    var imgType = path.split(';base64,')[0].split('/')[1] ;
    img.src = path;
    img.onload = function(){
        var that = this;

        // 默认按比例压缩
        var pic_w = that.width ,
            pic_h = that.height,
            scale = pic_w / pic_h;

        if( pic_h / pic_w > 3 ){

            pic_w = ( obj.width * scale ) ;
            pic_h =  pic_h > 950 ? obj.width: pic_h ;
        }else{
            pic_w = pic_w > 980 ? obj.width : pic_w ;
            pic_h = (pic_w / scale) || ( obj.width / scale ) ;
        }

        //生成canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = pic_w ;
        canvas.height = pic_h ;

        ctx.drawImage(that, 0, 0, canvas.width, canvas.height);

        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL('image/'+imgType, obj.quality);

        var backObject = {} ;

        if( obj.less800 ){
            //console.log( 'route1, less800')
            backObject = {
                base64: base64,
                fileName: fileName,
                formDate: obj.FormLess800
            }
        }else{
            var formDate = new FormData();
            var blobDate = convertBase64UrlToBlob( base64 );
            formDate.append("file", blobDate, fileName); // 文件对象
            backObject ={
                base64: base64,
                fileName: fileName,
                formDate: formDate
            }
        }
        // 回调函数返回base64的值
        callback && callback(backObject);

    }
}


/**
 * 将以base64的图片url数据转换为Blob
 * @param urlData
 *        用url方式表示的base64图片数据
 */
function convertBase64UrlToBlob(urlData){
    var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

export {
    photoCompress,
    canvasDataURL
}