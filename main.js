var appkey = '2b6d8b1484f1fe54237b1ecb48fdeab7';
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
var $ = function (id) {
  return document.getElementById(id);
};
var metrics;
var cityarray = ['Athlone', 'Galway', 'Limerick', 'Dublin'];
$('city-name1').innerHTML = cityarray[0];
$('city-name2').innerHTML = cityarray[1];
$('city-name3').innerHTML = cityarray[2];
$('city-name4').innerHTML = cityarray[3];
var cityimagearr = ['city1.png', 'city5.png', 'city3.png', 'city4.png'];
console.log(document.getElementById('metricCheck'));
var city = "Athlone";
// var  city;
var long, lati;
var daysname;
var currentweather = function () {
  //  city = document.getElementById("loc").value;
  if (document.getElementById('metricCheck').checked == true) {
    metrics = 'metric';
  } else {
    metrics = 'imperial';
    console.log("imp");
  }

  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appkey + "&mode=xml&units=" + metrics;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = request.responseXML;
      console.log(data);
      var x = data.getElementsByTagName("city")[0];
      var country = x.getElementsByTagName("country")[0].textContent;
      var cityname = x.getAttribute("name");
      var currenttemp = data.getElementsByTagName("temperature")[0];
      var currenttempval = currenttemp.getAttribute("value");
      var citytemp = currenttempval;
      // var mainheadertext = $('mainheadertext');
      // console.log(mainheadertext);
      var symbolweather = data.getElementsByTagName("weather")[0].getAttribute("icon");
      var weatherName = data.getElementsByTagName("weather")[0].getAttribute("value");
      $('weatherTitle').innerHTML = weatherName;
      var iconvalue = getIcon(symbolweather);
      var tempIcon = $('Icon');
      tempIcon.src = iconvalue;
      // var mainheadercity = $('mainbodycity');
      var wind = data.getElementsByTagName("wind")[0].childNodes[0].getAttribute("value");
      if(metrics == 'metric')
      $('wind').innerHTML = "Wind Speed: " + wind + " m/s";
      else
      $('wind').innerHTML = "Wind Speed: " + wind + " km/hr";

      var humidity = data.getElementsByTagName("humidity")[0].getAttribute("value");
      $('humidity').innerHTML = "Humidity: " + humidity + "%";
      var mainheaderdate = $('mainheaderdate');
      var currentTemp = $('currentTemp');
      let mainfooterriseset = $('mainfooterriseset');
      var sun = x.getElementsByTagName("sun")[0];
      let rise = sun.getAttribute("rise");
      let set = sun.getAttribute("set");
      let dt = new Date(rise);
      let min = dt.getMinutes();
      let dt1 = new Date(set);
      let min1 = dt1.getMinutes();
      if (min >= 0 && min < 10) {
          min = "0" + min;
      }
      if (min1 >= 0 && min1 < 10) {
          min1 = "0" + min1;
      }
      mainheadercity.innerHTML = cityname + ", " + country;
      var today = new Date();
      daysname = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
      mainheaderdate.textContent = daysname[today.getDay()] + "," + today.getDate() + " " + months[today.getMonth()];
      mainfooterriseset.innerHTML = "Sunrise " + dt.getHours() + ":" + min + " | Sunset " + dt1.getHours() + ":" + min1;
      if(metrics == 'metric')
      currentTemp.innerHTML = citytemp + "<sup style='font-size : 20px; font-family : Muli;'>&#8451;</sup>";
      else
      currentTemp.innerHTML = citytemp + "<sup style='font-size : 20px; font-family : Muli;'>&#8457;</sup>";

    }
  };
  request.open("GET", url, true);
  request.send();

  forecastWeather();
}

