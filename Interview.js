/* csv 
Product, Origin Year, Development Year, Incremental Value
Comp, 1992, 1992, 110.0
Comp, 1992, 1993, 170.0
Comp, 1993, 1993, 200.0
Non-Comp, 1990, 1990, 45.2
Non-Comp, 1990, 1991, 64.8
Non-Comp, 1990, 1993, 37.0
*/

considerations -- 
-- duplicate entries per year
-- year is a typo i.e 19900
-- incremental value is negative
-- development year is earlier than origin year
const csv = '/csv.file'
// convert csv to json first?

var convertedData = csv.json()

//hash table!!!!!!

var lowestYear = convertedData.array.floor()
var highestYear = convertedData.array.max()
for (product in products){
    
    for (var i = lowestYear; i< highestYear; i++ ){
        if (i = developmentYear){
            //list all 3 incremental values
            
        }
    }
}
