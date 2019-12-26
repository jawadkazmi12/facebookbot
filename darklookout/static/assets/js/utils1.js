var Utils = (function(){
  var utils = {};

  utils.showOverlay = function()
  {
    $(".overlay").css("display","block");
  }

  utils.hidOverlay = function()
  {
    $(".overlay").css("display","none");
  }
  return utils;
}());
