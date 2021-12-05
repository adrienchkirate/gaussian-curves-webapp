# A Web Application for scientific purposes 

This application was designed for a particular research subject at the [Limoges University](http://www.xlim.fr/) in France. The web application allows researchers to manipulate gaussian curves and experimental curves. The application is in French.

It features :
- Integration of experimental points
- Manipulation of gaussian curves
- Exportation of the points as a csv file
- Calculation of the error between an experimental and a theorical curve 
- A curve fitting algorithm allowing the fitting of theoretical curves to an experimental curve

![Capture of the app](http://adrienchkirate.com/app/hf5v2/img/capture.png)

**[Use the application. ](http://adrienchkirate.com/app/hf5v2/)**

## Older version

An older version with less feature is available **[here](http://adrienchkirate.com/app/hf5v1/)**. 

## Init project

If you want to run the app locally you will need the following dependencies :
- Normalize Css
- Boostrap
- jquery
- Highcharts

Composer can download automatically all the dependencies by using the composer.json file and the following console line :

```bash
  php ../composer.phar update
```
