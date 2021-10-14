// 스테이지 클리어 여부 판정에 사용할 변수
let circleNum = 0;
let arrIdx = 0;
let z = 0;

function check() {
	if (circleNum < 0 || circleNum > 4) {
		reset();
		return;
	}
	switch (circles[circleNum][arrIdx]) {
	case 1: // ┗┓ 왼쪽
		switch (z) {
		case 0:
			circleNum++;
			arrIdx++;
			if (arrIdx > 7) {
				arrIdx = 0;
			}
			break;
		case 1:
			return 0;
		}
		break;
	case 2: // ┗┓ 오른쪽
		switch (z) {
		case 0:
			return 0;
		case 1:
			circleNum--;
			arrIdx--;
			if (arrIdx < 0) {
				arrIdx = 7;
			}
			break;
		}
		break;
	case 3: // ┏┛ 왼쪽
		switch (z) {
		case 0:
			return 0;
		case 1:
			circleNum--;
			arrIdx++;
			if (arrIdx > 7) {
				arrIdx = 0;
			}
			break;
		}
		break;
	case 4: // ┏┛ 오른쪽
		switch (z) {
		case 0:
			circleNum++;
			arrIdx--;
			if (arrIdx < 0) {
				arrIdx = 7;
			}
			break;
		case 1:
			return 0;
		}
		break;
	case 5: // ┗┛ 왼쪽
		switch (z) {
		case 0:
			circleNum--;
			arrIdx++;
			if (arrIdx > 7) {
				arrIdx = 0;
			}
			z = 1;
			break;
		case 1:
			return 0;
		}
		break;
	case 6: // ┗┛ 오른쪽
		switch (z) {
		case 0:
			circleNum--;
			arrIdx--;
			if (arrIdx < 0) {
				arrIdx = 7;
			}
			z = 1;
			break;
		case 1:
			return 0;
		}
		break;
	case 7: // ┏┓ 왼쪽
		switch (z) {
		case 0:
			return 0;
		case 1:
			circleNum++;
			arrIdx++;
			if (arrIdx > 7) {
				arrIdx = 0;
			}
			z = 0;
			break;
		}
		break;
	case 8: // ┏┓ 오른쪽
		switch (z) {
		case 0:
			return 0;
		case 1:
			circleNum++;
			arrIdx--;
			if (arrIdx < 0) {
				arrIdx = 7;
			}
			z = 0;
			break;
		}
		break;
	case 9: // ┃
		switch (z) {
		case 0:
			circleNum++;
			break;
		case 1:
			circleNum--;
			break;
		}
		break;
	case -1: // 목표 지점
		return 1;
	default:
		return 0;
	}
	
	return check();
}

function reset() {
	circleNum = 0;
	arrIdx = 0;
	z = 0;
}

// 스테이지 클리어 설정에 사용할 변수
let stageCleared = false;
let effectDeg = 0;

function clear() {
	if (!stageCleared) {
		clearInterval(timerFunc);
		
		$("#circle div").append("<img>");
		$("img:last").attr("id", "clearEffect");
		$("#clearEffect").attr("class", "circle");
		$("#clearEffect").attr("src", contextPath + "/resources/img/game/common/clear_circle.png");
		setInterval(function() {
			effectDeg++;
			$("#clearEffect").css({
				"-webkit-transform" : "rotate(" + effectDeg + "deg)",
				"-moz-transform" : "rotate(" + effectDeg + "deg)",
				"-ms-transform" : "rotate(" + effectDeg + "deg)",
				"-o-transform" : "rotate(" + effectDeg + "deg)",
				"transform" : "rotate(" + effectDeg + "deg)"
			});
		}, 100);
		
		$("#clear").append("<form id='clearForm' action='stage" + stageNum + "_clear' method='POST'></form>");
		$("#clearForm").append("<input type='hidden' name='clearTime' value='" + TS + "'>");
		if (lang == "kr") {
			$("#clearForm").append("<input type='submit' value='다음으로'>");
			/*alert("스테이지 클리어!\n클리어 시간 : " + TS);*/
		}
		if (lang == "jp") {
			$("#clearForm").append("<input type='submit' value='次へ'>");
			/*alert("ステージクリア!\nクリア時間 : " + TS);*/
		}
		if (lang == "en") {
			$("#clearForm").append("<input type='submit' value='Next'>");
			/*alert("Stage Clear!\nClear Time : " + TS);*/
		}
		
		new Audio(contextPath + "/resources/audio/clear.wav").play();
		
		stageCleared = true;
	}
}