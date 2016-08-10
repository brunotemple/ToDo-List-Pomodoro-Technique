var min = 25;
var sec = 0;
var msec = 0;
var restFlag = false;

    
function chronometer() {
    msec += 1;

    if (msec > 9) {
        msec = 0;
        if (sec == 0) {
            sec = 59;
            min -= 1;
        } else {
            sec -= 1;
        }
    }

    if (min < 10) {
        var min_str = '0' + min.toString();
    } else {
        var min_str = min.toString();
    }
    if (sec < 10) {
        var sec_str = '0' + sec.toString();
    } else {
        var sec_str = sec.toString();
    }

    if (restFlag == false) {
        document.getElementById('chronotime').innerHTML = 'Pomodoro`s timing: ' + min_str + ':' + sec_str
    } else {
        document.getElementById('chronotime').innerHTML = 'Rest`s timing: ' + min_str + ':' + sec_str
    }

    var timer = setTimeout("chronometer()", 100);

    if (min == 0 && sec == 0 && restFlag == false) {
        pomoCount();
        restFlag = true;        
        
        var elementList = new Array();
        elementList = document.getElementsByClassName('toggle');
        var todos = get_tasks();

        for (var i = 0; i < elementList.length; i++) {
            if (elementList[i].checked == true) {
                var count = todos[i].split(',')[1];
                divFlag = count % 4;
                if(divFlag == 0 ){
                    min = 15;
                } else {
                    min = 5;
                }
            }
        }

        sec = 0;
        msec = 0;
        showTask();
        playSound();

    }
    if (min == 0 && sec == 0 && restFlag == true) {
        playSound();
        document.getElementById('chronotime').innerHTML = ''
        clearTimeout(timer);
        min = 25;
        sec = 0;
        msec = 0;
        restFlag = false;
        
    }
}