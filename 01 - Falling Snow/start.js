(() => {
  // เริ่มเขียนโค้ด
  function setup() {
    const canvas = document.getElementById("falling-snow-canvas");
    canvas.width = window.innerWidth // กำหนดความกว้างของ canvas
    canvas.height = window.innerHeight // กำหนดความสูงของ canvas
    return {
      canvas, // กำหนด canvas ใน html
      canvasContext: canvas.getContext('2d'),
      numberOfSnowBalls: 300
    }
  }

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min // random 5 - 10 
    // random ค่า 0 - 0.99 floor = ปัดเศษลง
  }

  function createSnowBall(canvas, numberOfSnowBalls) {
    //สร้าง array ที่เก็บ obj ของ numberOfSnowBalls แล้ว map เพื่อทำการ random ค่า X และ Y ในตำแหน่งต่างของหน้าจอ
    return [...Array(numberOfSnowBalls)].map(() => {
      return {
        x: random(0, canvas.width), // กำหนดให้ random ค่า 0(ซ้ายสุด) - maximum(ขวาสุด) ของหน้าจอ
        y: random(0, canvas.height), // กำหนดให้ ramdom ค่า 0(ล่างสุด) - maximum(บนสุด) ของหน้าจอ
        opacity: random(0.4,1),
        radius: random(1,4),
        speedX: random(-5, 5),
        speedY: random(1, 3)
      }
    })

  }
  function DrawSnowBall(canvasContext, snowBall) {
    canvasContext.beginPath(); // บอก canvasContext ว่าจะเริ่มวาด
    canvasContext.arc(snowBall.x, snowBall.y, snowBall.radius, 0, Math.PI * 2);
    // arc วาดรูปวงกลม พิกัด x พิกัด y ความใหญ่ องศาเริ่มต้น องศาจบวงกลม 
    canvasContext.fillStyle = `rgba(255,255,255, ${snowBall.opacity})`;// กำหนดสีของ snowBall
    canvasContext.fill()// เติมสีขาวเข้าไปใน snowBall เอา fillStyle มาใส่ใน fill
  }

  function moveSnowBall(canvas, snowBall) {
    snowBall.x += snowBall.speedX;
    snowBall.y += snowBall.speedY;
    if(snowBall.x > canvas.width){
      snowBall.x = 0;
    } else if (snowBall.x < 0){
      snowBall.x = canvas.width;
    }

    if(snowBall.y > canvas.height){
      snowBall.y = 0
    }

  }
  function run() {
    const { canvas, canvasContext, numberOfSnowBalls } = setup()
    // ดึงค่าแต่ละค่าของค่าที่ return ออกมาจาก function run
    const snowBalls = createSnowBall(canvas, numberOfSnowBalls)
    console.log(snowBalls)
    setInterval(() => {
      canvasContext.clearRect(0, 0, canvas.width, canvas.height)
      // ลบ canvas อันเก่าออกก่อนที่จะวาดอันใหม่
      snowBalls.forEach(snowBalls => DrawSnowBall(canvasContext, snowBalls))
      snowBalls.forEach(snowBalls => moveSnowBall(canvas,snowBalls))
    }, 50)
  }
  run();
})();
