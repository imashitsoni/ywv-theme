
if (!customElements.get('product-form')) {
  customElements.define(
    'product-form',
    class ProductForm extends HTMLElement {
      constructor() {
        super();

        this.form = this.querySelector('form');
        this.variantIdInput.disabled = false;
        this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
        this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
        this.submitButton = this.querySelector('[type="submit"]');
        this.submitButtonText = this.submitButton.querySelector('span');

        if (document.querySelector('cart-drawer')) this.submitButton.setAttribute('aria-haspopup', 'dialog');

        this.hideErrors = this.dataset.hideErrors === 'true';
      }

      onSubmitHandler(evt) {
        evt.preventDefault();
        if (this.submitButton.getAttribute('aria-disabled') === 'true') return;

        this.handleErrorMessage();

        //this.submitButton.setAttribute('aria-disabled', true);
        //this.submitButton.classList.add('loading');
        //this.querySelector('.loading__spinner').classList.remove('hidden');

        const config = fetchConfig('javascript');
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
        delete config.headers['Content-Type'];

        const formData = new FormData(this.form);
        if (this.cart) {
          formData.append(
            'sections',
            this.cart.getSectionsToRender().map((section) => section.id)
          );
          formData.append('sections_url', window.location.pathname);
          this.cart.setActiveElement(document.activeElement);
        }
        config.body = formData;

        fetch(`${routes.cart_add_url}`, config)
          .then((response) => response.json())
          .then((response) => {
            if (response.status) {
              publish(PUB_SUB_EVENTS.cartError, {
                source: 'product-form',
                productVariantId: formData.get('id'),
                errors: response.errors || response.description,
                message: response.message,
              });
              this.handleErrorMessage(response.description);

              const soldOutMessage = this.submitButton.querySelector('.sold-out-message');
              if (!soldOutMessage) return;
              this.submitButton.setAttribute('aria-disabled', true);
              this.submitButtonText.classList.add('hidden');
              soldOutMessage.classList.remove('hidden');
              this.error = true;
              return;
            } else if (!this.cart) {
              window.location = window.routes.cart_url;
              return;
            }
            
            if (!this.error) {
              publish(PUB_SUB_EVENTS.cartUpdate, {
                source: 'product-form',
                productVariantId: formData.get('id'),
                cartData: response,
              });
            }
            this.error = false;
            const quickAddModal = this.closest('quick-add-modal');
            if (quickAddModal) {
              document.body.addEventListener(
                'modalClosed',
                () => {
                  setTimeout(() => {
                    this.cart.renderContents(response);
                  });
                },
                { once: true }
              );
              quickAddModal.hide(true);
            } else {
              console.log("response", response)
              this.cart.renderContents(response);

              // custom safegaurd script start
              setTimeout(function(){
                // console.log('in snippet drawer');
                // return false;
                let safeguardPriceCheckbox = document.querySelector('.checkbox-content input.check-box').getAttribute('data-variant-price');
                // console.log('safeguardPriceCheckbox', safeguardPriceCheckbox);
                
                let checkBox = document.querySelector(".check-box");
                let safeguardBox = document.querySelector(".shipping-guard");
                let cross = document.querySelector(".guard-cross");
              
                async function checkSafeguardStatus(checkBox){
              
                  let cartTotalPrice;
                  let cartOriginalTotalPrice;
                  
                  await fetch(window.Shopify.routes.root + 'cart.js')
                            .then(response => response.json())
                            .then(data => {               
                              // console.log('Cart Response', data);
                              cartTotalPrice = data.total_price;
                              cartOriginalTotalPrice = data.original_total_price;                
                              data.items.forEach(function(itemEle){                                    
                                let itemTitle = itemEle.title;
                                if(itemTitle.includes('Safeguard - Shipping Guarantee')){
                                  cartTotalPrice = cartTotalPrice - parseFloat(safeguardPriceCheckbox);
                                  cartOriginalTotalPrice = cartOriginalTotalPrice - parseFloat(safeguardPriceCheckbox);
                                }
                              });
                              // return cartTotalPrice;
                            });
                  // console.log('cartTotalPrice', cartTotalPrice);
                  // console.log('cartOriginalTotalPrice', cartOriginalTotalPrice);
              
                  
                  if(checkBox.checked == true){
                      if(safeguardBox){
                        safeguardBox.style.display = "flex"; 
                      }
                    
                        //update price
                        let updatedPrice = cartTotalPrice + parseFloat(safeguardPriceCheckbox);
                        updatedPrice = updatedPrice/100;
                        updatedPrice = parseFloat(updatedPrice);
                        updatedPrice = updatedPrice.toFixed(2);
                        updatedPrice = updatedPrice.toLocaleString("en-US");
                        // console.log('updatedPrice', updatedPrice);
              
                        
                    
                        setTimeout(function(){
              
                          let subTotalDiv = document.querySelector("#CartDrawer #mainpricesale span.totals__total-value");
                          if(subTotalDiv){
                            // subTotalDiv.textContent = `${shop_symbol}${updatedPrice}`;
                            subTotalDiv.innerHTML = `<span class="money">${shop_symbol}${updatedPrice}</span>`;
                            // console.log('subTotalDiv', subTotalDiv.textContent);
                          }
                          
                          let itemsTotalCompareDiv = document.querySelector("#CartDrawer #mainpricesale s.price-item.price-item--regular");
                          // console.log('itemsTotalCompareDiv', itemsTotalCompareDiv);
                          if(itemsTotalCompareDiv){
                            let itemsTotalComparePrice = itemsTotalCompareDiv.getAttribute('data-items-total-compare-price');
                            // console.log('itemsTotalComparePrice', itemsTotalComparePrice);
                            
                            // console.log('safeguardPriceCheckbox', safeguardPriceCheckbox);
                            let comparePriceNew = parseFloat(itemsTotalComparePrice) + parseFloat(safeguardPriceCheckbox);           
                            comparePriceNew = comparePriceNew/100;
                            comparePriceNew = parseFloat(comparePriceNew);
                            comparePriceNew = comparePriceNew.toFixed(2);
                            comparePriceNew = comparePriceNew.toLocaleString("en-US");
                            // console.log('comparePriceNew ', comparePriceNew);
                            
                            itemsTotalCompareDiv.innerHTML = `<span class="money">${shop_symbol}${comparePriceNew}</span>`;
                            // console.log('itemsTotalCompareDiv', itemsTotalCompareDiv);
                          }
            
                          // let itemsTotalSavingsDiv = document.querySelector("#CartDrawer #mainpricesale .price-totaldiscount .pricesavings");
                          // // console.log('itemsTotalSavingsDiv', itemsTotalSavingsDiv);
                          // if(itemsTotalSavingsDiv){
                          //   let itemsTotalSavingsPrice = itemsTotalSavingsDiv.getAttribute('data-total-savings');                
                          // //   console.log('itemsTotalSavingsPrice', itemsTotalSavingsPrice);
                            
                          // //   console.log('safeguardPriceCheckbox', safeguardPriceCheckbox);
                          //   let savingsPriceNew = parseFloat(itemsTotalSavingsPrice) + parseFloat(safeguardPriceCheckbox);
                          //   savingsPriceNew = savingsPriceNew/100;
                          //   savingsPriceNew = parseFloat(savingsPriceNew);
                          //   savingsPriceNew = savingsPriceNew.toFixed(2);
                          //   savingsPriceNew = savingsPriceNew.toLocaleString("en-US");
                          // //   console.log('savingsPriceNew ', savingsPriceNew);
                            
                          //   itemsTotalSavingsDiv.innerHTML = `Save <span class="money">${shop_symbol}${savingsPriceNew}</span>`;
                          // //   console.log('itemsTotalSavingsDiv', itemsTotalSavingsDiv);
                          // }
                          
                        }, 1000);
                      
                    }else{
                    
                      if(safeguardBox){
                        safeguardBox.style.display = "none"; 
                      }
                    
                        //update price
                        let updatedPrice = cartTotalPrice;
                        updatedPrice = updatedPrice/100;
                        updatedPrice = parseFloat(updatedPrice);
                        // console.log('updatedPrice in else', updatedPrice);
                        updatedPrice = updatedPrice.toFixed(2);
                        updatedPrice = updatedPrice.toLocaleString("en-US");
                    
                    
                        setTimeout(function(){
                          
                          let subTotalDiv = document.querySelector("#CartDrawer #mainpricesale span.totals__total-value");
                          if(subTotalDiv){
                            // subTotalDiv.textContent = `${shop_symbol}${updatedPrice}`;
                            subTotalDiv.innerHTML = `<span class="money">${shop_symbol}${updatedPrice}</span>`;
                            // console.log('subTotalDiv', subTotalDiv.textContent);
                          }
                          
                          let itemsTotalCompareDiv = document.querySelector("#CartDrawer #mainpricesale s.price-item.price-item--regular");
                          // console.log('itemsTotalCompareDiv', itemsTotalCompareDiv);
                          if(itemsTotalCompareDiv){
                            let itemsTotalComparePrice = itemsTotalCompareDiv.getAttribute('data-items-total-compare-price');
                            // console.log('itemsTotalComparePrice', itemsTotalComparePrice);
            
                            // console.log('safeguardPriceCheckbox', safeguardPriceCheckbox);
                            let comparePriceNew = parseFloat(itemsTotalComparePrice); // - parseFloat(safeguardPriceCheckbox);           
                            comparePriceNew = comparePriceNew/100;
                            comparePriceNew = parseFloat(comparePriceNew);
                            comparePriceNew = comparePriceNew.toFixed(2);
                            comparePriceNew = comparePriceNew.toLocaleString("en-US");
                            // console.log('comparePriceNew else', comparePriceNew);
                            
                            itemsTotalCompareDiv.innerHTML = `<span class="money">${shop_symbol}${comparePriceNew}</span>`;
                            // console.log('itemsTotalCompareDiv', itemsTotalCompareDiv);
                          }
            
                          // let itemsTotalSavingsDiv = document.querySelector("#CartDrawer #mainpricesale .price-totaldiscount .pricesavings");
                          // // console.log('itemsTotalSavingsDiv', itemsTotalSavingsDiv);
                          // if(itemsTotalSavingsDiv){
                          //   let itemsTotalSavingsPrice = itemsTotalSavingsDiv.getAttribute('data-total-savings');                
                          // //   console.log('itemsTotalSavingsPrice', itemsTotalSavingsPrice);
                            
                          // //   console.log('safeguardPriceCheckbox ', safeguardPriceCheckbox);
                          //   let savingsPriceNew = parseFloat(itemsTotalSavingsPrice); // - parseFloat(safeguardPriceCheckbox);
                          //   savingsPriceNew = savingsPriceNew/100;
                          //   savingsPriceNew = parseFloat(savingsPriceNew);
                          //   savingsPriceNew = savingsPriceNew.toFixed(2);
                          //   savingsPriceNew = savingsPriceNew.toLocaleString("en-US");
                          // //   console.log('savingsPriceNew else', savingsPriceNew);
                            
                          //   itemsTotalSavingsDiv.innerHTML = `Save <span class="money">${shop_symbol}${savingsPriceNew}</span>`;
                          // //   console.log('itemsTotalSavingsDiv', itemsTotalSavingsDiv);
                          // }
                          
                        }, 1000);
                        
                    }
                }
              
                //toggle safeguard
                if(checkBox){
                  checkBox.addEventListener('click', function(){      
                    checkSafeguardStatus(checkBox);
                  });
                }
              
                //onload check if safeguard checked then update price  
                if(!safeguardInCart){
                  // console.log('if(!safeguardInCart)')
                  checkSafeguardStatus(checkBox);
                }
              
                //remove safeguard
                if(cross){
                  cross.addEventListener('click', async function(){
                    
                    let cartContainsOnlySafegaurd = false;
                    let checkSafeguardOnlyInCart = await fetch(window.Shopify.routes.root + 'cart.js')
                                            .then(response => response.json())
                                            .then(data => {               
                                              // //console.log('Cart Response cross', data);
                                              let cartItemsCount = data.item_count;
                                              data.items.forEach(function(itemEle){                                    
                                                let itemTitle = itemEle.title;
                                                if(itemTitle.includes('Safeguard - Shipping Guarantee') && cartItemsCount == 1 ){
                                                  cartContainsOnlySafegaurd = true;
                                                }
                                              })
                                              return cartContainsOnlySafegaurd;
                                            });
                    // console.log('checkSafeguardOnlyInCart', checkSafeguardOnlyInCart);
                    
                    if(checkSafeguardOnlyInCart){
                      // console.log('in if')
                      fetch(window.Shopify.routes.root + 'cart/clear.js')
                                            .then(response => response.json())
                                            .then(data => {               
                                              // console.log('Cart Clear Res', data);
                                              location.reload();
                                            });
                    }else{          
                      if(checkBox.checked){
                        checkBox.click();
                      }
                    }
                    
                  });
                }
              
                
                //question mark hover functionality
                let questionMarkIcon = document.querySelector('.question-mark');
                if(questionMarkIcon){
                  questionMarkIcon.addEventListener('mouseover', function(){
                    let questionBox = document.querySelector('.question-hover');
                    questionBox.style.display = 'block';
                  });
                  questionMarkIcon.addEventListener('mouseout', function(){
                    let questionBox = document.querySelector('.question-hover');
                    questionBox.style.display = 'none';
                  });
                }
              
                //custom checkout button functionality
                let checkoutBtn = document.querySelector('#CartDrawer-Checkout');
                if(checkoutBtn){
                  //remove submit attr
                  checkoutBtn.setAttribute('type', 'button');
              
                  //add click event and our custom functionality
                  checkoutBtn.addEventListener('click', function(){
                    
                    let safeguardCheckbox = document.querySelector('.checkbox-content input.check-box');
                    let safeguardId = safeguardCheckbox.getAttribute('data-variant-id');
                    // console.log('safeguardId', safeguardId);
                    let safeguardPrice = safeguardCheckbox.getAttribute('data-variant-price');
                    // console.log('safeguardPrice', safeguardPrice);
            
                    let freeStickersID = '';
                    let freeStickersVariantID = document.querySelector('.free-stickers-pack').getAttribute('data-free-stickers-pack');
                    if(freeStickersVariantID){
                      freeStickersID = freeStickersVariantID;
                    }
                    // console.log('freeStickersID', freeStickersID);
                    
                    if(checkBox.checked == true){
                      fetch('/cart.js')
                      .then(res => res.json())
                      .then(data => {
                        // console.log('cart data: ', data);
              
                        let cartItems = data.items;
                        let permalinkString = '/cart/';
                        let addSafeguard = true;
                        let addFreeStickers = true;
                        let directCheckout = false;
                        cartItems.forEach(function(itemEle){
                          let prod_title = itemEle.title;
                          let prod_variant_id = itemEle.id;
                          let prod_qty = itemEle.quantity;
                          if(prod_title.includes('Safeguard')){
                            addSafeguard = false;
                            // console.log('addSafeguard 1', addSafeguard);
                            directCheckout = true;
                          }else{
                            if(prod_title.includes('Sticker')){
                              addFreeStickers = false;
                            }
                            permalinkString += `${prod_variant_id}:${prod_qty},`;
                          }
                        });
                        
                        if(addSafeguard){            
                          // console.log('addSafeguard 2', addSafeguard);
                          permalinkString += `${safeguardId}:1`;
                        }
            
                        if(addFreeStickers){            
                          // console.log('freeStickersID ', freeStickersID);
                          permalinkString += `,${freeStickersID}:1`;
                        }
                        
                        if(directCheckout == false){
                          let finalURL = `https://yeswevibe.com/${permalinkString}`;          
                          // console.log('finalURL if', finalURL);            
                          location.href = finalURL;            
                        }else{
                          // console.log('/checkout');   
                          location.href = '/checkout';
                        }
                      });        
                    }else{        
                      fetch('/cart.js')
                      .then(res => res.json())
                      .then(data => {
                        // // //console.log('cart data: ', data);
              
                        let cartItems = data.items;
                        let permalinkString = '/cart/';
                        let addSafeguard = false;
                        cartItems.forEach(function(itemEle){
                          let prod_title = itemEle.title;
                          let prod_variant_id = itemEle.id;
                          let prod_qty = itemEle.quantity;
                          if(prod_title.includes('Safeguard')){
                            addSafeguard = false;
                            // console.log('addSafeguard 11', addSafeguard);
                          }
                          if(!prod_title.includes('Safeguard')){
                            permalinkString += `${prod_variant_id}:${prod_qty},`;
                          }
                        });
                        
                        if(addSafeguard){            
                          // console.log('addSafeguard 22', addSafeguard);
                          permalinkString += `${safeguardId}:1`;
                        }
                        
                        // if(freeStickersID){            
                        // //   console.log('freeStickersID ', freeStickersID);
                        //   permalinkString += `,${freeStickersID}:1`;
                        // }
                        
                        let finalURL = `https://yeswevibe.com/${permalinkString}`;          
                        // console.log('finalURL else', finalURL);
              
                        location.href = finalURL;
                      });
                    }
                    
                  });
              
                }
              }, 1500);
              // custom safegaurd script ends


              
            }

            // window.location.reload();
            
          })
          .catch((e) => {
            console.error(e);
          })
          .finally(() => {
            this.submitButton.classList.remove('loading');
            if (this.cart && this.cart.classList.contains('is-empty')) this.cart.classList.remove('is-empty');
            if (!this.error) this.submitButton.removeAttribute('aria-disabled');
            this.querySelector('.loading__spinner').classList.add('hidden');
          });
      }

      handleErrorMessage(errorMessage = false) {
        if (this.hideErrors) return;

        this.errorMessageWrapper =
          this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
        if (!this.errorMessageWrapper) return;
        this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');

        this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

        if (errorMessage) {
          this.errorMessage.textContent = errorMessage;
        }
      }

      toggleSubmitButton(disable = true, text) {
        if (disable) {
          //this.submitButton.setAttribute('disabled', 'disabled');
          if (text) this.submitButtonText.textContent = text;
        } else {
          this.submitButton.removeAttribute('disabled');
          this.submitButtonText.textContent = window.variantStrings.addToCart;
        }
      }

      get variantIdInput() {
        return this.form.querySelector('[name=id]');
      }
    }
  );
}
