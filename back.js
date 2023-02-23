let ws = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade');

ws.onmessage = (event) => {
  let stockObject =JSON.parse(event.data);
  
  localStorage.setItem("Market",stockObject.p)
}