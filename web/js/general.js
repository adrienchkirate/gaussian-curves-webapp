// web/js/general.js

// Remove curve
$(document).on('click', '.remove-button', function() {

	$(this).parent().css("display","none")

	// Remove default series from the graph
  $('#container').highcharts().get(parseInt($(this).attr('id'))).remove();

  curveSum();
});

// Add custom curve
$("#add-curve-button").click(function(){
	var id = random(5, 99999999999);

	curve.push({
		id: id,
		name: $("#curveName").val(),
		sigma: $("#curveSigma").val(),
		tc: $("#curveTc").val()
	});

	$(".user-curve").append('<li> <button type="button" index="'+ curve.indexOf(curve.last()) +'" id="'+ id +'" class="remove-button"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button> <input type="text" class="curve-title-input" value="'+ $("#curveName").val() +'"> σ <input type="number" min="0" step="0.1" class="curve-parameter-input sigmaChange"  value="'+ $("#curveSigma").val() +'"> tc <input type="number" min="0" step="0.1" class="curve-parameter-input tcChange" value="'+ $("#curveTc").val() +'"> </li>');

  $('#container').highcharts().addSeries({ id: curve.last().id, name: curve.last().name, data: gaussian(curve.last().sigma, curve.last().tc, x) });

	$("#curveName").val('');
	$("#curveSigma").val('');
	$("#curveTc").val('');

  curveSum();
});


// Change curve data dynamically
$(document).on('input', '.curve-title-input', function() {
		var index = parseInt($(this).parent().children(":first").attr('index')), id = curve[index].id;

    $('#container').highcharts().get(id).update({ name: $(this).val() });
		curve[index].name = $(this).val();

    curveSum();
});
$(document).on('input', '.sigmaChange', function() {
		var index = parseInt($(this).parent().children(":first").attr('index')), id = curve[index].id;

    $('#container').highcharts().get(id).setData(gaussian($(this).val(), curve[index].tc, x));
		curve[index].sigma = $(this).val();

    curveSum();
});
$(document).on('input', '.tcChange', function() {
		var index = parseInt($(this).parent().children(":first").attr('index')), id = curve[index].id;

    $('#container').highcharts().get(id).setData(gaussian(curve[index].sigma, $(this).val(), x));
		curve[index].tc = $(this).val();

    curveSum();
});


// Show/Hide the curve sum
$(".curvesum-input").click(function(){

	curveSum();

	if($(this).is(':checked'))
	{
		$('#container').highcharts().get(4).show();
	}
	else
	{
		$('#container').highcharts().get(4).hide();
	}

});

// Experimental points x axis
$(document).on('input', '.xValue', function() {

		var xValue = $(this).val().split(/[\n]+/), chart = $('#container').highcharts();

		for (var i = 0; i < xValue.length; i++)
		{
			xValue[i] = parseFloat(xValue[i]);
		}

		chart.xAxis[0].setCategories(xValue);

		// for (var i = 0; i < chart.series.length; i++)
		// {
		// 	if(chart.series[i].name != 'Somme courbe')
		// 	{
		// 	}
		// }

    curveSum();
});
