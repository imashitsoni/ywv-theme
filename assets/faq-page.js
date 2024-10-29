const faqsection = document.querySelectorAll('.faq-subsection');
if(faqsection) {
   faqsection.forEach( (element) => {
      element.addEventListener('click' , function(e) { 
         e.preventDefault();
         this.classList.toggle("accordion-open");

         let getFaqContent = this.querySelector('.faq-subsection-content');
         
         if (!this.classList.contains('accordion-open')) {
            getFaqContent.style.height = '0px';

            getFaqContent.addEventListener('transitionend', function () {
               getFaqContent.classList.remove('active');
            }, {
               once: true
            });
         } else {
            getFaqContent.classList.add('active');
            getFaqContent.style.height = 'auto';

            var getFaqHeight = getFaqContent.clientHeight + 'px';
            
            getFaqContent.style.height = '0px';

            setTimeout(function () {
               getFaqContent.style.height = getFaqHeight;
            }, 1);
         }
      })}
   );
}