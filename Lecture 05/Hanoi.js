    const TOWER_LENGTH = 8; //탑의 높이
    const COLORS = ["black", "purple", "blue", "green", "yellow", "violet","orange", "red"]; //탑에 사용할 컬러 패턴

    let data = []; //탑의 데이터 셋
    let moveCount = 0; //이동 횟수
    let firstClickZoneIdx = undefined; //첫번째 클릭 확인

    //최초 초기화, 호이스팅으로 여기서 실행 가능함
    clearTower();

    //하노이 탑 초기화
    function clearTower() {
        data = [
            Array(TOWER_LENGTH).fill(0).map((_, i) => ({ value: i + 1, color: COLORS[i % COLORS.length] })),
            [],
            []
        ];
    
        moveCount = 0;
        updateZoneCounter();
        updateZoneBorder(firstClickZoneIdx, false);
        updateTower();
        firstClickZoneIdx = undefined;
    }

     //클릭에 따른 동작 정의
     function handleZoneClick(idx) {
        if (firstClickZoneIdx === undefined) { //첫번째 요소가 선택 안되어있다면
            firstClickZoneIdx = idx;
            updateZoneBorder(idx, true);
        } else if (firstClickZoneIdx === idx) { //첫번째와 동일한 위치가 눌렸다면
            alert("동일한 영역을 선택할 수 없습니다.");
        } else {
            const target = data[firstClickZoneIdx].shift(); //맨 아래 하나를 빼냄

            if (!target) { //첫번째로 선택한 영역에 아무것도 없다면, 이동할 항목이 없다면
                alert("이동할 항목이 없습니다.");
            } else if (data[idx].length === 0) { //이동할 영역이 빈영역이라면 그냥 이동
                data[idx] = [target];
                moveCount++;
            } else if (data[idx][0].value < target.value) { //이동할 영역에 타워가 더 작다면 이동 불가
                data[firstClickZoneIdx] = [target, ...data[firstClickZoneIdx]]; //원위치
                alert("여기에는 놓을 수 없습니다.");
            } else {  //조건에 맞다면 해당위치로 이동
                data[idx] = [target, ...data[idx]];
                moveCount++;
            }

            //업데이트
            updateZoneCounter();
            updateZoneBorder(firstClickZoneIdx, false);
            updateTower();

            //클릭영역 초기화
            firstClickZoneIdx = undefined;
        }
    }

    //첫번째 선택 영역을 업데이트 하는 함수
    function updateZoneBorder(idx, focus) {
        const el = document.getElementById(`zone-${idx}`);
        if (el) {
            focus ?
                el.classList.add("focus") :
                el.classList.remove("focus");
        }
    }

     //카운터를 업데이트하는 함수
     function updateZoneCounter() {
        const el = document.getElementById(`counter`);
        if (el) {
            el.innerText = moveCount;
        }
    }

       //data 정보를 이용해 타워를 그려주는 함수
       function updateTower() {
        data.forEach((towerData, idx) => {
            const el = document.getElementById(`zone-${idx}`);
            if (el) {
                el.innerHTML = towerData.map(item => {
                    const html = []; //가독성을 좋게하기 이하여 Array 사용
                    html.push("<div>");
                    html.push(Array(item.value).fill(0).map(_ => `<span style="background-color: ${item.color}"></span>`).join(""));
                    html.push("</div>");
                    return html.join("");
                }).reverse().join(""); //추후 shift의 편의성을 위해 데이터와 뒤집어서 그려줌
            }
        });
    }
