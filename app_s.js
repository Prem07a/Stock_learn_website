let ws = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade');
let statu = document.getElementById('st');
let p_l =document.getElementById('l');


ws.onmessage = (event) => {
  let stockObject =JSON.parse(event.data);
  
  var g = localStorage.getItem("price");
  var tar = localStorage.getItem("target");
  var sl = localStorage.getItem("stoploss");
  var amt = localStorage.getItem("Amount");
  var z = Math.round(stockObject.p * 100)/ 100;
  if (tar == 0 ){
    tar = 0;
  }
  if (sl == 0){
    sl = 99999;
  }


  if(z == g && statu.innerText!=="__CLOSED"){
    statu.innerText = "_EXECUTED";
  }else if(z!==g && statu.innerText !== "_EXECUTED" && statu.innerText!=="__CLOSED"){
    statu.innerText = "_PENDING_";
  }
  if (statu.innerText !=="__CLOSED" || statu.innerText!=="_PENDING_"){
    var t =Math.round(((g-z)/g)*amt*10*100)/100
    localStorage.setItem("pro",t)
  }
  if (statu.innerText =="__CLOSED"){
    var d = localStorage.getItem("pro")
    localStorage.setItem("profit",d)

  }
  if (sl <= z && statu.innerText=="_EXECUTED"){
    statu.innerText = "__CLOSED";
   
  }else if (tar >= z && statu.innerText=="_EXECUTED"){
    statu.innerText = "__CLOSED";
  }
  if (t > 0 && statu.innerText!=="__CLOSED" && statu.innerText!=="_PENDING_"){
    p_l.innerText ='+'+ t 
    document.getElementById('l').style.color = "green";
  }else if (statu.innerText!=="__CLOSED" && t < 0 && statu.innerText!=="_PENDING_"){
    p_l.innerText=t
    document.getElementById('l').style.color="red";
  }
}