var forecastWeather = function () {
  var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + appkey + "&mode=xml&units=" + metrics;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data1 = request.responseXML;
      console.log(data1);
      let weatherdata = data1.getElementsByTagName("forecast")[0];
      days = weatherdata.getElementsByTagName("time");
      var time = [];
      var days1 = [];
      var uniqueDays = [];
      for (let i = 0; i < days.length; i++) {
        time[i] = days[i].getAttribute("from");
        // console.log(time[i]);
        var datecurrent = new Date(time[i]);
        days1[i] = datecurrent.getDate();
      }

      uniqueDays = Array.from(new Set(days1));
      for (let x in uniqueDays) {
        console.log(uniqueDays[x]);
      }
      var day1temp = [];
      var day2temp = [];
      var day3temp = [];
      var day4temp = [];
      var day5temp = [];
      var day6temp = [];
      var symbol1, symbol2, symbol3, symbol4, symbol5, symbol6;
      var daysname = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      for (let j = 0; j < days.length; j++) {
        if (new Date(time[j]).getDate() == uniqueDays[0]) {
          var temp = days[j].getElementsByTagName("temperature")[0];
          day1temp[j] = temp.getAttribute("value");
          symbol1 = days[j].getElementsByTagName("symbol")[0].getAttribute("name");
          // console.log(symbol1);
          var symbolweather = days[j].getElementsByTagName("symbol")[0].getAttribute("var");
          var iconvalue1 = getIcon2(symbolweather);

          document.getElementById("day1name").innerHTML = daysname[new Date(time[j]).getDay()];
          //console.log(day1temp[j]);
        }
        if (new Date(time[j]).getDate() == uniqueDays[1]) {
          var temp = days[j].getElementsByTagName("temperature")[0];
          day2temp[j] = temp.getAttribute("value");
          symbol2 = days[j].getElementsByTagName("symbol")[0].getAttribute("name");
          var symbolweather = days[j].getElementsByTagName("symbol")[0].getAttribute("var");
          var iconvalue2 = getIcon2(symbolweather);
          document.getElementById("day2name").innerHTML = daysname[new Date(time[j]).getDay()];
        }
        if (new Date(time[j]).getDate() == uniqueDays[2]) {
          var temp = days[j].getElementsByTagName("temperature")[0];
          day3temp[j] = temp.getAttribute("value");
          symbol3 = days[j].getElementsByTagName("symbol")[0].getAttribute("name");
          var symbolweather = days[j].getElementsByTagName("symbol")[0].getAttribute("var");
          var iconvalue3 = getIcon2(symbolweather);
          document.getElementById("day3name").innerHTML = daysname[new Date(time[j]).getDay()];
        }
        if (new Date(time[j]).getDate() == uniqueDays[3]) {
          var temp = days[j].getElementsByTagName("temperature")[0];
          day4temp[j] = temp.getAttribute("value");
          symbol4 = days[j].getElementsByTagName("symbol")[0].getAttribute("name");
          var symbolweather = days[j].getElementsByTagName("symbol")[0].getAttribute("var");
          var iconvalue4 = getIcon2(symbolweather);
          document.getElementById("day4name").innerHTML = daysname[new Date(time[j]).getDay()];
        }
        if (new Date(time[j]).getDate() == uniqueDays[4]) {
          var temp = days[j].getElementsByTagName("temperature")[0];
          day5temp[j] = temp.getAttribute("value");
          symbol5 = days[j].getElementsByTagName("symbol")[0].getAttribute("name");
          var symbolweather = days[j].getElementsByTagName("symbol")[0].getAttribute("var");
          var iconvalue5 = getIcon2(symbolweather);
          document.getElementById("day5name").innerHTML = daysname[new Date(time[j]).getDay()];
        }
        if (new Date(time[j]).getDate() == uniqueDays[5]) {
          var temp = days[j].getElementsByTagName("temperature")[0];
          day6temp[j] = temp.getAttribute("value");
          symbol6 = days[j].getElementsByTagName("symbol")[0].getAttribute("name");
          var symbolweather = days[j].getElementsByTagName("symbol")[0].getAttribute("var");
          var iconvalue6 = getIcon2(symbolweather);
          document.getElementById("day6name").innerHTML = daysname[new Date(time[j]).getDay()];
        }
      }
      var maxday1, maxday2, maxday3, maxday4, maxday5, maxday6;
      var minday1, minday2, minday3, minday4, minday5, minday6;
      minday1 = day1temp.reduce(function (a, b) {
        return Math.min(a, b);
      });
      minday2 = day2temp.reduce(function (a, b) {
        return Math.min(a, b);
      });
      minday3 = day3temp.reduce(function (a, b) {
        return Math.min(a, b);
      });
      minday4 = day4temp.reduce(function (a, b) {
        return Math.min(a, b);
      });
      minday5 = day5temp.reduce(function (a, b) {
        return Math.min(a, b);
      });
      if (day6temp.length != 0) {
        minday6 = day6temp.reduce(function (a, b) {
          return Math.min(a, b);
        });
      }
      maxday1 = day1temp.reduce(function (a, b) {
        return Math.max(a, b);
      });

      maxday2 = day2temp.reduce(function (a, b) {
        return Math.max(a, b);
      });

      maxday3 = day3temp.reduce(function (a, b) {
        return Math.max(a, b);
      });
      maxday4 = day4temp.reduce(function (a, b) {
        return Math.max(a, b);
      });
      maxday5 = day5temp.reduce(function (a, b) {
        return Math.max(a, b);
      });
      if (day6temp.length != 0) {
        maxday6 = day6temp.reduce(function (a, b) {
          return Math.max(a, b);
        });
      }
      var maxdays = [maxday1, maxday2, maxday3, maxday4, maxday5, maxday6];
      var mindays = [minday1, minday2, minday3, minday4, minday5, minday6];
      var symbols = [symbol1, symbol2, symbol3, symbol4, symbol5, symbol6];
      var symbolicons = [iconvalue1, iconvalue2, iconvalue3, iconvalue4, iconvalue5, iconvalue6];
      for (i = 1; i < 7; i++) {
        document.getElementById("day" + i + "mintemp").innerHTML = mindays[i - 1];
        document.getElementById("day" + i + "maxtemp").innerHTML = maxdays[i - 1];
        // document.getElementById("day"+i+"weather").innerHTML = "<img src='icon/brainy.png'>"+symbols[i-1];
        document.getElementById("day" + i + "weather").innerHTML = "<img src='" + symbolicons[i - 1] + "'>" + symbols[i - 1];

      }
      google.charts.load('current', {
        packages: ['corechart', 'bar']
      });
      google.charts.load('current', {
        'packages': ['line']
      });
      google.charts.setOnLoadCallback(drawBarColors);
      var data = google.visualization.arrayToDataTable([
        ['Temperature', 'Min', 'Max', {
          role: 'annotation'
        }],
        ['2010', -Math.abs(minday1), Math.abs(maxday1), ''],
      ]);
      var data1 = google.visualization.arrayToDataTable([
        ['Temperature', 'Min', 'Max', {
          role: 'annotation'
        }],
        ['2010', -Math.abs(minday2), Math.abs(maxday2), ''],
      ]);
      var data2 = google.visualization.arrayToDataTable([
        ['Temperature', 'Min', 'Max', {
          role: 'annotation'
        }],
        ['2010', -Math.abs(minday3), Math.abs(maxday3), ''],
      ]);
      var data3 = google.visualization.arrayToDataTable([
        ['Temperature', 'Min', 'Max', {
          role: 'annotation'
        }],
        ['2010', -Math.abs(minday4), Math.abs(maxday4), ''],
      ]);
      var data4 = google.visualization.arrayToDataTable([
        ['Temperature', 'Min', 'Max', {
          role: 'annotation'
        }],
        ['2010', -Math.abs(minday5), Math.abs(maxday5), ''],
      ]);
      var data5 = google.visualization.arrayToDataTable([
        ['Temperature', 'Min', 'Max', {
          role: 'annotation'
        }],
        ['2010', -Math.abs(minday6), Math.abs(maxday6), ''],
      ]);
      function drawBarColors() {
        var options = {
          hAxis: {
            textPosition: 'none',
            baselineColor: 'none',
            gridlines: {
              color: 'none'
            }
          },
          vAxis: {
            textPosition: 'none',
          },
          width: 300,
          height: 40,
          legend: 'none',
          bar: {
            groupWidth: '15%'
          },
          isStacked: true
        };
        var chart1 = new google.visualization.BarChart(document.getElementById('row1'));
        var chart2 = new google.visualization.BarChart(document.getElementById('row2'));
        var chart3 = new google.visualization.BarChart(document.getElementById('row3'));
        var chart4 = new google.visualization.BarChart(document.getElementById('row4'));
        var chart5 = new google.visualization.BarChart(document.getElementById('row5'));
        var chart6 = new google.visualization.BarChart(document.getElementById('row6'));
        chart1.draw(data, options);
        chart2.draw(data1, options);
        chart3.draw(data2, options);
        chart4.draw(data3, options);
        chart5.draw(data4, options);
        chart6.draw(data5, options);
      }


      google.charts.setOnLoadCallback(drawBasic1);
      function drawBasic1() {
        var data = new google.visualization.DataTable();
        data.addColumn('datetime', 'Time');
        data.addColumn('number', 'Temperature');
        var chartArray1 = [];
        for (let k = 0; k < 9; k++) {
          console.log(time[k]);
          var year = new Date(time[k]).getFullYear();
          var monthval = new Date(time[k]).getMonth();
          var dayval = new Date(time[k]).getDate();
          var hourval = new Date(time[k]).getHours();
          var minuteval = new Date(time[k]).getMinutes();
          var x1 = new Date(year, monthval, dayval, hourval);
          console.log(x1);
          var temperaturevalue = days[k].getElementsByTagName("temperature")[0];
          var x2 = parseFloat(temperaturevalue.getAttribute("value"));
          chartArray1.push([x1, x2]);
        }
        data.addRows(chartArray1);
        var options = {
          hAxis: {
            title: 'Time',
            format: 'HH:mm',
            textStyle: {
              bold: true,
              fontSize: 13
            },
            titleTextStyle: {
              italic: false,
              bold: true,
              fontSize: 16
            },
            gridlines: {
              color: 'none'
            }
          },
          title: 'Temperature vs Time',
          titleTextStyle: {
            bold: true,
            fontSize: 18
          },
          vAxis: {
            title: 'Temperature',
            titleTextStyle: {
              italic: false,
              bold: true,
              fontSize: 16
            },
          },
          'width': 680,
          'height': 350,
          backgroundColor: {
            fill: 'transparent'
          },
          legend: 'none'
        };
        var leftchart1 = new google.visualization.AreaChart(document.getElementById('linechart1'));
        leftchart1.draw(data, options);
      }

      google.charts.setOnLoadCallback(drawChart2);

      function drawChart2() {
        var data = new google.visualization.DataTable();
        data.addColumn('datetime', 'Time');
        data.addColumn('number', 'Humidity');
        var bargrapharr = [];
        for (let k = 0; k < 9; k++) {
          //     console.log(time[k]);
          var year = new Date(time[k]).getFullYear();
          var monthval = new Date(time[k]).getMonth();
          var dayval = new Date(time[k]).getDate();
          var hourval = new Date(time[k]).getHours();
          var minuteval = new Date(time[k]).getMinutes();
          var y1 = new Date(year, monthval, dayval, hourval, minuteval);
          var humidityvalue = days[k].getElementsByTagName("humidity")[0];
          var y2 = parseFloat(humidityvalue.getAttribute("value"));
          bargrapharr.push([y1, y2]);
        }
        data.addRows(bargrapharr);
        var options = {
          title: "Humidity : 24 Hours (%)",
          titleTextStyle: {
            bold: true,
            fontSize: 18
          },
          backgroundColor: {
            fill: 'transparent'
          },
          'width': 680,
          'height': 350,
          hAxis: {
            format: 'HH:mm',
            title: 'Time',
            textStyle: {
              bold: true,
              fontSize: 13
            },
            titleTextStyle: {
              italic: false,
              bold: true,
              fontSize: 16
            }
          },
          vAxis: {
            title: 'Humidity(%)',
            titleTextStyle: {
              italic: false,
              bold: true,
              fontSize: 16
            }
          },
          bar: {
            groupWidth: "55%"
          },
          legend: {
            position: "none"
          },
        };
        var barchart1 = new google.visualization.ColumnChart(document.getElementById("linechart2"));
        barchart1.draw(data, options);
      }    }
  };
  request.open("GET", url, true);
  request.send();
}


