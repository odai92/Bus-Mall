// 'use strict'
var pushArray = [];
var bananaLeftText = document.getElementById('leftImage');
var bathroomLeftText = document.getElementById('bottomImage');
var bootsLeftText = document.getElementById('rightImage');

var bananaLeft = document.getElementById('left_image');
var bathroomLeft = document.getElementById('bottom_image');
var bootsLeft = document.getElementById('right_image');
var votingRounds = 25;
var imageButton = document.getElementById('mall_click')
var imageCanvas = document.getElementById('imageChart').getContext('2d');
var shownImages = [];




function Product(name,image){
    this.name = name;
    this.image = image
    this.url= 'img/'+ image;
    this.counter = 0;
    this.timeShown = 0;
    

    pushArray.push(this);
}

new Product('banana','banana.jpg');
new Product('bathroom','bathroom.jpg');
new Product('boots','boots.jpg');
new Product('bag','bag.jpg');
new Product('breackfast','breakfast.jpg');
new Product('bubblegum','bubblegum.jpg')
new Product('chair','chair.jpg');
new Product('cthulhu','cthulhu.jpg');
new Product('dog-duck','dog-duck.jpg');
new Product('dragon','dragon.jpg')
new Product('pen','pen.jpg');
new Product('pet-sweep','pet-sweep.jpg')
new Product('scissors','scissors.jpg');
new Product('shark','shark.jpg')
new Product('sweep','sweep.png');
new Product('tauntaun','tauntaun.jpg');
new Product('unicorn','unicorn.jpg');
new Product('usb','usb.gif')
new Product('water-can','water-can.jpg');
new Product('wine-glass','wine-glass.jpg');



function renderImage(leftImage, bottomImage, rightImage){
  bananaLeftText.textContent = pushArray[leftImage].name;
  bathroomLeftText.textContent = pushArray[bottomImage].name;
  bootsLeftText.textContent = pushArray[rightImage].name;
    

    console.log(bananaLeft, bananaLeftText);

   bananaLeft.setAttribute('src',pushArray[leftImage].url);
   bathroomLeft.setAttribute('src',pushArray[bottomImage].url);
   bootsLeft.setAttribute('src', pushArray[rightImage].url);

  


}

function renderChart() {

  var arrayOfImageNames = [];
  var arrayOfImageCount = [];
  var arrayOfImageShown = [];

  for(var index = 0; index < pushArray.length; index++){
    arrayOfImageNames.push(pushArray[index].name);
    arrayOfImageCount.push(pushArray[index].counter);
    arrayOfImageShown.push(pushArray[index].timeShown);
  }
  
  var myChart = new Chart(imageCanvas, {
    type: 'bar',
    data: {
      labels: arrayOfImageNames, 
      datasets: [
        {
        label: '# of Goat Clicks',
        data: arrayOfImageCount, 
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },
      {
        label: 'Time shown for the Goat',
        data: arrayOfImageShown,  
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function checkAvailability (selectedImageName) {

  for (var index = 0; index < shownImages.length; index++) {
    if (shownImages[index].name === selectedImageName) {
      return true;
    }
  }
  return false;  
}


function pickImage(){
    var leftImage = Math.round(Math.random() * (pushArray.length -1)) 
    do{
        var bottomImage = Math.round(Math.random() * (pushArray.length -1 ));
        var rightImage = Math.round(Math.random() * (pushArray.length -1));

    } while (leftImage === bottomImage || bottomImage === rightImage || leftImage === rightImage);

  
    renderImage(leftImage , bottomImage, rightImage);
    
}

function checkImage(theIndicator) {
    for (var index = 0; index < pushArray.length; index++) {
      
      if (pushArray[index].url === theIndicator) {
        pushArray[index].counter++;
        votingRounds--;
    
      }
    }
    
  }

  function timeShown(object){
    for(var index= 0; index < pushArray.length ;index++ ){
      if(pushArray[index].url === object){
        pushArray[index].timeShown++;
      }
    }
  }



  function countImage (event){
    console.log(event.target.id);
      var targetId = event.target.id;
      
      if(votingRounds !== 0 ){

          if (targetId === 'left_image' ||targetId === 'bottom_image' || targetId === 'right_image' ){
            console.log(votingRounds);
              var theIndecator = event.target.getAttribute('src');
              console.log(bananaLeft.getAttribute('src'));
              checkImage(theIndecator);
              timeShown(bananaLeft.getAttribute('src'));
              timeShown(bathroomLeft.getAttribute('src'));
              timeShown(bootsLeft.getAttribute('src'));
              pickImage();
          }
      }else{
        imageSection.removeEventListener('click', countImage);
        mall_click.addEventListener('click', function(){
          var ul = document.createElement('ul');
          var section = document.getElementById("listId");
      
          section.appendChild(ul);
          for(var index = 0; index<20;index++){
            var li = document.createElement('li');
            li.textContent = pushArray[index].name + '/'+ 'counter:' + pushArray[index].counter + '/' + 'Time shown:~' + pushArray[index].timeShown
            ul.appendChild(li);
            renderChart();
          }
      
        });
        
        

      }
  }


  pickImage();
  var imageSection = document.getElementById('myMall');


  imageSection.addEventListener('click',countImage);


  var my_mall = document.getElementById('mall_click');
  console.log(mall_click);
  imageButton.addEventListener('click',checkImage)
  // mall_click.addEventListener('click', function(){
  //   var ul = document.createElement('ul');
  //   var section = document.getElementById("listId");

  //   section.appendChild(ul);
  //   for(var index = 0; index<20;index++){
  //     var li = document.createElement('li');
  //     li.textContent = pushArray[index].name + '/'+ 'counter:' + pushArray[index].counter + '/' + 'Time shown:~' + pushArray[index].timeShown
  //     ul.appendChild(li);
  //   }

  // });
 