<template>
  <div class="hero">
<div class="p3">
    <img src="../assets/img/p3.png" height="250" width="250"/>
</div>
  <div class="window" @mouseover="stop" @mouseleave="play">
      <ul class="container" :style="containerStyle">
        <li>
          <img :style="{width:imgWidth+'px'}" :src="sliders[sliders.length - 1].img" alt="">
        </li>
        <li  v-for="(item, index) in sliders" :key="index">
          <img :style="{width:imgWidth+'px'}" :src="item.img" alt="">
        </li>
        <li>
          <img :style="{width:imgWidth+'px'}" :src="sliders[0].img" alt="">
        </li>
      </ul>
      <ul class="direction">
        <li class="left" @click="move(600, 1, speed)">
          <svg class="icon" width="30px" height="30.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M481.233 904c8.189 0 16.379-3.124 22.628-9.372 12.496-12.497 12.496-32.759 0-45.256L166.488 512l337.373-337.373c12.496-12.497 12.496-32.758 0-45.255-12.498-12.497-32.758-12.497-45.256 0l-360 360c-12.496 12.497-12.496 32.758 0 45.255l360 360c6.249 6.249 14.439 9.373 22.628 9.373z"  /></svg>
        </li>
        <li class="right" @click="move(600, -1, speed)">
          <svg class="icon" width="30px" height="30.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M557.179 904c-8.189 0-16.379-3.124-22.628-9.372-12.496-12.497-12.496-32.759 0-45.256L871.924 512 534.551 174.627c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0l360 360c12.496 12.497 12.496 32.758 0 45.255l-360 360c-6.249 6.249-14.439 9.373-22.628 9.373z"  /></svg>
        </li>
      </ul>
      <ul class="dots">
        <li v-for="(dot, i) in sliders" :key="i"
            :class="{dotted: i === (currentIndex-1)}"
            @click = jump(i+1)
        >
        </li>
      </ul>
    </div>
<div class="p4">
    <img src="../assets/img/p4.png" height="250" width="250"/>
</div>
</div>
</template>
<script>
    /* eslint-disable */
    export default {
        name: 'slider',
        props: {
            initialSpeed: {
                type: Number,
                default: 10
            },
            initialInterval: {
                type: Number,
                default: 3
            }
        },
        data () {
            return {
                sliders:[
                    {
                        img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3825228288,971314687&fm=26&gp=0.jpg'
                    },
                    {
                        img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586285852713&di=d5cc82bb8b2d28837b0cee05309e3221&imgtype=0&src=http%3A%2F%2Fapp.askform.cn%2FUploadFiles%2F217477%2F3759300002%2F211730%2Feditor%2Fimages%2F20141115031922_dEW4h.jpeg'
                    },
                    {
                        img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586285852707&di=3524130effd1d58216365cca7c8771d4&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201612%2F28%2F20161228113931_akvtL.jpeg'
                    },
                    {
                        img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586285852706&di=b3fe0ce48a34ca3ca192820589df1f04&imgtype=0&src=http%3A%2F%2Fs.7k7kimg.cn%2Fkba%2Fattachments%2Fforum%2F201502%2F05%2F184354ovnuh1vn1142xxou.jpg'
                    },
                    {
                        img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586285752775&di=1394dd667d56c1cf2adad6754d912c80&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F17%2F01%2F12%2F728628873fda17f1f5b31ad695b61d46.jpg'
                    },
                ],
                imgWidth:600,
                currentIndex:1,
                distance:-600,
                transitionEnd: true,
                speed: this.initialSpeed
            }
        },
        computed:{
            containerStyle() {
                return {
                    transform:`translate3d(${this.distance}px, 0, 0)`
                }
            },
            interval() {
                return this.initialInterval * 1000
            }
        },
        mounted() {
            this.init()
        },
        methods:{
            init() {
                this.play()
                window.onblur = function() { this.stop() }.bind(this)
                window.onfocus = function() { this.play() }.bind(this)
            },
            move(offset, direction, speed) {
                console.log(speed)
                if (!this.transitionEnd) return
                this.transitionEnd = false
                direction === -1 ? this.currentIndex += offset/600 : this.currentIndex -= offset/600
                if (this.currentIndex > 5) this.currentIndex = 1
                if (this.currentIndex < 1) this.currentIndex = 5
                const destination = this.distance + offset * direction
                this.animate(destination, direction, speed)
            },
            animate(des, direc, speed) {
                if (this.temp) {
                    window.clearInterval(this.temp);
                    this.temp = null ;
                }
                this.temp = window.setInterval(() => {
                    if ((direc === -1 && des < this.distance) || (direc === 1 && des > this.distance)) {
                        this.distance += speed * direc
                    } else {
                        this.transitionEnd = true
                        window.clearInterval(this.temp)
                        this.distance = des
                        if (des < -3000) this.distance = -600
                        if (des > -600) this.distance = -3000
                    }
                }, 20)
            },
            jump(index) {
                const direction = index - this.currentIndex >= 0 ? -1 : 1;
                const offset = Math.abs(index - this.currentIndex) * 600;
                const jumpSpeed = Math.abs(index - this.currentIndex) === 0 ? this.speed : Math.abs(index - this.currentIndex) * this.speed ;
                this.move(offset, direction, jumpSpeed)
            },
            play() {
                if (this.timer) {
                    window.clearInterval(this.timer)
                    this.timer = null
                }
                this.timer = window.setInterval(() => {
                    this.move(600, -1, this.speed)
                }, this.interval)
            },
            stop() {
                window.clearInterval(this.timer)
                this.timer = null
            }
        }
    }
</script>

<style>

  #app1 {
    width: 100%;
    margin: 0 auto;
  }
  .p3{
    padding:20px;
    width: 25%;

    float:left;
  }
  .p4{
    float:left;
    padding:20px;
    width: 25%;

  }
  .hero{
    margin:0px auto;
    width: 80%;
    height: 250px;
  }
  .vue-title {
    font-size: 70pt;
    margin-bottom: 10px;
  }

  {
    box-sizing: border-box;

  }
  ol,ul{
    list-style: none;
  }
  #slider{
    text-align: center;
  }
  .window{
    float: left;
    width: 50%;
    position:relative;
    height:280px;
    margin:0 auto;
    overflow:hidden;
    padding-top: 10px;
  }
  .container{
    display:flex;
    position:absolute;
  }
  .left, .right{
    position:absolute;
    top:50%;
    transform:translateY(-50%);
    width:50px;
    height:50px;
    background-color:rgba(0,0,0,.3);
    border-radius:50%;
    cursor:pointer;
  }
  .left{
    left:3%;
    padding-left:12px;
    padding-top:10px;
  }
  .right{
    right:3%;
    padding-right:12px;
    padding-top:10px;
  }
  img{
    user-select: none;
  }
  .dots{
    position:absolute;
    bottom:10px;
    left:50%;
    transform:translateX(-50%);
  }
  .dots li{
    display:inline-block;
    width:15px;
    height:15px;
    margin:0 3px;
    border:1px solid white;
    border-radius:50%;
    background-color:#333;
    cursor:pointer;
  }
  .dots .dotted{
    background-color:orange;
  }
</style>