var leftcityforecast = function () {
  var lcity = $('location2').value;
  // console.log(lcity);
  var lurl = "https://api.openweathermap.org/data/2.5/weather?q=" + lcity + "&appid=" + appkey + "&mode=xml&units=" + metrics;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data1 = request.responseXML;
      console.log(data1);
      var name = data1.getElementsByTagName("city")[0];
      var leftcityname = name.getAttribute("name");
      var country = name.getElementsByTagName("country")[0].textContent;
      console.log(leftcityname, country);
      var todaysdate = new Date();
      $('leftdate').innerHTML = todaysdate.getDate() + " "+months[todaysdate.getMonth()] + "," +todaysdate.getFullYear();
      var templeft = data1.getElementsByTagName("temperature")[0].getAttribute("value");
      $('leftName').innerHTML = leftcityname + " , " + country;
      $('leftTemp').innerHTML = templeft;
      var sun = name.getElementsByTagName("sun")[0];
      let rise = sun.getAttribute("rise");
      let set = sun.getAttribute("set");
      let dt = new Date(rise);
      let min = dt.getMinutes();
      let dt1 = new Date(set);
      let min1 = dt1.getMinutes();
      if (min >= 0 && min < 10) {
        min = "0" + min;
      }
      if (min1 >= 0 && min1 < 10) {
        min1 = "0" + min1;
      }
      var symbolweather = data1.getElementsByTagName("weather")[0].getAttribute("icon");
      console.log(symbolweather);
      var iconvalue = getIcon(symbolweather);
      $('leftsun').innerHTML = "Sunrise " + dt.getHours() + ":" + min + " | Sunset " + dt1.getHours() + ":" + min1;
      var weathercurr = data1.getElementsByTagName("weather")[0].getAttribute("value");
      $('leftweather').innerHTML = weathercurr;
      var leftwind = data1.getElementsByTagName("wind")[0].getElementsByTagName("speed")[0].getAttribute("value");
      if(metrics=='metric')
      $('leftwind').innerHTML = "Wind Speed: " + leftwind + " m/s";
      else
      $('leftwind').innerHTML = "Wind Speed: " + leftwind + " km/hr";

      var lefthumid = data1.getElementsByTagName("humidity")[0].getAttribute("value");
      $('lefthumidity').innerHTML = "Humidity: " + lefthumid + "%";
      $('leftIcon').src = iconvalue;
    }
  };
  request.open("GET", lurl, true);
  request.send();

}

