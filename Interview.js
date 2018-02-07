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
            obj[headers[j]] = currentline[j];
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

    var cache = {}
    var sum = 0
    var previous_product = null;
    for (var i = 0; i < sortedArray.length; i++){
        var row = sortedArray[i]
        var current_product = sortedArray[i]['Product']
        var product = row['Product']
        if (!cache[product]){
            cache[product] = []
            if (current_product = previous_product){
                sum += +sortedArray[i]['Incremental Value']
            } else {
                sum = +sortedArray[i]['Incremental Value']
            }
        } else {
            cache[product] = cache[product];
        }
        current_product = previous_product
        console.log(cache);
        console.log(sum);
    }
    console.log(sortedArray);
}
/*
if (!cache[product] && product){
    cache[product] = [product];
} else {
    cache[product] = cache[product];
}*/