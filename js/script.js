
/*Burger*/
$(document).ready(function(){
   $('.header__burger').click(function(event){
      $('.header__burger,.header__actions').toggleClass('active');
      $('body').toggleClass('lock');
   });
});

// /*slider*/
$(document).ready(function(){
	$('.slider').slick({
		arrows:false,
		dots:false,
		slidesToShow:3,
		autoplay:false,
		speed:1000,
		autoplaySpeed:800,
		responsive:[
			{
				breakpoint: 990,
				settings: {
               dots:true,
					slidesToShow:2
				}
			},
			{
				breakpoint: 614,
				settings: {
               dots:true,
					slidesToShow:1
				}
			}
		]
	});
});


$(document).ready(function(){
	$('.slider-rewiews').slick({
		arrows:false,
		dots:true,
		slidesToShow:2,
		autoplay:true,
		speed:1000,
		autoplaySpeed:800,
		responsive:[
			{
				breakpoint: 990,
				settings: {
               dots:true,
					slidesToShow:2
				}
			},
			{
				breakpoint: 691,
				settings: {
               dots:true,
					slidesToShow:1
				}
			}
		]
	});
});


const popupLinks = document.querySelectorAll('.popup-link'); /*поп ап будет открываться при клике на любой объект с классом*/
const body = document.querySelector('body');/*чтобы блокивать скролл*/
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;/*чтобы не было двойных нажатий*/

const timeout = 800; /*такая жецифра указана в св-ве transition css*/

if (popupLinks.length > 0){
   for (let index = 0; index < popupLinks.length; index++){
      const popupLink = popupLinks[index];
      popupLink.addEventListener("click", function(e){
         const popupName = popupLink.getAttribute('href').replace('#', '');
         const curentPopup = document.getElementById(popupName);
         popupOpen(curentPopup);
         e.preventDefault();
      });
   }
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
   for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener('click', function (e){
         popupClose(el.closest('.popup'));
         e.preventDefault();
      });
   }
}

function popupOpen(curentPopup){
   if (curentPopup && unlock) {
      const popupActive = document.querySelector('.popup.open');
      if (popupActive) {
         popupClose(popupActive, false);
      } else {
         bodyLock();
      }
      curentPopup.classList.add('open');
      curentPopup.addEventListener('click', function (e){
         if (!e.target.closest('.popup__content')){
            popupClose(e.target.closest('.popup'));
         }
      });
   }
}
function popupClose(popupActive, doUnlock = true) {
   if (unlock) {
      popupActive.classList.remove('open');
      if (doUnlock) {
         bodyUnLock();
      }
   }
}

function bodyLock() {
   const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

   for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
   }
   body.style.paddingRight = lockPaddingValue;
   body.classList.add('lock');

   unlock = false;
   setTimeout(function() {
      unlock = true;
   }, timeout);
}

function bodyUnLock() {
   setTimeout(function () {
      for (let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];
         el.style.paddingRight = '0px';
      }
      body.style.paddingRight = '0px';
      body.classList.remove('lock');
   }, timeout);

   unlock = false;
   setTimeout(function(){
      unlock = true;
   }, timeout);
}

document.addEventListener('keydown', function(e){
   if (e.which === 27) {
      const popupActive = document.querySelector('.popup.open');
      popupClose(popupActive);
   }
});

(function(){
   if(!Element.prototype.closest){
      Element.prototype.closest = function (css) {
         var node = this;
         while (node) {
            if (node.matches(css)) return node;
            else node = node.parentElement;
         }
         return null;
      };
   }
})();
(function() {
   if(!Element.prototype.matches) {
         Element.prototype.matches = Element.prototype.matchesSelector ||
         Element.prototype.webkitMatchesSelector ||
         Element.prototype.mozMatchesSelector ||
         Element.prototype.msMatchesSelector;
   }
})();