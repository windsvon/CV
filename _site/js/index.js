$(document).ready(function() {
	var fooBar = true;
	var fooArc = true;
	$('#fullpage').fullpage({
		//Navigation
		menu: '#menu',
		anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage', 'sisthPage'],
		navigation: true,
		navigationPosition: 'right',
		navigationTooltips: ['', '个人经历', '专业技能', '其他技能', '作品展示', '联系方式'],
		showActiveTooltip: true,
		//Scrolling
		// css3: true,
		// easingcss3: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
		//Design
		sectionsColor: ['#f2f2f2', 'whitesmoke', '#F0F4FA', 'whitesmoke', '#F0F4FA'],

		//Callback
		afterLoad: function(anchorLink, index) {
			if(index === 1) {
				$('.portrait').animate({
					right:0
				}, 800, 'swing');

				$('#introduction').animate({
					left:0
				}, 800, 'swing');
					
			}

			if(index === 2) {
				$('.page2-container div').each(function(index) {
					if (index === 6) {
						$(this).delay(4000).animate({
							left: 0
						}, 1000, 'easeOutElastic')
					} 
					else if (index % 2 == 0) {
						$(this).delay(index * 600).animate({
							opacity: 1
						}, 400, 'swing');
					} 
					else {
						$(this).delay(index * 600).animate({
							opacity: 1
						}, 400, 'swing', function() {
							$(this).children('img').addClass('rotate-animation');
						})
					}
				})		
			}


			if(index === 5) {
				$(".scroll").each(function(index) {
					$(this).delay(index * 200).animate({
						height : 200
					}, 500, "easeInElastic");
				})
			}	
		},

		onLeave: function(index, nextIndex, direction) {

			if(nextIndex === 3) {
				$('#skills').animate({
					right: 0,
				}, 1000, 'swing')

				$('#about-skills').animate({
					left: 0,
				}, 1000, 'swing')

				createBar("canvas3-1", "HTML", 0.9, "#2D425D");
				createBar("canvas3-2", "CSS", 0.8, "#B93853");
				createBar("canvas3-3", "JavaScript", 0.75, "#2D425D");
				createBar("canvas3-4", "JQuery", 0.7, "#B93853");
				createBar("canvas3-5", "Ajax", 0.6, "#2D425D");
				fooBar = false;
			}

			if(nextIndex === 4) {

				$('#other-skills').animate({
					right: 0,
				}, 1000, 'swing')

				$('#exams').animate({
					left: 0,
				}, 1000, 'swing')

			    createArc("canvas4-1", "CET-6", 551, 710);
			    createArc("canvas4-2", "GRE", 1330, 1600);
			    createArc("canvas4-3", "TOEFL", 103, 120);
			    createArc("canvas4-4", "GPA", 87, 100);
			    fooArc = false;
			}
		}




	});

 	//动态条形统计图
	 function createBar(canvasID, name, percent, color) {
	 	if(fooBar == false) return;
	 	
	    	var canvas = document.getElementById(canvasID);
			var barColor = 'black';
			var barWidth = canvas.width / 2.2;
			var barHeight = 0;
			var fullHeight = canvas.height * 0.8
			var lineWidth = canvas.width / 50;
		    var context = canvas.getContext("2d");
			var x = canvas.width / 2;
			var y = canvas.height * 0.9;
			var currentHeight = y;
			var end = percent * fullHeight;


		    // Draw Static Content
		    context.beginPath();
		    context.moveTo(0.15 * canvas.width, y);
		    context.lineTo(0.85 * canvas.width, y);
		 	context.font = x / 4 + "px" + " Arial";
		 	context.textAlign = "center";
		 	context.fillStyle = "black"
			context.fillText(name, x, y * 1.05);
		  	context.strokeStyle = "black";
		    context.lineWidth = lineWidth - 3;
		    context.lineCap = "round";
		    context.stroke();

			var interval = setInterval(drawBar, 10);


			function drawBar() { 

			    currentHeight = currentHeight - 2;
			    barHeight = y - currentHeight;
			    
			    context.beginPath();
			    context.fillStyle = color;
			    context.fillRect(x - barWidth / 2, currentHeight, barWidth, barHeight);
			    context.stroke();


			    if (barHeight > end) {
			    	clearInterval(interval);
			    }

			}
	}

	//动态圆形统计图
	function createArc(canvasID, name, mark, full) {
	    if(fooArc == false) return;

	    	var canvas = document.getElementById(canvasID);
			var currentEndAngle = 0;
			var currentStartAngle = 0;
			var currentColor = '#2D425D';
			var lineRadius = canvas.width / 2.2;
			var lineWidth = canvas.width / 50;
		    var context = canvas.getContext("2d");
			var x = canvas.width / 2;
			var y = canvas.height / 2;
			var end = mark / full *2;

		    // Draw Static Circle
		   	context.arc(x, y, lineRadius - lineRadius * 0.1, 0, 2 * Math.PI);
		    context.strokeStyle = "#B93853";
		    context.lineWidth = lineWidth - 2;
		    context.stroke();


		    // Draw Static Content
		    context.beginPath();
		    context.moveTo(0.15 * canvas.width, y);
		    context.lineTo(0.85 * canvas.width, y);
		 	context.font = x / 5 + "px" + " Arial";
		 	context.textAlign = "center";
			context.fillText(name, x, y * 0.9);
		    context.strokeStyle = "#5CB6E3";
		    context.lineWidth = lineWidth - 2;
		    context.lineCap = "round";
		    context.stroke();

			var interval = setInterval(drawArc, 0.1);


			function drawArc() { 

			    var startAngle = currentStartAngle * Math.PI;
			    var endAngle = (currentEndAngle) * Math.PI;
			    
			    currentStartAngle = currentEndAngle - 0.003;
			    currentEndAngle = currentEndAngle + 0.003;
			    
			            
			    var counterClockwise = false;

			    context.beginPath();
			    context.arc(x, y, lineRadius, startAngle, endAngle, counterClockwise);
			    context.lineWidth = lineWidth;
			    context.lineCap = "round";
			    // line color
			    context.strokeStyle = currentColor;
			    // draw text
			    context.clearRect(x * 0.5, y * 1.05 , x, y * 0.5);
			    context.font = x / 5 + "px" + " Arial";
			    var currentMark = Math.round(currentEndAngle / 2 * full);
			    context.fillText(currentMark, x, y * 1.25);

			    context.stroke();


			    if (currentMark >= mark) {
			    	clearInterval(interval);
			    }

			} //end of DrawArc
		}
	
})




// #     #        
//  #   #  #    # 
//   # #   #    # 
//    #    #    # 
//    #    #    # 
//    #    #    # 
//    #     ####  