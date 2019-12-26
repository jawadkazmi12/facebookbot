var Crawler = (function(){
  var crawler = {};

  crawler.initCrawler = function()
  {

    
      alert("Initiating Crawler......");

      var data = {soundData: "Sound of Cat"};

      Cloud.sendSuccessHandler(Config.INIT_CRAWLER_URI,JSON.stringify(data),function(response){
        console.log(response);
      });

  }



  return crawler;
}());
