$(document).ready(function() {
    getCSV();
    getConferenceCSV();
    window.setInterval(getCSV, 60000);
    window.setInterval(getConferenceCSV, 60000);
});

function getCSV() {
    console.log("Works");
    $.ajax({
        type: "GET",
        url: "", //Your node-red URL
        crossDomain: true,
        dataType: "text",
        success: function(data) {processData(data);
            var d = new Date();
            $("#coffeeTime").text(d.toString())}
     });
}

function getConferenceCSV() {
    console.log("Works");
    $.ajax({
        type: "GET",
         url: "", //Your node-red URL
        crossDomain: true,
        dataType: "text",
        success: function(data) {processConferenceData(data);
            var d = new Date();
            $("#conferenceTime").text(d.toString())}
     });
}

function processConferenceData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var index = allTextLines.indexOf("Test");
    var noTest;
    if (index > -1) {
        noTest = allTextLines.splice(index, 1);
    }
   var numArr = _.without(allTextLines, "Test", "", "msg", "clicks");
   //console.log(numArr);
   var entersum = 0;
   var exitsum = 0;
   $('#conferenceEnterQueue').html("");
   $('#conferenceExitQueue').html("");
   for (var i = 0; i < numArr.length; ++ i) {
       //console.log("Hi");
       //console.log(numArr[i]);
       if (numArr[i] > 220) {
           console.log(numArr[i] - 255);
           exitsum += Math.abs(numArr[i] - 255);
           
           for (var j = 0; j < Math.abs(numArr[i] - 255); ++ j) {
               $('#conferenceExitQueue').append("<img src='person.png' width='14px;'/>");
           }
           $('#conferencePeopleExitNumber').text(exitsum);
       } else {
           entersum += parseInt(numArr[i]);
           for (var j = 0; j < numArr[i]; ++ j) {
               $('#conferenceEnterQueue').append("<img src='person.png' width='14px;'/>");
           }
            $('#conferencePeopleEnterNumber').text(entersum);
           
       }
   }
  
   


    // var headings = entries.splice(0,record_num);
    // while (entries.length>0) {
    //     var tarr = [];
    //     for (var j=0; j<record_num; j++) {
    //         tarr.push(headings[j]+":"+entries.shift());
    //     }
    //     lines.push(tarr);
    // }
}

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var index = allTextLines.indexOf("Test");
    var noTest;
    if (index > -1) {
        noTest = allTextLines.splice(index, 1);
    }
   var numArr = _.without(allTextLines, "Test", "", "msg", "clicks");
   //console.log(numArr);
   var sum = 0;
   $('#coffeeQueue').html("");
   for (var i = 0; i < numArr.length; ++ i) {
       //console.log("Hi");
       //console.log(numArr[i]);
       if (numArr[i] - 255 >= -9) {
           console.log(numArr[i] - 255);
         //  sum += numArr[i] - 255;
           console.log(sum);
       } else {
           sum += parseInt(numArr[i]);
           console.log(sum);
       }
   }
   $('#coffeePeopleNumber').text(sum);
   for (var j = 0; j < sum; ++ j) {
        $('#coffeeQueue').append("<img src='person.png' width='14px;'/>");
   }


    // var headings = entries.splice(0,record_num);
    // while (entries.length>0) {
    //     var tarr = [];
    //     for (var j=0; j<record_num; j++) {
    //         tarr.push(headings[j]+":"+entries.shift());
    //     }
    //     lines.push(tarr);
    // }
}