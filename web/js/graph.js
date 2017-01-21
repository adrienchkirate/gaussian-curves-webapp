// web/js/graph.js

$(function () {

      $('#container').highcharts({
        chart: {
            type: 'line',
            zoomType: 'x',
          },
          title: {
              text: 'Sélectionner une partie de la courbe pour zoomer'
          },
          credits: {
              text: "http://hf5-adrienchkirate.xlim.fr/",
              href: 'http://hf5-adrienchkirate.xlim.fr/'
          },
          xAxis: {
            categories: x,
            title:  {
                      text: 'Temps en (s)'
                    }
          },
          yAxis: {
            title:  {
                      text: 'Unité Arbitraire'
                    }
          },
          series: [
          {
            id: curve[0].id,
            name: curve[0].name,
            color: '#2ecc71',
            data: gaussian(curve[0].sigma, curve[0].tc, x, 1)
          },
          {
            id: curve[1].id,
            name: curve[1].name,
            color: '#f1c40f',
            data: gaussian(curve[1].sigma, curve[1].tc, x, 1)
          },
          {
            id: curve[2].id,
            name: curve[2].name,
            color: '#e67e22',
            data: gaussian(curve[2].sigma, curve[2].tc, x, 1)
          },
          {
            id: curve[3].id,
            name: curve[3].name,
            data: [2, 1, 0.5],
            visible: false
          }]
      });
});
