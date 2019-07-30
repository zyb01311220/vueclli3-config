<template>
  <div class="tabbar">
      <div class="wrapper" ref="wrapper">
          <div class="bscroll-container">
              <div class="top-tip">
                  <span class="refresh-hook">{{pulldownMsg}}</span>
              </div>
              <ul class="content">
                  <li v-for="(item,index) in data" :key="index">{{item}}</li>
              </ul>
              <div class="bottom-tip">
                  <span class="loading-hook">{{pullupMsg}}</span>
              </div>
          </div>
      </div>
      <div class="alert-hook" :style="{display:alertHook}">刷新成功</div>
  </div>
</template>

<script>
    import  BScroll from 'better-scroll';
    export default {
        name: "List",
        data(){
            return{
               data:[0,1,2,3,4,5,6],
                pulldownMsg:'下拉刷新',
                pullupMsg:'加载更多',
                alertHook:''
            }
        },
        methods:{
           getData(){
              return new  Promise(resolve=>{
                     const arr=[];
                     for(let i=0;i<20;i++){
                         arr.push(i);
                     }
                     resolve(arr);
              })
           },
            refreshalert(){
                this.alertHook='block';
              setTimeout(()=>{
                  this.alertHook='none';
              },1000)
            }
        },
        mounted(){
         // this.scroll=new BScroll(this.$refs.wrapper);
            const that=this;
            this.$nextTick(()=>{
                this.scroll=new BScroll(this.$refs.wrapper,{
                   probeType:1,
                   click:true
                })
                this.scroll.on('scroll',(pos)=>{
                    console.log(pos.y);
                    if(pos.y>30){
                        this.pulldownMsg='释放立即刷新';
                    }
               })
               this.scroll.on('touchEnd',(pos)=>{
                   if(pos.y>30){
                      setTimeout(()=>{
                         this.getData().then(res=>{
                           this.data=res;
                           this.pulldownMsg='下拉刷新';
                           this.refreshalert();
                           this.scroll.refresh();
                         })
                      },1000)
                   }else if(pos.y<this.scroll.maxScrollY-30){
                       this.pullupMsg='加载中。。。';
                        setTimeout(()=>{
                            this.getData().then(res=>{
                            this.data=this.data.concat(res);
                            this.pullupMsg='加载更多';
                            this.refreshalert();
                            this.scroll.refresh();
                       })
                    },1000)
                   }
               })
            })
        }
    }
</script>

<style scoped>
    *{
       margin:0;
       padding:0;
    }
  .wrapper{
      width:100%;
      height:300px;
      background:#ccc;
      overflow:hidden;
      position:relative;
  }
  li{
    line-height:50px;
    border:1px solid #ccc;
    text-align:center;
    list-style:none;
  }
  .top-tip{
    position:absolute;
    top:-40px;
    left:0;
    z-index:1;
    width:100%;
    height:40px;
    line-height:40px;
    text-align:center;
    color:#555;
  }
  .bottom-tip{
      position:absolute;
      bottom:-35px;
      left:0;
      width:100%;
      height:35px;
      line-height:35px;
      text-align:center;
      color:#777;
      background:#f2f2f2;
  }
  .alert-hook{
      display:none;
      position:fixed;
      top:0;
      left:0;
      z-index:2;
      width:100%;
      height:35px;
      line-height:35px;
      text-align:center;
      color:#fff;
      font-size:12px;
      background:rgba(7,17,27,.5);
  }
</style>