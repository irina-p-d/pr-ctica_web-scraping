const puppeteer = require ('puppeteer');
//Funcion autoejecutable - es un patron de diseño de js. Estas funciones tiene la cualidad de que una vez declaradas, se llaman a sí mismas para inicializarse pasando desde ese momento a estar disponibles para otras partes de la aplicación.
(async () => { //Con este script abrimos navegador, en el abrimos una pestaña y nos lleva hasta página amazon, luego hacemos captura de pantalla
   const browser = await puppeteer.launch({ headless:false }); 
//para creamos una nueva página - Parecido al - abrimos nueva pestaña del navegador
   const page = await browser.newPage();

   await page.goto('http://www.amazon.es');
   //creamos un screenshot de la página y podemos guardarlo en servidor
   await page.screenshot({ path: 'amazon1.jpg'}); //indicamos la ruta donde guardamos screenshot
   await page.type('#twotabsearchtextbox', 'libros php');
   
   await page.screenshot({ path: 'amazon2.jpg'}); 
   await page.click('#nav-search-submit-button');
   await page.waitForSelector('[data-component-type=s-search-result]');
   await page.screenshot({ path: 'amazon3.jpg'}); 
   const enlaces = await page.evaluate(() => {
       const elements = document.querySelectorAll('[data-component-type=s-search-result] h2 a');
       const links = [];
       for (let element of elements) {
           links.push(element.href);
           
       }
       return links;
   }) 
   console.log(enlaces.length);


   await browser.close();
})();

