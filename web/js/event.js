// web/js/event.js

// Remove curve
$(document).on('click', '.remove-button', function() {

	var id = parseInt($(this).attr('id'));

	$(this).parent().css("display","none");

	// Remove series from the graph
  $('#container').highcharts().get(id).remove();

	// Remove curve from the curve array
	curve.splice(getIndex(id), 1);

  refreshData();
});

// Add custom curve
$("#add-curve-button").click(function(){
	var id = random();

	curve.push({
		id: id,
		name: $("#curveName").val(),
		sigma: $("#curveSigma").val(),
		tc: $("#curveTc").val()
	});

	$(".user-curve").append('<li> <button type="button" id="'+ id +'" class="remove-button"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button> <input type="text" class="curve-title-input" value="'+ $("#curveName").val() +'"> σ <input type="number" min="0" step="0.1" class="curve-parameter-input sigmaChange"  value="'+ $("#curveSigma").val() +'"> tc <input type="number" min="0" step="0.1" class="curve-parameter-input tcChange" value="'+ $("#curveTc").val() +'"> </li>');

	if($('.algoCoeff-input').prop('checked') == true)
	{
		$('#container').highcharts().addSeries({ id: curve.last().id, name: curve.last().name, data: gaussian(curve.last().sigma, curve.last().tc, x, 1) });
		var coeffObject = calculCoeff();
		$('#container').highcharts().get(curve.last().id).remove();

		for (var i = 0; i < coeffObject.length; i++)
		{
			if(coeffObject[i].name == curve.last().name)
			{
				$('#container').highcharts().addSeries({ id: curve.last().id, name: curve.last().name, data: gaussian(curve.last().sigma, curve.last().tc, x, coeffObject[i].coeff) });
			}
		}
	}
	else if($('.algoCoeff-input').prop('checked') == false)
	{
		console.log('hello');
		$('#container').highcharts().addSeries({ id: curve.last().id, name: curve.last().name, data: gaussian(curve.last().sigma, curve.last().tc, x, 1) });
	}

	$("#curveName").val('');
	$("#curveSigma").val('');
	$("#curveTc").val('');

  refreshData();
});


// Change curve data dynamically
$(document).on('input', '.curve-title-input', function() {
		var id = parseInt($(this).parent().children(":first").attr('id'));

    $('#container').highcharts().get(id).update({ name: $(this).val() });

		curve[getIndex(id)].name = $(this).val();

    refreshData();
});
$(document).on('input', '.sigmaChange', function() {
		var id = parseInt($(this).parent().children(":first").attr('id'));

		if($('.algoCoeff-input').prop('checked') == true)
		{
			$('#container').highcharts().get(id).setData(gaussian($(this).val(), curve[getIndex(id)].tc, x, 1));
			var coeffObject = calculCoeff();

			for (var i = 0; i < coeffObject.length; i++)
			{
				if(coeffObject[i].name == curve[getIndex(id)].name)
				{
					$('#container').highcharts().get(id).setData(gaussian($(this).val(), curve[getIndex(id)].tc, x, coeffObject[i].coeff));

				}
			}
		}
		else if($('.algoCoeff-input').prop('checked') == false)
		{
			$('#container').highcharts().get(id).setData(gaussian($(this).val(), curve[getIndex(id)].tc, x, 1));
		}

		curve[getIndex(id)].sigma = $(this).val();

    refreshData();
});
$(document).on('input', '.tcChange', function() {
		var id = parseInt($(this).parent().children(":first").attr('id'));

		if($('.algoCoeff-input').prop('checked') == true)
		{
			$('#container').highcharts().get(id).setData(gaussian(curve[getIndex(id)].sigma, $(this).val(), x, 1));
			var coeffObject = calculCoeff();

			for (var i = 0; i < coeffObject.length; i++)
			{
				if(coeffObject[i].name == curve[getIndex(id)].name)
				{
					$('#container').highcharts().get(id).setData(gaussian(curve[getIndex(id)].sigma, $(this).val(), x, coeffObject[i].coeff));
				}
			}
		}
		else if($('.algoCoeff-input').prop('checked') == false)
		{
			$('#container').highcharts().get(id).setData(gaussian(curve[getIndex(id)].sigma, $(this).val(), x, 1));
		}

		curve[getIndex(id)].tc = $(this).val();

    refreshData();
});


// Show/Hide the curve sum
$(".curvesum-input").click(function(){

	if(existInCurve('Courbe expérimentale') == false)
	{
		refreshData();
	}

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
$(document).on('input', '.xUser', function() {

		var xUser = $(this).val().split(/[\n]+|,|;/), chart = $('#container').highcharts();

		// string to number
		for (var i = 0; i < xUser.length; i++)
		{
			xUser[i] = parseFloat(xUser[i]);
		}

		// Assign xUser to the original x and change the xAxis
		x = xUser;
		chart.xAxis[0].setCategories(x);

		// recalculate the data with the new x values
		for (var i = 0; i < curve.length; i++)
		{
			if(curve[i].name != 'Somme courbe')
			{
				chart.get(curve[i].id).setData(gaussian(curve[i].sigma, curve[i].tc, x, 1));
			}
		}

    refreshData();
});

// Experimental points y axis
$(document).on('input', '.yUser', function() {

		var yUser = $(this).val().split(/[\n]+|,|;/), chart = $('#container').highcharts(), id = random();

		// string to number
		for (var i = 0; i < yUser.length; i++)
		{
			yUser[i] = parseFloat(yUser[i]);
		}

		if(existInCurve('Courbe expérimentale'))
		{
			deleteInCurve('Courbe expérimentale');
		}

		curve.push({
			id: 5,
			name: 'Courbe expérimentale',
			sigma: '',
			tc: ''
		});

		chart.addSeries({ id: curve.last().id, name: curve.last().name, color: '#29B6F6', data: yUser });

		$('.coeffCheck').css('display', 'block');

    refreshData();
});

// Add/Remove coefficient on curve
$('.algoCoeff-input').click(function(){

	var i = 0, chart = $('#container').highcharts(), coeffObject = calculCoeff();

	if($('.algoCoeff-input').prop('checked') == true)
	{
		for (var i = 0; i < coeffObject.length; i++)
		{
			for (var e = 0; e < curve.length; e++)
			{
				if(coeffObject[i].name == curve[e].name)
				{
					chart.get(curve[e].id).setData(gaussian(curve[e].sigma, curve[e].tc, x, coeffObject[i].coeff));
				}
			}
		}
	}
	else if($('.algoCoeff-input').prop('checked') == false)
	{
		for (var i = 0; i < curve.length; i++)
		{
			if(curve[i].id != 4 && curve[i].name != 'Courbe expérimentale')
			{
				chart.get(curve[i].id).setData(gaussian(curve[i].sigma, curve[i].tc, x, 1));
			}
		}
	}

	refreshData();
});
