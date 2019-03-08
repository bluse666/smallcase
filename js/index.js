window.addEventListener('DOMContentLoaded',function(){
    var mask = document.getElementById('mask');
    var maskUp = document.querySelector('#mask .maskUp');
    var maskDown = document.querySelector('#mask .maskDown');
    var maskLine = document.querySelector('#mask .maskLine');
    var header = document.getElementById('header');
    var content = document.getElementById('content');
    var contentItems = document.querySelectorAll('#content .contentItem');
    var contentList = document.querySelector('#content .contentList');
    var arrow = document.querySelector('#header .headerMain .arrow');
    var navUps = document.querySelectorAll('#header .headerMain .nav .navList .navItem .up');
    var navItems = document.querySelectorAll('#header .headerMain .nav .navList .navItem');
    var homeIcons = document.querySelectorAll('#content .contentList .home .homeNav .homeIcon');
    var homeItems = document.querySelectorAll('#content .contentList .home .homeList .homeItem');
    var team3Items = document.querySelectorAll('#content .contentList .team .team3 .team3List .team3Item');
    var team3 = document.querySelector('#content .contentList .team .team3');
    var menuItems = document.querySelectorAll('#content .menuList .menuItem');
    var myAudio = document.querySelector('#header .headerMain .music>audio');
    var myMusic = document.querySelector('#header .headerMain .music');
    var index = 0;
    var oldIndex = 0;
    var timer = null;
    var timeC = null;
    var timeP = null;
    var autoTimer = null;
    var myCanvas = null;
    var isAnimation = false;


    //响应缩放逻辑
    window.onresize = function () {
        contentBind();
        contentMove(index);
    };
    //头部交互
    headerBind();
    function headerBind() {
        //第一个元素高亮
        navUps[0].style.width = '100%';
        //小三角的位置
        arrow.style.left = navItems[0].getBoundingClientRect().left + navItems[0].offsetWidth / 2 + 'px';
        for (var i = 0; i < navItems.length; i++) {
            var item = navItems[i];
            item.index = i;
            //给每一个导航添加点击事件
            item.onclick = function () {
                animationArr[index].outAnimation();
                animationArr[this.index].inAnimation();
                index = this.index;
                contentMove(this.index);
            }
        }
    }

    //内容区逻辑
    contentBind();
    function contentBind() {
        //设置承接内容盒子的高度
        content.style.height = document.documentElement.clientHeight - header.offsetHeight + 'px';
        //给每一屏设置高度
        for (var i = 0; i < contentItems.length; i++) {
            contentItems[i].style.height = document.documentElement.clientHeight - header.offsetHeight + 'px';
        }
    }

    //屏幕区域逻辑
    function contentMove(index) {
        for (var j = 0; j < navUps.length; j++) {
            //清除所有高亮
            navUps[j].style.width = '';
        }
        //点谁谁高亮
        navUps[index].style.width = '100%';

        for (var i=0;i<menuItems.length;i++){
            menuItems[i].className = 'menuItem';
        }
        menuItems[index].className = 'menuItem active';
        //移动三角到当前位置
        arrow.style.left = navItems[index].getBoundingClientRect().left + navItems[index].offsetWidth / 2 + 'px';
        //移动内容区
        contentList.style.top = -(index)*(document.documentElement.clientHeight - header.offsetHeight) +'px';
    }

    //鼠标滚轮逻辑ie/chrome
    mouseScroll();
    function mouseScroll() {
        document.onmousewheel = function (event) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                scrollMove(event);
            }, 200)
        };
        //firefox
        if (document.addEventListener) {
            document.addEventListener('DOMMouseScroll', function () {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    scrollMove(event);
                }, 200)
            });
        }
        function scrollMove(event) {
            event = event || window.event;
            var flag = '';
            if (event.wheelDelta) {
                //ie/chrome
                if (event.wheelDelta > 0) {
                    flag = 'up';
                } else {
                    flag = 'down';
                }
            } else if (event.detail) {
                //firefox
                if (event.detail < 0) {
                    flag = 'up';
                } else {
                    flag = 'down';
                }
            }
            //最终判断滚轮方向
            switch (flag) {
                case 'up':
                    //滚轮向上滚动
                    if (index > 0) {
                        animationArr[index].outAnimation();
                        index--;
                        animationArr[index].inAnimation();
                        contentMove(index);
                    }
                    break;
                case 'down':
                    //滚轮向下滚
                    if (index < navItems.length - 1) {
                        animationArr[index].outAnimation();
                        index++;
                        animationArr[index].inAnimation();
                        contentMove(index);
                    }
                    break;
            }
            //取消默认行为
            event.preventDefault && event.preventDefault();
            return false;
        }
    }

    //点击切换轮播图
    home3D();
    function home3D() {
        for (var i = 0; i < homeIcons.length; i++) {
            var item = homeIcons[i];
            item.index = i;
            item.onclick = function () {
                if (isAnimation) {
                    return;
                }
                isAnimation = true;
                setTimeout(function () {
                    isAnimation = false;
                }, 2000);
                clearInterval(autoTimer);
                for (var j = 0; j < homeIcons.length; j++) {
                    homeIcons[j].className = 'homeIcon'
                }
                this.className = 'homeIcon active';
                if (oldIndex < this.index) {
                    homeItems[oldIndex].className = 'homeItem leftHide';
                    homeItems[this.index].className = 'homeItem rightShow';
                } else if (oldIndex > this.index) {
                    homeItems[oldIndex].className = 'homeItem rightHide';
                    homeItems[this.index].className = 'homeItem leftShow';
                }
                oldIndex = this.index;
                autoPlay();
            }
        }
    }

    //自动轮播
    autoPlay();
    function autoPlay() {
        autoTimer = setInterval(function () {
            if (isAnimation) {
                return;
            }
            ifAnimation = true;
            setTimeout(function () {
                isAnimation = false;
            }, 2000);
            for (var i = 0; i < homeIcons.length; i++) {
                homeIcons[i].className = 'homeIcon';
            }
            homeIcons[oldIndex + 1 > 3 ? 0 : oldIndex + 1].className = 'homeIcon active';

            homeItems[oldIndex].className = 'homeItem leftHide';
            homeItems[oldIndex + 1 > 3 ? 0 : oldIndex + 1].className = 'homeItem rightShow';

            if (oldIndex < homeItems.length - 1) {
                oldIndex++;
            } else {
                oldIndex = 0;
            }
        }, 3000)
    }

    //第五屏鼠标悬浮逻辑
    team3.onmouseleave = function (){
        for (var j=0;j<team3Items.length;j++){
            team3Items[j].style.opacity = '0.5';
        }

        myCanvas.remove();
        myCanvas = null;
        clearTimeout(timeP);
        clearTimeout(timeC);
    };
    for (var i=0;i<team3Items.length;i++){
        var item = team3Items[i];
        item.onmouseenter = function(){
            for(var j=0;j<team3Items.length;j++) {
                team3Items[j].style.opacity = '0.5';
            }
            this.style.opacity = '1';
            if (!myCanvas){
                myCanvas = document.createElement('canvas');
                myCanvas.width = this.offsetWidth;
                myCanvas.height = this.offsetHeight;
                team3.appendChild(myCanvas);
                addAnimation();
            }
            console.log(myCanvas)
            myCanvas.style.left = this.offsetLeft + 'px';
        }
    }

    //第五屏气泡飞舞
    function addAnimation() {
        var painting = myCanvas.getContext('2d');
        var arr = [];

        timeP = setInterval(function () {
            painting.clearRect(0, 0, myCanvas.width, myCanvas.height);
            for (var j = 0; j < arr.length; j++) {
                var item = arr[j];
                item.deg++;
                item.x = item.startX + Math.sin(item.deg * Math.PI / 180) * item.pathScale * 8;
                item.y = item.startY - (item.deg * Math.PI / 180) * item.pathScale * 8;

                if (item.y + item.r < 0) {
                    arr.splice(j, 1);
                }
            }

            for (var i = 0; i < arr.length; i++) {
                var item = arr[i];
                painting.beginPath();
                painting.arc(item.x, item.y, item.r, 0, 2 * Math.PI);
                painting.fillStyle = 'rgba(' + item.red + ',' + item.green + ',' + item.blue + ',' + item.a + ')';
                painting.fill();
            }
        }, 9);

        timeC = setInterval(function () {
            var obj = {};
            obj.r = Math.floor(Math.random() * 6 + 4);
            obj.x = Math.floor(Math.random() * myCanvas.width);
            obj.y = myCanvas.height + obj.r;
            obj.red = Math.floor(Math.random() * 255);
            obj.green = Math.floor(Math.random() * 255);
            obj.blue = Math.floor(Math.random() * 255);
            obj.a = 1;
            arr.push(obj);

            obj.startX = obj.x;
            obj.startY = obj.y;
            obj.deg = 0;
            obj.pathScale = Math.floor(Math.random() * 5 + 5);
        }, 9);
    }

    //给侧边导航栏添加点击事件
    menuList();
    function menuList() {
        for (var i=0;i<menuItems.length;i++){
            var item = menuItems[i];
            item.index = i;
            item.onclick = function(){
                contentMove(this.index);
                animationArr[index].outAnimation();
                animationArr[this.index].inAnimation();
                index = this.index;
            };
        }
    }

    //music
    myMusic.onclick =function(){
        if(myAudio.paused){
            myAudio.play();
            myMusic.style.backgroundImage = 'url("./img/musicon.gif")';
        }else{
            myAudio.pause();
            myMusic.style.backgroundImage = 'url("./img/musicoff.gif")';
        }
    };

    //出入场动画的容器
    var animationArr = [
        {
            inAnimation:function(){
                var homeList = document.querySelector('#content .contentList .home .homeList');
                var homeNav = document.querySelector('#content .contentList .home .homeNav');
                homeList.style.transform = 'translate(0,0)';
                homeList.style.opacity = '1';
                homeNav.style.transform = 'translate(0,0)';
                homeNav.style.opacity = '1';
            },
            outAnimation:function(){
                var homeList = document.querySelector('#content .contentList .home .homeList');
                var homeNav = document.querySelector('#content .contentList .home .homeNav');
                homeList.style.transform = 'translate(0,-200px)';
                homeList.style.opacity = '0.5';
                homeNav.style.transform = 'translate(0,200px)';
                homeNav.style.opacity = '0.5';
            }
        },
        {
            inAnimation:function () {
                var plane1 = document.querySelector('#content .contentList .course .plane1');
                var plane2 = document.querySelector('#content .contentList .course .plane2');
                var plane3 = document.querySelector('#content .contentList .course .plane3');
                plane1.style.transform = 'translate(0,0)';
                plane2.style.transform = 'translate(0,0)';
                plane3.style.transform = 'translate(0,0)';
            },
            outAnimation:function () {
                var plane1 = document.querySelector('#content .contentList .course .plane1');
                var plane2 = document.querySelector('#content .contentList .course .plane2');
                var plane3 = document.querySelector('#content .contentList .course .plane3');

                plane1.style.transform = 'translate(-200px,-200px)';
                plane2.style.transform = 'translate(-200px,200px)';
                plane3.style.transform = 'translate(200px,-200px)';
            }
        },
        {
            inAnimation:function () {
                var pencil1 = document.querySelector('#content .contentList .works .pencil1');
                var pencil2 = document.querySelector('#content .contentList .works .pencil2');
                var pencil3 = document.querySelector('#content .contentList .works .pencil3');
                pencil1.style.transform = 'translate(0,0)';
                pencil2.style.transform = 'translate(0,0)';
                pencil3.style.transform = 'translate(0,0)';
            },
            outAnimation:function () {
                var pencil1 = document.querySelector('#content .contentList .works .pencil1');
                var pencil2 = document.querySelector('#content .contentList .works .pencil2');
                var pencil3 = document.querySelector('#content .contentList .works .pencil3');

                pencil1.style.transform = 'translate(0,-40px)';
                pencil2.style.transform = 'translate(0,200px)';
                pencil3.style.transform = 'translate(200px,200px)';
            }
        },
        {
            inAnimation:function () {
                var box1 = document.querySelector('#content .contentList .about .about3 .about3Item:nth-child(1)');
                var box2 = document.querySelector('#content .contentList .about .about3 .about3Item:nth-child(2)');
                box1.style.transform = 'rotate(0)';
                box2.style.transform = 'rotate(0)';
            },
            outAnimation:function () {
                var box1 = document.querySelector('#content .contentList .about .about3 .about3Item:nth-child(1)');
                var box2 = document.querySelector('#content .contentList .about .about3 .about3Item:nth-child(2)');

                box1.style.transform = 'rotate(-30deg)';
                box2.style.transform = 'rotate(30deg)';
            }
        },
        {
            inAnimation:function () {
                var team1 = document.querySelector('#content .contentList .team .team1');
                var team2 = document.querySelector('#content .contentList .team .team2');
                team1.style.transform = 'translate(0,0)';
                team2.style.transform = 'translate(0,0)';

            },
            outAnimation:function () {
                var team1 = document.querySelector('#content .contentList .team .team1');
                var team2 = document.querySelector('#content .contentList .team .team2');
                team1.style.transform = 'translate(-200px,0)';
                team2.style.transform = 'translate(200px,0)';
            }
        }
    ];

    for (var s=0;s<animationArr.length;s++){
        animationArr[s].outAnimation();
    }
    setTimeout(function(){
        animationArr[0].inAnimation();
    },2000);

    setTimeout(function(){
        animationArr[0].inAnimation()
    },2000);

    //开机动画
    var arr = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','about1.jpg','about2.jpg','about3.jpg','about4.jpg','worksimg1.jpg','worksimg2.jpg','worksimg3.jpg','worksimg4.jpg','team.png','greenLine.png'];
    var loaded = 0;
    for (var j=0;j<arr.length;j++){
        var myImage = new Image();
        myImage.src = './img/'+arr[j];
        myImage.onload =function(){
            loaded++;
            maskLine.style.width = (loaded/arr.length)*100+'%'
        }
    }
    maskLine.addEventListener('transitionend',function(){
        maskDown.style.height = '0';
        maskUp.style.height = '0';
        maskLine.remove()
    });
    maskUp.addEventListener('transitionend',function(){
        mask.remove()
    })
});