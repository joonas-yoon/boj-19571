function randint(range) {
    return Math.floor(Math.random() * range);
}

document.addEventListener("DOMContentLoaded", function(){
    // Handler when the DOM is fully loaded
    var grid = document.getElementById('grid');
    var body = grid.querySelector('tbody');
    var randoms = [];
    var rows = 100, cols = 100, length = rows * cols;
    var valY = [];
    var valX = [];
    var nexts = [];
    for(var i=1; i<=rows*cols; ++i){
        randoms.push(i);
        nexts.push(i);
    }
    for(var i=0; i<rows; ++i) valY.push([]);
    for(var i=0; i<cols; ++i) valX.push([]);
    for(var i=0; i<length; ++i) {
        var _i = randint(length);
        var _j = randint(length);
        var t = randoms[_j];
        randoms[_j] = randoms[_i];
        randoms[_i] = t;
    }
    var posByVal = [];
    var score = 0;
    var gridText = '';
    for(var r=0; r<rows; ++r){
        var tr = document.createElement('tr');
        for(var c=0; c<cols; ++c){
            var td = document.createElement('td');
            var val = randoms[r * cols + c];
            td.id = 'd' + val;
            td.className = 'cell d' + val + ' y'+ r + ' x' + c;
            // td.innerText = val;
            posByVal[val] = {y: r, x: c};
            valY[r].push(val);
            valX[c].push(val);
            tr.appendChild(td);
            gridText += val +' ';
        }
        gridText += '\n';
        body.appendChild(tr);
    }
    console.log(gridText);
    var val = 1, score = 0;
    document.getElementById('score-text').innerText = 'score: ' + score;
    (function loop() {
        document.getElementById('d'+val).classList.add('active');
        var start = posByVal[val];
        valY[start.y].splice(valY[start.y].indexOf(val), 1);
        valX[start.x].splice(valX[start.x].indexOf(val), 1);
        nexts.splice(nexts.indexOf(val), 1);
        // console.log('start:', start);
        var ny = valY[start.y];
        var nx = valX[start.x];
        var vals = ny.concat(nx);
        vals = [...new Set(vals)].sort((a, b) => a-b);
        var next = undefined;
        if (vals.length > 0) {
            if (vals.indexOf(val) > 0) vals.splice(vals.indexOf(val), 1);
            next = vals[0];
        }
        else {
            next = nexts[0];
            score += 1;
            document.getElementById('score-text').innerText = 'score: ' + score;
        }
        // console.log('next:', next, posByVal[next]);
        val = next;
        if (val !== undefined) {
            setTimeout(loop, 1);
        } else {
            document.getElementById('score-text').innerHTML = '<b>score: ' + score + '</b>';
        }
    })();
});
