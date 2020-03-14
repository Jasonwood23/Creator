// 闭包 直接进行
(function () {
    //抽取的函数
    function $(id){
        return typeof id === 'string'? document.getElementById(id) : id;
    }
    //当窗口加载完毕时调用
    window.onload = function () {
        //1.1 实现瀑布流布局
        //  WaterFall({
        //      'parent' : 'main',
        //      'child'  : 'box'
        //  });
        WaterFall('main','box');

        //1.2 监听滚动
        window.onscroll = function () {
           //1.2.1 判断是否具有滚动加载的条件
            if (CheckWillLoad()){// bool
                // 1.3 本地数据
                var data = {'imgData':[{'src':'10.jpg'},{'src':'12.jpg'},{'src':'30.jpg'},{'src':'31.jpg'},{'src':'32.jpg'},{'src':'33.jpg'},{'src':'34.jpg'}]};
                // 循环加载重复数据
                for(var i=0; i<data.imgData.length; i++){
                    // 取出单个数据对象
                    var item = data.imgData[i];

                    // 创建新的盒子放到父盒子中
                    var newBox = document.createElement('div');
                    newBox.className = 'box';
                    $('main').appendChild(newBox);

                    var newPic = document.createElement('div');
                    newPic.className = 'pic';
                    newBox.appendChild(newPic);

                    var newImg = document.createElement('img');
                    newImg.src = 'images/' + item.src;
                    newPic.appendChild(newImg);
                }
                //1.8 重新布局
                WaterFall('main','box');
            }
        }
    }

    //实现瀑布流布局
    function WaterFall(parent,child) {
        // 父标签居中
        //1.1拿到所有子盒子
        var allBox = document.getElementsByClassName(child);
        // alert('allBox');
        //1.2求出其中一个盒子的宽度 180
        var boxWidth = allBox[0].offsetWidth;
        // console.log(boxWidth);
        //1.3获取窗口的宽度
        var clientWidth = document.body.clientWidth;
        //1.4 求出列数 Math ceil()向上取整 floor()向下取整 round()四舍五入
        var cols = Math.floor(clientWidth/boxWidth);
        //1.5 让父标签居中
        $(parent).style.width = boxWidth * cols + 'px';
        $(parent).style.margin = '0 auto';

        // 子标签定位
        // 1.1高度数组
         var heightArr = [];
         //1.2遍历所有盒子数目
         for(var i=0; i<allBox.length; i++){
         //1.2.1 取出每一个盒子的高度
         var boxHeight = allBox[i].offsetHeight;
         //1.2.2判断
         if(i<cols){ //第一行盒子
             heightArr.push(boxHeight);
         }else{ // no

             //1.2.3从高度数组取出最矮盒子高度
             var minBoxHeight = Math.min.apply(null,heightArr);
             //1.2.4取出最矮盒子在数组中的索引
             var minBoxIndex = getMinBoxIndex(heightArr,minBoxHeight);
             //1.2.5 子盒子定位
             allBox[i].style.position = 'absolute';
             allBox[i].style.top = minBoxHeight + 'px';
             allBox[i].style.left = minBoxIndex * boxWidth + 'px';
             //1.2.6 更新高度数组中最矮高度
             heightArr[minBoxIndex] +=boxHeight;
         }
     }

         // console.log(heightArr,minBoxHeight);

    }
    
    //取出最小的索引
    function getMinBoxIndex(arr,val) {
        for(var i in arr){
            if(arr[i]===val) return i;
        }
        
    }
    
    //判断是否具有滚动加载的条件
    function CheckWillLoad() {
        // 1拿到最后一个盒子
        var allBox = document.getElementsByClassName('box');
        var lastBox = allBox[allBox.length -1];

        //2.求出最后一个盒子高度的一半 + 头部偏离的位置
        var lastBoxDis = lastBox.offsetHeight * 0.5 + lastBox.offsetTop;

        //3.求出页面的高度 ---> 兼容问题  混杂模式
        var clientHeight = document.body.clientHeight || document.documentElement.clientHeight;


        //4.求出页面偏离浏览器的高度
        var scrollTopHeight = document.body.scrollTop || document.documentElement.scrollTop;

        console.log(lastBoxDis,clientHeight,scrollTopHeight);

        //5.判断返回

        return lastBoxDis <= clientHeight + scrollTopHeight;
    }
})();