var rightcityforecast = function () {
  var rcity = $('location3').value;
  // console.log(lcity);
  var rurl = "https://api.openweathermap.org/data/2.5/weather?q=" + rcity + "&appid=" + appkey + "&mode=xml&units=" + metrics;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data1 = request.responseXML;
      console.log(data1);
      var name = data1.getElementsByTagName("city")[0];
      var rightcityname = name.getAttribute("name");
      var todaysdate = new Date();
      $('rightdate').innerHTML = todaysdate.getDate() + " "+months[todaysdate.getMonth()] + "," +todaysdate.getFullYear();

      var country = name.getElementsByTagName("country")[0].textContent;
      console.log(rightcityname, country);
      // $('leftName').innerHTML = rightcityname + " ," + country;
      document.getElementById("rightName").innerHTML = rightcityname;
      var tempright = data1.getElementsByTagName("temperature")[0].getAttribute("value");
      $('rightName').innerHTML = rightcityname + " , " + country;
      $('rightTemp').innerHTML = tempright;
      var sun = name.getElementsByTagName("sun")[0];
      let rise = sun.getAttribute("rise");
      let set = sun.getAttribute("set");
      let dt = new Date(rise);
      let min = dt.getMinutes();
      let dt1 = new Date(set);
      let min1 = dt1.getMinutes();
      if (min >= 0 && min < 10) {
        min = "0" + min;
      }
      if (min1 >= 0 && min1 < 10) {
        min1 = "0" + min1;
      }
      var symbolweather = data1.getElementsByTagName("weather")[0].getAttribute("icon");
      console.log(symbolweather);
      var iconvalue = getIcon(symbolweather);
      console.log(iconvalue);
      $('rightsun').innerHTML = "Sunrise " + dt.getHours() + ":" + min + " | Sunset " + dt1.getHours() + ":" + min1;
      var weathercurr = data1.getElementsByTagName("weather")[0].getAttribute("value");
      $('rightweather').innerHTML = weathercurr;
      var rightwind = data1.getElementsByTagName("wind")[0].getElementsByTagName("speed")[0].getAttribute("value");
      if(metrics=='metric')
      $('rightwind').innerHTML = "Wind Speed: " + rightwind + " m/s";
      else
      $('rightwind').innerHTML = "Wind Speed: " + rightwind + " km/hr";
      var righthumid = data1.getElementsByTagName("humidity")[0].getAttribute("value");
      $('righthumidity').innerHTML = "Wind Speed: " + righthumid + "%";
      $('rightIcon').src = iconvalue;
      console.log($('rightIcon'));
    }
  };
  request.open("GET", rurl, true);
  request.send();
}

