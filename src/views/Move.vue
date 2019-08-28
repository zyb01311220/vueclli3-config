<template>
    <div class="container">
        <ul class="slider" id="slider">
            <li v-for="(item,index) in imgSrc" :key="index" @touchstart="touchstart" @touchend="touchend($event,index)">
                <img :src="item" alt="" >
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: "Move",
        data(){
            return{
                imgSrc:[require("../assets/img/b.jpg"),require("../assets/img/a.jpg"),require("../assets/img/c.jpg")],
                touchFlag:true,
                startX:0
            }
        },
        methods:{
            touchstart(e){
                this.touchFlag=true;
                this. startX = e.changedTouches[0].clientX;
            },
            touchend(e,index){
                let endX=e.changedTouches[0].clientX;
                let moveX=this.startX-endX;
                let slider=document.getElementById('slider');
                if(this.touchFlag){
                    if(moveX>0){
                        if(index==this.imgSrc.length-1)return;
                        slider.style.transform = 'translateX(-' + (index+1)*9.453 + 'rem)';
                    }else{
                        if(index==0)return;
                        slider.style.transform = 'translateX(-' + (index-1)*9.453 + 'rem)';
                    }
                }
                this.touchFlag=false;
            }
        }

    }
</script>

<style scoped lang="scss">
   .container{
     overflow:hidden;
   }
   .slider {
       width:2000%;
       overflow:hidden;
       transition:.5s;
       margin:0;
       padding:0;
       li{
           width: 9.453rem;
           float:left;
           padding: 0 0.16rem;
           margin:0;
           box-sizing:border-box;
           img{
               width: 9.133rem;
               height: 4.8rem;
               border-radius: 0.1rem;
           }
       }
   }
</style>