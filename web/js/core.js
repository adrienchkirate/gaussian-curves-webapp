// web/js/core.js

// curve array
var curve = [
{
	id: 1,
	name: 'Monomère',
	sigma: 1,
	tc: 6.6
},
{
	id: 2,
	name: 'Dimère',
	sigma: 2,
	tc: 9.8
},
{
	id: 3,
	name: 'Trimère',
	sigma: 2,
	tc: 13.25
},
{
	id: 4,
	name: 'Somme des courbes',
	sigma: null,
	tc: null
}];

// function who work on curve array
function getIndex(id)
{
	for (var i = 0; i < curve.length; i++)
	{
		if(curve[i].id == id)
		{
			index = i;
		}
	}

	return index;
}

function existInCurve(name)
{
	var exist = false;

	for (var i = 0; i < curve.length; i++)
	{
		if(curve[i].name == name)
		{
			exist = true
		}
	}

	return exist;
}

function deleteInCurve(name)
{
	for (var i = 0; i < curve.length; i++)
	{
		if(curve[i].name == name)
		{
			$('#container').highcharts().get(curve[i].id).remove();
			curve.splice(i, 1);
		}
	}
}

// default value for x
var x = [];
for (var i = 0; i < 288; i++)
{
	x[i] = i * 1/10;
}

// gaussian function for the curve
function gaussian(sigma, tc, x, coeff)
{
	var curve = [];

	for (var i = 0; i < x.length; i++)
	{
 		curve[i] = coeff * (1 / (sigma * Math.sqrt(2 * Math.PI)) * Math.exp(- Math.pow((x[i] - tc), 2) / 2 * Math.pow(sigma, 2)));
	}

	return  curve;
}

// just a random function
function random()
{
  min = Math.ceil(6);
  max = Math.floor(100);
  return Math.floor(Math.random() * (max - min +1)) + min;
}

// .last method who return the last element of an array
if (!Array.prototype.last)
{
    Array.prototype.last = function()
		{
        return this[this.length - 1];
    };
};


// Refresh curveSum & the error experimental/theoric
function refreshData()
{

	var chart = $('#container').highcharts(), data = [], data2 = [];

	// calculate the sum of all the curve
	chart.get(4).setData(0);

	for (var i = 0; i < chart.series[0].data.length; i++)
	{
		data[i] = chart.series[0].data[i].y;
	}

	for (var i = 1; i < chart.series.length; i++)
	{
		if(chart.series[i].id != curve[3].id && chart.series[i].name != 'Courbe expérimentale')
		{
			for (var e = 0; e < chart.series[i].data.length; e++)
			{
	 			data[e] += chart.series[i].data[e].y;
	 		}
 		}
	}

	chart.get(4).setData(data);

	// average function
	Math.average = function() {
		var cnt, tot, i;
		cnt = arguments.length;
		tot = i = 0;
		while (i < cnt) tot+= arguments[i++];
		return tot / cnt;
	}

	if(existInCurve('Courbe expérimentale'))
	{
		// calculate the error experimental/theoric
		for (var i = 0; i < chart.get(5).data.length; i++)
		{
			data2[i] = Math.abs(chart.get(5).data[i].y - chart.get(4).data[i].y);
		}

		$('.maxError').empty();
		$('.maxError').text(Math.max(... data2).toFixed(3));
		$('.avgError').empty();
		$('.avgError').text(Math.average(... data2).toFixed(3));
	}

	function calculStats()
	{
		var chart = $('#container').highcharts(), totalStats = [0, 0];

		for (var i = 0; i < chart.series.length; i++)
		{
			totalStats[0] += chart.series[i].data.length;
			totalStats[1] = chart.series.length;
		}

		return totalStats;
	}

	$('.totalPoint').text(calculStats()[0]);
	$('.totalCurve').text(calculStats()[1]);
}

// Calulate the coefficient who help theoric curve to fit the experimental one
function calculCoeff()
{
	var chart = $('#container').highcharts(), A = [], B = [], Y = [], coeffObject = [];

	// Create an array of array with the data of the curve
	for (var i = 0; i < chart.series.length; i++)
	{
		if(chart.series[i].name != curve[3].name && chart.series[i].name != 'Courbe expérimentale')
		{
			for(var e = 0; e < chart.series[i].data.length; e++)
			{
					B[e] = chart.series[i].data[e].y;
			}

			coeffObject.push({ name: chart.series[i].name, coeff: '' });
			A.push(B);
			B = [];
		}
		else if(chart.series[i].name == 'Courbe expérimentale')
		{
			for(var e = 0; e < chart.series[i].data.length; e++)
			{
					Y[e] = chart.series[i].data[e].y;
			}
		}
	}

	// Various matrix operations
	var A = math.matrix(A);
	var At = math.transpose(A);
	var AtA = math.multiply(A,At);

	// operations on the experimental points
	var Y = math.matrix(Y);
	var Yt = math.transpose(Y);

	// Finals operations
	var AtY = math.multiply(A,Yt);
	var AtYt = math.transpose(AtY);

	// The algorithmn return an array with one coefficient for each curve who help theoric point to fit the experimental ones
	var coeff = math.divide(AtYt,AtA);

	for (var i = 0; i < coeffObject.length; i++)
	{
		coeffObject[i] = { name: coeffObject[i].name, coeff: coeff.valueOf()[i] };
	}

	return coeffObject

}

// Function to format curve data in csv 
function formatData()
{
	var data = '', chart = $('#container').highcharts(), test = [''];

	for (var i = 0; i < chart.series.length; i++)
	{
		if(chart.series[i].name != 'Somme des courbes')
		{
			data += chart.series[i].name + ','; 
		}
	}

	for(var i = 0; i < chart.series[1].data.length; i++)
	{
		data += '\n';

		for(var e = 0; e < chart.series.length; e++)
		{	
			if(chart.series[e].name != 'Somme des courbes')
			{
				data += chart.series[e].data[i].y + ','; 
			}
	
		}

	}
	
	return data;
}

// Function to export data as a csv file 
function exportToCsv(data) 
{
  		
	var csvContent = "data:text/csv;charset=utf-8," + data;

	var encodedUri = encodeURI(csvContent);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", "curve_data.csv");
	document.body.appendChild(link);
	link.click(); 
   	document.body.removeChild(link); 
      
}

