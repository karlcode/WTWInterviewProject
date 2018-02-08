/* 
considerations -- 
-- duplicate entries per year
-- year is a typo i.e 19900
-- incremental value is negative
-- development year is earlier than origin year
*/




function triggerValidation(el) {
  let regex = new RegExp("(.*?)\.(csv)$");
  if (!(regex.test(el.value.toLowerCase()))) {
    el.value = '';
    alert('Please select a .csv file');
  }
}

window.onload = function() {
  let fileInput = document.getElementById('fileInput');
  let fileDisplayArea = document.getElementById('fileDisplayArea');
  let csvArray = []
  fileInput.addEventListener('change', (e) => {
    let file = fileInput.files[0];
    let reader = new FileReader();
    reader.onload = function(event) {
      let text = event.target.result
      fileDisplayArea.innerHTML = text
      csvArray = csvToArray(text)
      let parsedArray = parseArray(csvArray)
      convertToCSV(parsedArray)
    };
    reader.readAsText(file);
  })
}

function csvToArray(csv) {
  let lines = csv.split(/\r\n|\n|\r/);
  let result = [];
  let headers = lines[0].split(",");
  for (let i = 1; i < lines.length - 1; i++) {
    let obj = {};
    let currentline = lines[i].split(",");
    for (header in headers){
      if (currentline[header]) {
        if(currentline[header].match(/[a-z]/i)){
          obj[headers[header]] = currentline[header]
        } else {
          obj[headers[header]] = parseFloat(currentline[header]);
        } 
      }
    }
    result.push(obj);
  }
  return result;
}


function parseArray(array){
  let sortedArray = array.sort((a, b) => {
    return a['Origin Year'] - b['Origin Year']  ||  a['Development Year']- b['Development Year'];
    })
  let lowestYear = sortedArray[0]['Origin Year']
  let highestYear = sortedArray[sortedArray.length - 1]['Origin Year']
  const uniqueProduct = [...new Set(sortedArray.map(key => key['Product']))];
  let cache = uniqueProduct.reduce((obj, v) => {
    obj[v] = {}
    let ref = obj[v]
    for (let x = lowestYear; x <= highestYear; x++) {
      ref[x] = [];
      }
    return obj
  }, {})

  for (let i = 0; i < sortedArray.length; i++){
    let row = sortedArray[i]
    let yearIndex = row['Development Year'] - row['Origin Year']
    let product = row['Product']
    let origin = row['Origin Year']
    let increment = row['Incremental Value']
    for (let j = 0; j < uniqueProduct.length; j++){
      if (uniqueProduct[j] == product){
        cache[uniqueProduct[j]][origin][yearIndex] = increment
      } else {
        cache[uniqueProduct[j]][origin][yearIndex] = 0
      }
    }  
  }
  for (key in cache){
    for (year in cache[key]){
      for (let y = 0; y < cache[key][year].length; y++){
        let index = cache[key][year]
        if (typeof index[y] == 'undefined'){ 
          index[y] = index[y-1]
        } else if ( y > 0) {
          index[y] += index[y-1]
        }
      }
    }
  }  
  return cache
}

function convertToCSV(objArray) {
  let firstYear
  let lastYear
  let parsedData = []
  for (product in objArray){
    let set = []
    Object.keys(objArray[product]).forEach((key, index, array) => {
      if (index === 0){
        firstYear = key
      } else if (index === array.length - 1){
        lastYear = key
      }
      set.push(objArray[product][key])
    });
    set.unshift(product)
    let merged = [].concat.apply([], set);
    parsedData.push(merged)
  }
  parsedData.unshift([firstYear, lastYear - firstYear + 1])
  parsedData = parsedData.join('\r\n')
  console.log(parsedData);

}