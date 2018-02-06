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

        reader.readAsText(file);
        reader.onload = function(event) {
            var text = event.target.result
            fileDisplayArea.innerHTML = text
            csvArray = csvToArray(text)
            console.log(parseArray(csvArray))
        };
        
    })
}

function csvToArray(csv) {
    var lines = csv.split("\n");
    var result = [];
    //split first line into headers
    var headers = lines[0].split(",");
    //for the proceeding lines i.e i=1
    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    return result;
}


function parseArray(array){
    var result = []
    for(var i = 0; i < array.length; i++){
        if (result.indexOf(array[i]['Product']) == -1){
            result.push(array[i]['Product'])
        }
    console.log(result)
    }
}
/*
var array = convertedData.originYears + convertedData.developmentYears
var lowestYear = array.min()
var highestYear = array.max()
var newData = []
for (product in products){
    //This ensures that there are no erroneous development year entries
    if (developmentYear < originYear){
        throw error('year cannot be earlier than origin')
    }

    //recursion?
    for (var i = lowestYear; i < highestYear; i++ ){
        if (i = developmentYear){
            


        }
        else if (i < developmentYear){
           
        }
        

    }
}
*/
