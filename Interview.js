/* 
considerations -- 
-- duplicate entries per year
-- year is a typo i.e 19900
-- incremental value is negative
-- development year is earlier than origin year
*/




function triggerValidation(el) {
  var regex = new RegExp("(.*?)\.(csv)$");
  if (!(regex.test(el.value.toLowerCase()))) {
    el.value = '';
    alert('Please select a .csv file');
  }
}

window.onload = function() {
    var fileInput = document.getElementById('fileInput');
    var fileDisplayArea = document.getElementById('fileDisplayArea');
    var csvArray = []
    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var reader = new FileReader();
        reader.onload = function(event) {
            var text = event.target.result
            fileDisplayArea.innerHTML = text
            csvArray = csvToArray(text)
            console.log(parseArray(csvArray))
        };
        reader.readAsText(file);
    })
}

function csvToArray(csv) {
    var lines = csv.split(/\r\n|\n|\r/);
    var result = [];
    //split first line into headers
    var headers = lines[0].split(",");
    //for the proceeding lines i.e i=1
    for (var i = 1; i < lines.length - 1; i++) {
      var obj = {};
      var currentline = lines[i].split(",");
      for (var j in headers){
        if (currentline[j]) {
            if(currentline[j].match(/[a-z]/i)){
                obj[headers[j]] = currentline[j]
            } else {
                obj[headers[j]] = parseFloat(currentline[j]);
            } 
        }
      }
      result.push(obj);
    }
    return result;
}


function parseArray(array){
    var sortedArray = array.sort((a, b) => {
        return a['Origin Year'] - b['Origin Year']  ||  a['Development Year']- b['Development Year'];
        })
    var lowestYear = sortedArray[0]['Origin Year']
    var highestYear = sortedArray[sortedArray.length - 1]['Origin Year']
    const uniqueProduct = [...new Set(sortedArray.map(key => key['Product']))];
    var cache = uniqueProduct.reduce((obj, v) => {
        obj[v] = {}
        var ref = obj[v]
        for (var x = lowestYear; x <= highestYear; x++) {
            ref[x] = [];
          }
        return obj
    }, {})

    for (var i = 0; i < sortedArray.length; i++){
        var row = sortedArray[i]
        var yearIndex = row['Development Year'] - row['Origin Year']
        var product = row['Product']
        var origin = row['Origin Year']
        var increment = row['Incremental Value']
        for (var j = 0; j < uniqueProduct.length; j++){
            if (uniqueProduct[j] == product){
                cache[uniqueProduct[j]][origin][yearIndex] = increment
            } else {
                cache[uniqueProduct[j]][origin][yearIndex] = 0
            }
        }  
    }
    for (key in cache){
        for (year in cache[key]){
            for (var y = 0; y < cache[key][year].length; y++){
                var index = cache[key][year]
                if (typeof index[y] == 'undefined'){ 
                    index[y] = index[y-1]
                } else if ( index[y] < index[y-1]) {
                    index[y] += index[y-1]
                }
            }
        }
    }  
    console.log(cache);
    console.log(sortedArray);
}
/*()
var num = 1
while (num < yearIndex + 1 ){
            
    if (!cache[product][origin][num]){
        cache[product][origin][num] = cache[product][origin][num - 1]
        cache[product][origin][num]
    }
    num++
    
    
} */