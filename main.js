var app=new Vue({
  el:"#player",
  data:{
    query:"",
    musiclist:[],
    musicUrl:"",
    musicCover:"",
    hotComments:[],
    IsPlaying:false
  },
  methods:{
    searchmusic:function () {
      var that=this;
      axios.get("https://autumnfish.cn/search?keywords="+this.query)
        .then(function (response) {
          // console.log(response);
          that.musiclist=response.data.result.songs;
        },function (err) {})
    },
    playMusic:function (musicId) {
      // console.log(musicId);
      var that=this;
      axios.get("https://autumnfish.cn/song/url?id="+musicId)
        .then(function (response) {
          // console.log(response);
          // console.log(response.data.data[0].url);
          that.musicUrl=response.data.data[0].url;
        },function (err) {})
      axios.get("https://autumnfish.cn/song/detail?ids="+musicId)
        .then(function (response) {
          console.log(response.data.songs[0].al.picUrl);
          that.musicCover=response.data.songs[0].al.picUrl;
        },function (err) {})
      axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicId)
        .then(function (response) {
          console.log(response.data.hotComments);
          that.hotComments=response.data.hotComments;
        },function (err) {})
    },
    play:function () {
      // console.log(this.play);
      this.IsPlaying=true;
    },
    pause:function () {
      // console.log(this.pause)
      this.IsPlaying=false
    }
  }
})
