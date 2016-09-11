// web/bundles/Unilim/javascript/graph.js

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
            id: 1,
            name: 'Monomère',
            color: '#2ecc71',
            data: gaussian(1, 6.6, x)
          },
          {
            id: 2,
            name: 'Dimère',
            color: '#f1c40f',
            data: gaussian(2, 9.8, x)
          },
          {
            id: 3,
            name: 'Trimère',
            color: '#e67e22',
            data: gaussian(2, 13.25, x)
          },
          {
            id: 4,
            name: 'Somme courbe',
            data: [0],
            visible: false
          }]
      });
});