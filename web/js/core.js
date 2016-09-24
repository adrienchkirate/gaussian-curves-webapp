// web/js/core.js


//
var x = [];

for (var i = 0; i < 288; i++)
{
	x[i] = i * 1/10;
}

//
function gaussian(sigma, tc, x)
{
	var curve = [];

	for (var i = 0; i < x.length; i++)
	{
 		curve[i] = 1 / (sigma * Math.sqrt(2 * Math.PI)) * Math.exp(- Math.pow((x[i] - tc), 2) / 2 * Math.pow(sigma, 2));
	}

	return  curve;
}

	while($('#container').highcharts().series.length > 0)
	{
	 $('#container').highcharts().series[0].remove();
	}

	console.log(seriesUser);
	console.log(seriesUser.length);

	if(seriesUser.length > 0)
	{
		for(var i = 0; i < seriesUser.length; i++)
		{
		    chart.addSeries({ id: seriesUser[i].id, name: seriesUser[i].name, data: seriesUser[i].data });
		}
	}

}

//
function random(min, max)
{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}

//
function curveSum()
{
	var chart = $('#container').highcharts(), data = [];

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

	return data;
}


//
function redrawSum()
{
	$('#container').highcharts().get(4).setData([0]);
	$('#container').highcharts().get(4).setData(curveSum());
}