var getIcon = function (symbolicon) {
  switch (symbolicon) {
    case '01n':
      return "icon/clearskyn.png";
      break;
    case '01d':
      return "icon/clearskyd.png";
      break;
    case '02d':
    case '03d':
    case '03n':
    case '02n':
      return "icon/scatteredclouds.png";
      break;
    case '04d':
    case '04n':
    case '50n':
      return "icon/brokenclouds.png";
      break;
    case '09d':
    case '09n':
    case '10d':
    case '10n':
      return "icon/rain.png";
      break;
    case '11n':
    case '11d':
      return "icon/thunderstorm.png";
      break;
    case '13d':
    case '13n':
      return "icon/snow.png";
      break;
  }

}

var getIcon2 = function (symbolicon) {
  switch (symbolicon) {
    case '01n':
      return "icons/bclearskyn.png";
      break;
    case '01d':
      return "icons/bclearskyd.png";
      break;
    case '02d':
    case '03d':
    case '03n':
    case '02n':
    case '04d':
    case '04n':
      return "icons/bcloud.png";
      break;
    case '09d':
    case '09n':
    case '10d':
    case '10n':
      return "icons/brainy.png";
      break;
    case '11n':
    case '11d':
      return "icons/bthunderstorm.png";
      break;
    case '13d':
    case '13n':
      return "icons/bsnow.png";
      break;
  }
}
var addcity = function () {
  cityarray.pop();
  var newCity = prompt("Enter new city :");
  cityarray.unshift(newCity);
  var hey = cityimagearr.pop();
  cityimagearr.unshift(hey);
  console.log(hey);
  for (let i = 0; i < 4; i++) {
    $('city-name' + (i + 1)).innerHTML = cityarray[i];
    $('cityimg' + (i + 1)).setAttribute("src", cityimagearr[i]);

  }
  city = newCity;
  currentweather();
  console.log(cityarray);
}

var callforecast1 = function () {
  city = cityarray[0];
  currentweather();
}
var callforecast2 = function () {
  city = cityarray[1];
  currentweather();
}
var callforecast3 = function () {
  city = cityarray[2];
  currentweather();
}
var callforecast4 = function () {
  city = cityarray[3];
  currentweather();
}

var getForecast = function(){
  city = $('loc').value;
  currentweather();
}

window.onload = function () {
  var but = $('btnWeather');
  var leftbtn = $('btnleftcity');
  var rightbtn = $('btnrightcity');
  var changecity = $('addcitybtn');
  rightbtn.onclick = rightcityforecast;
  leftbtn.onclick = leftcityforecast;
  changecity.onclick = addcity;
  this.currentweather();
  but.onclick = getForecast;
}