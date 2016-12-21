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

// gaussian function for the curve
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

// default value for x
var x = [];
for (var i = 0; i < 288; i++)
{
	x[i] = i * 1/10;
}

// gaussian function for the curve
function gaussian(sigma, tc, x)
{
	var curve = [];

	for (var i = 0; i < x.length; i++)
	{
 		curve[i] = 1 / (sigma * Math.sqrt(2 * Math.PI)) * Math.exp(- Math.pow((x[i] - tc), 2) / 2 * Math.pow(sigma, 2));
	}

	return  curve;
}

// just a random function
function random(min, max)
{
  min = Math.ceil(min);
  max = Math.floor(max);
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

// calculate the sum of all the curve
function curveSum()
{
	var chart = $('#container').highcharts(), data = [];

	chart.get(4).setData([0]);

	for (var i = 0; i < chart.series[0].data.length; i++)
	{
		data[i] = chart.series[0].data[i].y;
	}

	for (var i = 1; i < chart.series.length; i++)
	{
		if(chart.series[i].name != 'Somme courbe')
		{
			for (var e = 0; e < chart.series[i].data.length; e++)
			{
	 			data[e] += chart.series[i].data[e].y;
	 		}
 		}
	}

	chart.get(4).setData(data)
}
