class CartRemoveButton extends HTMLElement {
  constructor() {
    super();

    this.addEventListener('click', (event) => {
      event.preventDefault();
      const cartItems = this.closest('cart-items') || this.closest('cart-drawer-items');
      cartItems.updateQuantity(this.dataset.index, 0);
    });

    // custom safegaurd script start
    setTimeout(function(){
      // console.log('in snippet drawer');
      // return false;
      let safeguardPriceCheckbox = document.querySelector('.checkbox-content input.check-box').getAttribute('data-variant-price');
      // console.log('safeguardPriceCheckbox', safeguardPriceCheckbox);
      
      let checkBox = document.querySelector(".check-box");
      let safeguardBox = document.querySelector(".shipping-guard");
      let crossNew = document.querySelector(".guard-cross");
    
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
      if(crossNew){
        crossNew.addEventListener('click', async function(){
          
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


      function clearCart() {
        fetch(window.Shopify.routes.root + 'cart/clear.js')
                  .then(response => response.json())
                  .then(data => {               
                    // console.log('Cart clear repsonse', data);
                    location.reload();
                  });
      }

      
      async function check_If_Only_SS_And_FreeSticker_Are_In_Cart(){
        
        await fetch(window.Shopify.routes.root + 'cart.js')
                  .then(response => response.json())
                  .then(data => {               
                    // console.log('Cart Response after remove', data);
                    let SS_Exist = false;
                    let FS_Exist = false;
                    let items = data.items;
                    let itemsCount = data.item_count;
                    items.forEach(function(itemEle){
                      let itemTitle = itemEle.title;
                      // if(itemTitle.includes('Safeguard') || itemTitle.includes('Stickers')){
                      //   if(itemTitle.includes('Safeguard') && itemsCount == 1 ){
                      //     clearCart();
                      //   } 
                      //   if(itemTitle.includes('Safeguard') && itemsCount == 2 ){
                      //     clearCart();
                      //   }
                      //   if(itemTitle.includes('Stickers') && itemsCount == 2 ){
                      //     clearCart();
                      //   }
                      //   if(itemTitle.includes('Stickers') && itemsCount == 2 ){
                      //     clearCart();
                      //   }
                      // }   
                      if (['Safeguard', 'Stickers'].some(item => itemTitle.includes(item))) {
                          if ((itemTitle.includes('Safeguard') && itemsCount <= 2) || (itemTitle.includes('Stickers') && itemsCount <= 2)) {
                              clearCart();
                          }
                      }
                    });
                    // return cartTotalPrice;
                  });
        
      }
      check_If_Only_SS_And_FreeSticker_Are_In_Cart();
      
    }, 1000);
    // custom safegaurd script ends
    
  }
}

customElements.define('cart-remove-button', CartRemoveButton);

class CartItems extends HTMLElement {
  constructor() {
    super();
    this.lineItemStatusElement =
      document.getElementById('shopping-cart-line-item-status') || document.getElementById('CartDrawer-LineItemStatus');

    const debouncedOnChange = debounce((event) => {
      this.onChange(event);
    }, ON_CHANGE_DEBOUNCE_TIMER);

    this.addEventListener('change', debouncedOnChange.bind(this));
  }

  cartUpdateUnsubscriber = undefined;

  connectedCallback() {
    this.cartUpdateUnsubscriber = subscribe(PUB_SUB_EVENTS.cartUpdate, (event) => {
      if (event.source === 'cart-items') {
        return;
      }
      this.onCartUpdate();
    });
  }

  disconnectedCallback() {
    if (this.cartUpdateUnsubscriber) {
      this.cartUpdateUnsubscriber();
    }
  }

  resetQuantityInput(id) {
    const input = this.querySelector(`#Quantity-${id}`);
    input.value = input.getAttribute('value');
    this.isEnterPressed = false;
  }

  setValidity(event, index, message) {
    event.target.setCustomValidity(message);
    event.target.reportValidity();
    this.resetQuantityInput(index);
    event.target.select();
  }

  validateQuantity(event) {
    const inputValue = parseInt(event.target.value);
    const index = event.target.dataset.index;
    let message = '';

    if (inputValue < event.target.dataset.min) {
      message = window.quickOrderListStrings.min_error.replace('[min]', event.target.dataset.min);
    } else if (inputValue > parseInt(event.target.max)) {
      message = window.quickOrderListStrings.max_error.replace('[max]', event.target.max);
    } else if (inputValue % parseInt(event.target.step) !== 0) {
      message = window.quickOrderListStrings.step_error.replace('[step]', event.target.step);
    }

    if (message) {
      this.setValidity(event, index, message);
    } else {
      event.target.setCustomValidity('');
      event.target.reportValidity();
      this.updateQuantity(
        index,
        inputValue,
        document.activeElement.getAttribute('name'),
        event.target.dataset.quantityVariantId
      );
    }
  }

  onChange(event) {
    this.validateQuantity(event);
  }

  onCartUpdate() {
    if (this.tagName === 'CART-DRAWER-ITEMS') {
      fetch(`${routes.cart_url}?section_id=cart-drawer`)
        .then((response) => response.text())
        .then((responseText) => {
          const html = new DOMParser().parseFromString(responseText, 'text/html');
          const selectors = ['cart-drawer-items', '.cart-drawer__footer'];
          for (const selector of selectors) {
            const targetElement = document.querySelector(selector);
            const sourceElement = html.querySelector(selector);
            if (targetElement && sourceElement) {
              targetElement.replaceWith(sourceElement);
            }
          }
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      fetch(`${routes.cart_url}?section_id=main-cart-items`)
        .then((response) => response.text())
        .then((responseText) => {
          const html = new DOMParser().parseFromString(responseText, 'text/html');
          const sourceQty = html.querySelector('cart-items');
          this.innerHTML = sourceQty.innerHTML;
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }

  getSectionsToRender() {
    return [
      {
        id: 'main-cart-items',
        section: document.getElementById('main-cart-items').dataset.id,
        selector: '.js-contents',
      },
      {
        id: 'cart-icon-bubble',
        section: 'cart-icon-bubble',
        selector: '.shopify-section',
      },
      {
        id: 'cart-live-region-text',
        section: 'cart-live-region-text',
        selector: '.shopify-section',
      },
      {
        id: 'main-cart-footer',
        section: document.getElementById('main-cart-footer').dataset.id,
        selector: '.js-contents',
      },
    ];
  }

  updateQuantity(line, quantity, name, variantId) {
    this.enableLoading(line);

    const body = JSON.stringify({
      line,
      quantity,
      sections: this.getSectionsToRender().map((section) => section.section),
      sections_url: window.location.pathname,
    });

    fetch(`${routes.cart_change_url}`, { ...fetchConfig(), ...{ body } })
      .then((response) => {
        return response.text();
      })
      .then((state) => {
        const parsedState = JSON.parse(state);
        const quantityElement =
          document.getElementById(`Quantity-${line}`) || document.getElementById(`Drawer-quantity-${line}`);
        const items = document.querySelectorAll('.cart-item');

        if (parsedState.errors) {
          quantityElement.value = quantityElement.getAttribute('value');
          this.updateLiveRegions(line, parsedState.errors);
          return;
        }

        this.classList.toggle('is-empty', parsedState.item_count === 0);
        const cartDrawerWrapper = document.querySelector('cart-drawer');
        const cartFooter = document.getElementById('main-cart-footer');

        if (cartFooter) cartFooter.classList.toggle('is-empty', parsedState.item_count === 0);
        if (cartDrawerWrapper) cartDrawerWrapper.classList.toggle('is-empty', parsedState.item_count === 0);

        this.getSectionsToRender().forEach((section) => {
          const elementToReplace =
            document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);
          elementToReplace.innerHTML = this.getSectionInnerHTML(
            parsedState.sections[section.section],
            section.selector
          );
        });
        const updatedValue = parsedState.items[line - 1] ? parsedState.items[line - 1].quantity : undefined;
        let message = '';
        if (items.length === parsedState.items.length && updatedValue !== parseInt(quantityElement.value)) {
          if (typeof updatedValue === 'undefined') {
            message = window.cartStrings.error;
          } else {
            message = window.cartStrings.quantityError.replace('[quantity]', updatedValue);
          }
        }
        this.updateLiveRegions(line, message);

        const lineItem =
          document.getElementById(`CartItem-${line}`) || document.getElementById(`CartDrawer-Item-${line}`);
        if (lineItem && lineItem.querySelector(`[name="${name}"]`)) {
          cartDrawerWrapper
            ? trapFocus(cartDrawerWrapper, lineItem.querySelector(`[name="${name}"]`))
            : lineItem.querySelector(`[name="${name}"]`).focus();
        } else if (parsedState.item_count === 0 && cartDrawerWrapper) {
          trapFocus(cartDrawerWrapper.querySelector('.drawer__inner-empty'), cartDrawerWrapper.querySelector('a'));
        } else if (document.querySelector('.cart-item') && cartDrawerWrapper) {
          trapFocus(cartDrawerWrapper, document.querySelector('.cart-item__name'));
        }

        publish(PUB_SUB_EVENTS.cartUpdate, { source: 'cart-items', cartData: parsedState, variantId: variantId });
      })
      .catch(() => {
        this.querySelectorAll('.loading__spinner').forEach((overlay) => overlay.classList.add('hidden'));
        const errors = document.getElementById('cart-errors') || document.getElementById('CartDrawer-CartErrors');
        errors.textContent = window.cartStrings.error;
      })
      .finally(() => {
        this.disableLoading(line);
      });
  }

  updateLiveRegions(line, message) {
    const lineItemError =
      document.getElementById(`Line-item-error-${line}`) || document.getElementById(`CartDrawer-LineItemError-${line}`);
    if (lineItemError) lineItemError.querySelector('.cart-item__error-text').innerHTML = message;

    this.lineItemStatusElement.setAttribute('aria-hidden', true);

    const cartStatus =
      document.getElementById('cart-live-region-text') || document.getElementById('CartDrawer-LiveRegionText');
    cartStatus.setAttribute('aria-hidden', false);

    setTimeout(() => {
      cartStatus.setAttribute('aria-hidden', true);
    }, 1000);
  }

  getSectionInnerHTML(html, selector) {
    return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;
  }

  enableLoading(line) {
    const mainCartItems = document.getElementById('main-cart-items') || document.getElementById('CartDrawer-CartItems');
    mainCartItems.classList.add('cart__items--disabled');

    const cartItemElements = this.querySelectorAll(`#CartItem-${line} .loading__spinner`);
    const cartDrawerItemElements = this.querySelectorAll(`#CartDrawer-Item-${line} .loading__spinner`);

    [...cartItemElements, ...cartDrawerItemElements].forEach((overlay) => overlay.classList.remove('hidden'));

    document.activeElement.blur();
    this.lineItemStatusElement.setAttribute('aria-hidden', false);
  }

  disableLoading(line) {
    const mainCartItems = document.getElementById('main-cart-items') || document.getElementById('CartDrawer-CartItems');
    mainCartItems.classList.remove('cart__items--disabled');

    const cartItemElements = this.querySelectorAll(`#CartItem-${line} .loading__spinner`);
    const cartDrawerItemElements = this.querySelectorAll(`#CartDrawer-Item-${line} .loading__spinner`);

    cartItemElements.forEach((overlay) => overlay.classList.add('hidden'));
    cartDrawerItemElements.forEach((overlay) => overlay.classList.add('hidden'));
  }
}

customElements.define('cart-items', CartItems);

if (!customElements.get('cart-note')) {
  customElements.define(
    'cart-note',
    class CartNote extends HTMLElement {
      constructor() {
        super();

        this.addEventListener(
          'input',
          debounce((event) => {
            const body = JSON.stringify({ note: event.target.value });
            fetch(`${routes.cart_update_url}`, { ...fetchConfig(), ...{ body } });
          }, ON_CHANGE_DEBOUNCE_TIMER)
        );
      }
    }
  );
}
