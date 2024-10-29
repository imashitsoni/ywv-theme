if (!customElements.get("product-info")) {
  customElements.define(
    "product-info",
    class ProductInfo extends HTMLElement {
      quantityInput = undefined;
      quantityForm = undefined;
      onVariantChangeUnsubscriber = undefined;
      cartUpdateUnsubscriber = undefined;
      abortController = undefined;
      pendingRequestUrl = null;
      preProcessHtmlCallbacks = [];
      postProcessHtmlCallbacks = [];

      constructor() {
        super();

        this.quantityInput = this.querySelector(".quantity__input");
        this.hideUnselectedColor();
        this.hideDisabledSizes();
      }

      hideDisabledSizes = () => {
        const container = document.querySelector("variant-selects");
        if( container){
          container.querySelectorAll(".disabled").forEach((element) => {
            element.nextElementSibling.style.display = "none";
          });
        }
      };

      removeClass = () => {
        const listItems = document.querySelectorAll(
            ".product-gallery__item"
          );
        listItems.forEach((li) => {
          li.classList.remove("hide-img");
        });
      };

      checkSelectedStyle= (selectedStyle) => {
        this.removeClass();
        const styleRef = document.querySelector("[data-style-variant-images]");
        const styleRefJson = JSON.parse(styleRef.innerHTML);
        const styleOpts = styleRefJson.styleOpts.split(',');
        const styleImgOpts = styleRefJson.styleImgOpts.split(',');

        const listItems = document.querySelectorAll(
            ".product-gallery__item"
          );
        
        let selectedIndex = 0;
        let x = 0;
        
        styleOpts.forEach((opt) => {
            if(selectedStyle === opt ){
              selectedIndex = x
            }
            x++;
        });
        
        x = 0;
        let display = "none";
        let i = 0;
        listItems.forEach((item) => {
          const img = item.dataset.src;
          if(img.includes(styleImgOpts[selectedIndex])){
            document.querySelector(".product-gallery__featured img").src = item.querySelector("img").src;
            item.classList.add("hide-img");
          }
        });
      }

      checkSelectedColor = (selectedColor) => {
        this.removeClass();
        const colorRef = document.querySelector("[data-color-variant-images]");
        const colorRefJson = JSON.parse(colorRef.innerHTML);
        const colorOpts = colorRefJson.colorsOpts.split(',');
        const colorImgOpts = colorRefJson.colorsImgOpts.split(',');

        const listItems = document.querySelectorAll(
            ".product-gallery__item"
          );
        
        let selectedIndex = 0;
        let x = 0;
        
        colorOpts.forEach((opt) => {
            if(selectedColor === opt ){
              selectedIndex = x;
              console.log('selectedIndex', selectedIndex)
            }
            x++;
        });
        
        x = 0;
        let display = "none";
        let i = 0;
        listItems.forEach((item) => {
          const img = item.dataset.src;
          console.log('img', img);
            if(selectedIndex == 0) {
              console.log('inif')
              if(i == 0) {                
                console.log('in444')
                document.querySelector(".product-gallery__featured img").src = item.querySelector("img").src;
                item.classList.add("hide-img");
              }
              
              if(x==1 ||  img.includes(colorImgOpts[1]) ){      
                console.log('in555')
                item.classList.add("hide-img");
                x=1;
              }
            }else{              
              console.log('inelse')
              if(x==1 || img.includes(colorImgOpts[selectedIndex]) ){                
                console.log('inif11')
                if(img.includes(colorImgOpts[selectedIndex])) {
                  document.querySelector(".product-gallery__featured img").src = item.querySelector("img").src;
                  item.classList.add("hide-img");
                }
                if(colorImgOpts[selectedIndex + 1]){
                  if(img.src.includes(colorImgOpts[selectedIndex + 1])){
                    item.classList.add("hide-img");
                    x=0;
                  }
                }else{
                  x=1;
                }
              }else{
                console.log('inelse11')
                item.classList.add("hide-img");
              }
              console.log('img.src',img.src);
            }
         i++;
        });
      }

      checkSelectedSize= (selectedSize) => {
        this.removeClass();
        const sizeRef = document.querySelector("[data-size-variant-images]");
        const sizeRefJson = JSON.parse(sizeRef.innerHTML);
        const sizeOpts = sizeRefJson.sizeOpts.split(',');
        const sizeImgOpts = sizeRefJson.sizeImgOpts.split(',');

        const listItems = document.querySelectorAll(
            ".product-gallery__item"
          );
        
        let selectedIndex = 0;
        let x = 0;
        
        sizeOpts.forEach((opt) => {
            if(selectedSize === opt ){
              selectedIndex = x
            }
            x++;
        });
        
        x = 0;
        let display = "none";
        let i = 0;
        listItems.forEach((item) => {
          const img = item.dataset.src;
          if(img.includes(sizeImgOpts[selectedIndex])) {
            document.querySelector(".product-gallery__featured img").src = item.querySelector("img").src;
            item.classList.add("hide-img");
          }
        });
      }

      hideUnselectedColor = () => {
        let checkedColorRadio, checkedStyleRadio;
        const colorFieldset = document
          .querySelectorAll(
            "fieldset.js.product-form__input legend.form__label"
          )
          .forEach((element) => {
            
            if (element && element.textContent.trim() === "Style") {
              checkedStyleRadio = element.parentElement.querySelectorAll(
                'input[type="radio"]'
              );
              const checkedStyleRadioChecked = element.parentElement.querySelector(
                'input[type="radio"]:checked'
              );
              if(checkedStyleRadio.length > 1)
                this.checkSelectedStyle(checkedStyleRadioChecked.value);
            }else if (element && element.textContent.includes("Color:")) {
              checkedColorRadio = element.parentElement.querySelectorAll(
                'input[type="radio"]'
              );
              const checkedColorRadioChecked = element.parentElement.querySelector(
                'input[type="radio"]:checked'
              );
              if(checkedColorRadio.length > 1)
                this.checkSelectedColor(checkedColorRadioChecked.value);
            }else if (element && element.textContent.trim() === "Size") {
              const checkedSizeRadio = element.parentElement.querySelectorAll(
                'input[type="radio"]'
              );
              const checkedSizeRadioChecked = element.parentElement.querySelector(
                'input[type="radio"]:checked'
              );
              console.log("checkedColorRadio.length",  )
              if((checkedColorRadio.length < 2 && checkedStyleRadio.length < 2) && checkedSizeRadio.length > 1)
                this.checkSelectedSize(checkedSizeRadioChecked.value);
            }
          });
         initialimagelist();
      };

      connectedCallback() {
        this.initializeProductSwapUtility();

        this.onVariantChangeUnsubscriber = subscribe(
          PUB_SUB_EVENTS.optionValueSelectionChange,
          this.handleOptionValueChange.bind(this)
        );

        this.initQuantityHandlers();
        this.dispatchEvent(
          new CustomEvent("product-info:loaded", { bubbles: true })
        );
      }

      addPreProcessCallback(callback) {
        this.preProcessHtmlCallbacks.push(callback);
      }

      initQuantityHandlers() {
        if (!this.quantityInput) return;

        this.quantityForm = this.querySelector(".product-form__quantity");
        if (!this.quantityForm) return;

        this.setQuantityBoundries();
        if (!this.dataset.originalSection) {
          this.cartUpdateUnsubscriber = subscribe(
            PUB_SUB_EVENTS.cartUpdate,
            this.fetchQuantityRules.bind(this)
          );
        }
      }

      disconnectedCallback() {
        this.onVariantChangeUnsubscriber();
        this.cartUpdateUnsubscriber?.();
      }

      initializeProductSwapUtility() {
        this.preProcessHtmlCallbacks.push((html) =>
          html
            .querySelectorAll(".scroll-trigger")
            .forEach((element) =>
              element.classList.add("scroll-trigger--cancel")
            )
        );
        this.postProcessHtmlCallbacks.push((newNode) => {
          window?.Shopify?.PaymentButton?.init();
          window?.ProductModel?.loadShopifyXR();
        });
      }

      handleOptionValueChange({
        data: { event, target, selectedOptionValues },
      }) {
        if (!this.contains(event.target)) return;

        this.resetProductFormState();

        const productUrl =
          target.dataset.productUrl ||
          this.pendingRequestUrl ||
          this.dataset.url;
        this.pendingRequestUrl = productUrl;
        const shouldSwapProduct = this.dataset.url !== productUrl;
        const shouldFetchFullPage =
          this.dataset.updateUrl === "true" && shouldSwapProduct;

        this.renderProductInfo({
          requestUrl: this.buildRequestUrlWithParams(
            productUrl,
            selectedOptionValues,
            shouldFetchFullPage
          ),
          targetId: target.id,
          callback: shouldSwapProduct
            ? this.handleSwapProduct(productUrl, shouldFetchFullPage)
            : this.handleUpdateProductInfo(productUrl),
        });
      }

      resetProductFormState() {
        const productForm = this.productForm;
        productForm?.toggleSubmitButton(true);
        productForm?.handleErrorMessage();
      }

      handleSwapProduct(productUrl, updateFullPage) {
        return (html) => {
          this.productModal?.remove();

          const selector = updateFullPage
            ? "product-info[id^='MainProduct']"
            : "product-info";
          const variant = this.getSelectedVariant(html.querySelector(selector));
          this.updateURL(productUrl, variant?.id);

          if (updateFullPage) {
            document.querySelector("head title").innerHTML =
              html.querySelector("head title").innerHTML;

            HTMLUpdateUtility.viewTransition(
              document.querySelector("main"),
              html.querySelector("main"),
              this.preProcessHtmlCallbacks,
              this.postProcessHtmlCallbacks
            );
          } else {
            HTMLUpdateUtility.viewTransition(
              this,
              html.querySelector("product-info"),
              this.preProcessHtmlCallbacks,
              this.postProcessHtmlCallbacks
            );
          }
        };
      }

      renderProductInfo({ requestUrl, targetId, callback }) {
        this.abortController?.abort();
        this.abortController = new AbortController();

        fetch(requestUrl, { signal: this.abortController.signal })
          .then((response) => response.text())
          .then((responseText) => {
            this.pendingRequestUrl = null;
            const html = new DOMParser().parseFromString(
              responseText,
              "text/html"
            );
            callback(html);
          })
          .then(() => {
            // set focus to last clicked option value
            document.querySelector(`#${targetId}`)?.focus();
          })
          .catch((error) => {
            if (error.name === "AbortError") {
              console.log("Fetch aborted by user");
            } else {
              console.error(error);
            }
          });
      }

      getSelectedVariant(productInfoNode) {
        const selectedVariant = productInfoNode.querySelector(
          "variant-selects [data-selected-variant]"
        )?.innerHTML;
        return !!selectedVariant ? JSON.parse(selectedVariant) : null;
      }

      buildRequestUrlWithParams(
        url,
        optionValues,
        shouldFetchFullPage = false
      ) {
        const params = [];

        !shouldFetchFullPage && params.push(`section_id=${this.sectionId}`);

        if (optionValues.length) {
          params.push(`option_values=${optionValues.join(",")}`);
        }

        return `${url}?${params.join("&")}`;
      }

      updateOptionValues(html) {
        const variantSelects = html.querySelector("variant-selects");
        if (variantSelects) {
          HTMLUpdateUtility.viewTransition(
            this.variantSelectors,
            variantSelects,
            this.preProcessHtmlCallbacks
          );
          this.hideDisabledSizes();
          this.hideUnselectedColor();

          setTimeout(() => {
            const getItemSizeChecked = document.querySelectorAll( "variant-selects fieldset input.proditemsize:checked" ).length;
            if(getItemSizeChecked == false) {
              let getFirstSizeItem = document.querySelector( "variant-selects fieldset input.sizeselected" );
            
              getFirstSizeItem.addEventListener('click', () => {console.log('radio clicked')});
              getFirstSizeItem.click();
            }
          }, "700");
        }
      }

      handleUpdateProductInfo(productUrl) {
        return (html) => {
          const variant = this.getSelectedVariant(html);

          this.pickupAvailability?.update(variant);
          this.updateOptionValues(html);
          this.updateURL(productUrl, variant?.id);
          this.updateVariantInputs(variant?.id);

          if (!variant) {
            // this.setUnavailable();
            return;
          }

          this.updateMedia(html, variant?.featured_media?.id);

          const updateSourceFromDestination = (
            id,
            shouldHide = (source) => false
          ) => {
            const source = html.getElementById(`${id}-${this.sectionId}`);
            const destination = this.querySelector(
              `#${id}-${this.dataset.section}`
            );
            if (source && destination) {
              destination.innerHTML = source.innerHTML;
              destination.classList.toggle("hidden", shouldHide(source));
            }
          };

          updateSourceFromDestination("price");
          updateSourceFromDestination("Sku", ({ classList }) =>
            classList.contains("hidden")
          );
          updateSourceFromDestination(
            "Inventory",
            ({ innerText }) => innerText === ""
          );
          updateSourceFromDestination("Volume");
          updateSourceFromDestination("Price-Per-Item", ({ classList }) =>
            classList.contains("hidden")
          );

          this.updateQuantityRules(this.sectionId, html);
          this.querySelector(
            `#Quantity-Rules-${this.dataset.section}`
          )?.classList.remove("hidden");
          this.querySelector(
            `#Volume-Note-${this.dataset.section}`
          )?.classList.remove("hidden");

          this.productForm?.toggleSubmitButton(
            html
              .getElementById(`ProductSubmitButton-${this.sectionId}`)
              ?.hasAttribute("disabled") ?? true,
            window.variantStrings.soldOut
          );

          publish(PUB_SUB_EVENTS.variantChange, {
            data: {
              sectionId: this.sectionId,
              html,
              variant,
            },
          });
        };
      }

      updateVariantInputs(variantId) {
        this.querySelectorAll(
          `#product-form-${this.dataset.section}, #product-form-installment-${this.dataset.section}`
        ).forEach((productForm) => {
          const input = productForm.querySelector('input[name="id"]');
          input.value = variantId ?? "";
          input.dispatchEvent(new Event("change", { bubbles: true }));
        });
      }

      updateURL(url, variantId) {
        this.querySelector("share-button")?.updateUrl(
          `${window.shopUrl}${url}${variantId ? `?variant=${variantId}` : ""}`
        );

        if (this.dataset.updateUrl === "false") return;
        window.history.replaceState(
          {},
          "",
          `${url}${variantId ? `?variant=${variantId}` : ""}`
        );
      }

      setUnavailable() {
        this.productForm?.toggleSubmitButton(
          true,
          window.variantStrings.unavailable
        );

        const selectors = [
          "price",
          "Inventory",
          "Sku",
          "Price-Per-Item",
          "Volume-Note",
          "Volume",
          "Quantity-Rules",
        ]
          .map((id) => `#${id}-${this.dataset.section}`)
          .join(", ");
        document
          .querySelectorAll(selectors)
          .forEach(({ classList }) => classList.add("hidden"));
      }

      updateMedia(html, variantFeaturedMediaId) {
        if (!variantFeaturedMediaId) return;

        const mediaGallerySource = this.querySelector("media-gallery ul");
        const mediaGalleryDestination = html.querySelector(`media-gallery ul`);

        const refreshSourceData = () => {
          if (this.hasAttribute("data-zoom-on-hover")) enableZoomOnHover(2);
          const mediaGallerySourceItems = Array.from(
            mediaGallerySource.querySelectorAll("li[data-media-id]")
          );
          const sourceSet = new Set(
            mediaGallerySourceItems.map((item) => item.dataset.mediaId)
          );
          const sourceMap = new Map(
            mediaGallerySourceItems.map((item, index) => [
              item.dataset.mediaId,
              { item, index },
            ])
          );
          return [mediaGallerySourceItems, sourceSet, sourceMap];
        };

        if (mediaGallerySource && mediaGalleryDestination) {
          let [mediaGallerySourceItems, sourceSet, sourceMap] =
            refreshSourceData();
          const mediaGalleryDestinationItems = Array.from(
            mediaGalleryDestination.querySelectorAll("li[data-media-id]")
          );
          const destinationSet = new Set(
            mediaGalleryDestinationItems.map(({ dataset }) => dataset.mediaId)
          );
          let shouldRefresh = false;

          // add items from new data not present in DOM
          for (let i = mediaGalleryDestinationItems.length - 1; i >= 0; i--) {
            if (
              !sourceSet.has(mediaGalleryDestinationItems[i].dataset.mediaId)
            ) {
              mediaGallerySource.prepend(mediaGalleryDestinationItems[i]);
              shouldRefresh = true;
            }
          }

          // remove items from DOM not present in new data
          for (let i = 0; i < mediaGallerySourceItems.length; i++) {
            if (
              !destinationSet.has(mediaGallerySourceItems[i].dataset.mediaId)
            ) {
              mediaGallerySourceItems[i].remove();
              shouldRefresh = true;
            }
          }

          // refresh
          if (shouldRefresh)
            [mediaGallerySourceItems, sourceSet, sourceMap] =
              refreshSourceData();

          // if media galleries don't match, sort to match new data order
          mediaGalleryDestinationItems.forEach(
            (destinationItem, destinationIndex) => {
              const sourceData = sourceMap.get(destinationItem.dataset.mediaId);

              if (sourceData && sourceData.index !== destinationIndex) {
                mediaGallerySource.insertBefore(
                  sourceData.item,
                  mediaGallerySource.querySelector(
                    `li:nth-of-type(${destinationIndex + 1})`
                  )
                );

                // refresh source now that it has been modified
                [mediaGallerySourceItems, sourceSet, sourceMap] =
                  refreshSourceData();
              }
            }
          );
        }

        // set featured media as active in the media gallery
        this.querySelector(`media-gallery`)?.setActiveMedia?.(
          `${this.dataset.section}-${variantFeaturedMediaId}`,
          true
        );

        // update media modal
        const modalContent = this.productModal?.querySelector(
          `.product-media-modal__content`
        );
        const newModalContent = html.querySelector(
          `product-modal .product-media-modal__content`
        );
        if (modalContent && newModalContent)
          modalContent.innerHTML = newModalContent.innerHTML;
      }

      setQuantityBoundries() {
        const data = {
          cartQuantity: this.quantityInput.dataset.cartQuantity
            ? parseInt(this.quantityInput.dataset.cartQuantity)
            : 0,
          min: this.quantityInput.dataset.min
            ? parseInt(this.quantityInput.dataset.min)
            : 1,
          max: this.quantityInput.dataset.max
            ? parseInt(this.quantityInput.dataset.max)
            : null,
          step: this.quantityInput.step ? parseInt(this.quantityInput.step) : 1,
        };

        let min = data.min;
        const max = data.max === null ? data.max : data.max - data.cartQuantity;
        if (max !== null) min = Math.min(min, max);
        if (data.cartQuantity >= data.min) min = Math.min(min, data.step);

        this.quantityInput.min = min;

        if (max) {
          this.quantityInput.max = max;
        } else {
          this.quantityInput.removeAttribute("max");
        }
        this.quantityInput.value = min;

        publish(PUB_SUB_EVENTS.quantityUpdate, undefined);
      }

      fetchQuantityRules() {
        const currentVariantId = this.productForm?.variantIdInput?.value;
        if (!currentVariantId) return;

        this.querySelector(
          ".quantity__rules-cart .loading__spinner"
        ).classList.remove("hidden");
        fetch(
          `${this.dataset.url}?variant=${currentVariantId}&section_id=${this.dataset.section}`
        )
          .then((response) => response.text())
          .then((responseText) => {
            const html = new DOMParser().parseFromString(
              responseText,
              "text/html"
            );
            this.updateQuantityRules(this.dataset.section, html);
          })
          .catch((e) => console.error(e))
          .finally(() =>
            this.querySelector(
              ".quantity__rules-cart .loading__spinner"
            ).classList.add("hidden")
          );
      }

      updateQuantityRules(sectionId, html) {
        if (!this.quantityInput) return;
        this.setQuantityBoundries();

        const quantityFormUpdated = html.getElementById(
          `Quantity-Form-${sectionId}`
        );
        const selectors = [
          ".quantity__input",
          ".quantity__rules",
          ".quantity__label",
        ];
        for (let selector of selectors) {
          const current = this.quantityForm.querySelector(selector);
          const updated = quantityFormUpdated.querySelector(selector);
          if (!current || !updated) continue;
          if (selector === ".quantity__input") {
            const attributes = [
              "data-cart-quantity",
              "data-min",
              "data-max",
              "step",
            ];
            for (let attribute of attributes) {
              const valueUpdated = updated.getAttribute(attribute);
              if (valueUpdated !== null) {
                current.setAttribute(attribute, valueUpdated);
              } else {
                current.removeAttribute(attribute);
              }
            }
          } else {
            current.innerHTML = updated.innerHTML;
          }
        }
      }

      get productForm() {
        return this.querySelector(`product-form`);
      }

      get productModal() {
        return document.querySelector(`#ProductModal-${this.dataset.section}`);
      }

      get pickupAvailability() {
        return this.querySelector(`pickup-availability`);
      }

      get variantSelectors() {
        return this.querySelector("variant-selects");
      }

      get relatedProducts() {
        const relatedProductsSectionId = SectionId.getIdForSection(
          SectionId.parseId(this.sectionId),
          "related-products"
        );
        return document.querySelector(
          `product-recommendations[data-section-id^="${relatedProductsSectionId}"]`
        );
      }

      get quickOrderList() {
        const quickOrderListSectionId = SectionId.getIdForSection(
          SectionId.parseId(this.sectionId),
          "quick_order_list"
        );
        return document.querySelector(
          `quick-order-list[data-id^="${quickOrderListSectionId}"]`
        );
      }

      get sectionId() {
        return this.dataset.originalSection || this.dataset.section;
      }
    }
  );
}

// BOF YWV PRODUCT IMAGE SLIDER SCRIPTS
$(document).ready(function(){
  renderowlbutton();
}); 

var imgindexglobal = -2;
if($(window).width() < 992){
    imgindexglobal = -1;
}

$(document).ready(function(){
    $(".mob-thumb-slider .slider-product-img-carousel").owlCarousel({
    loop:true,
    center:true,
    lazyLoad:true,
    margin:0,
    nav:true,
    navText: ["",""],
    dots: false,
    items: 5,
    responsiveClass:true,
    mouseDrag : false,
    touchDrag : false,
    responsive:{
       0:{
          items:3,
          smartSpeed : 150,
          nav:true
       },
       992:{
          items:5,
          nav:true
       }
    }
  });
    $('.product-img-carousel').owlCarousel({
    loop: true,
    lazyLoad:true,
    nav: true,
    margin: 10,
    dots: true,
    singleItem: true,
    items: 1,
    responsiveClass:true,
    responsive:{
      0:{
        items:1,
        nav:false,
        smartSpeed : 150,
        dots:true,
      },
      500:{
        items:1,
        nav:true,
      }
    }
  });
	
	$('.product-img-carousel .owl-nav').click(function(){
		$(".slider-item").removeClass('active');
		// $(".slider-item").css('opacity',0.7)
		var img_data_id = $('.product-img-carousel .active .item').attr('data-id')
		$(".slider-item").each(function(){
			if($(this).attr('data-id') == img_data_id){ 
				$(this).addClass('active');
			} 
		});
	});
	
	$(document).on('click','.slider-item',function(){
		$(".slider-item").removeClass("active");
		var img_data_id = $(this).attr('data-id');
		$(".slider-item").each(function(){
			if($(this).attr('data-id') == img_data_id){ 
				$(this).addClass('active');
			} 
		})
		var imgindex = 0;
        $(".product-img-carousel .owl-item:not(.cloned) .item").each(function(){
			var dataid = $(this).attr("data-id");
			if(dataid == img_data_id){
				$('.product-img-carousel').trigger('to.owl.carousel', imgindex);
				return false;
			} 
			imgindex++;
		});
	});
	$(document).on('click','.closeproduct',function(){
		$('.product-popup').hide();
	});
	$(document).on('click','.prodimg',function(){
		$('.product-popup').css('display', 'flex');
	});
	
	$('.product-img-carousel .owl-nav').click(function(){
    $(".slider-item").removeClass('active');
    // $(".slider-item").css('opacity',0.7)
    var img_data_id = $('.product-img-carousel .active .item').attr('data-id')
    $(".slider-item").each(function(){
       if($(this).attr('data-id') == img_data_id){ 
          $(this).addClass('active');
       } 
    });
  });

  //BOF ACCORDION PRODUCT DESCRIPTION
  const prodAccordion = document.querySelector("[data-product-accordion]");
  const prodDescription = JSON.parse(prodAccordion.innerHTML);
  const prodDescOptions = prodDescription.description.split("<!-- split -->");

  let prodacc = 0;
  let prdDisplayDesc = "";
  prodDescOptions.forEach((option) => {
    let xprod = prodacc % 2;

    if (xprod == 0) {
      if (option.trim() == "REVIEWS") {
      } else {
        prdDisplayDesc += `<button class="btnaccordion">${option}</button>`;
      }
    } else {
      prdDisplayDesc += `<div class="panel">${option}</div>`;
    }
    prodacc++;
  });

  prdDisplayDesc += `<a href="#ywv-reviews" class="btnaccordion">Reviews</a>`;
  document.querySelector("#ywvaccordion").innerHTML = prdDisplayDesc;

  
  var ywvprodaccordion = document.getElementsByClassName("btnaccordion");
  for (var i = 0; i < ywvprodaccordion.length; i++) {
    ywvprodaccordion[i].addEventListener("click", function() {
    var panel = this.nextElementSibling;
    var paneltitle = this; 

    if(paneltitle.classList.contains("active")) {
        paneltitle.classList.remove("active");
    }

    if (panel.style.maxHeight){
        panel.style.maxHeight = null;
    } else {
        let active = document.querySelectorAll("#ywvaccordion .btnaccordion.active");
        for(let j = 0; j < active.length; j++){
          active[j].classList.remove("active");
          active[j].nextElementSibling.style.maxHeight = null;
        }
        this.classList.toggle("active");
        panel.style.maxHeight = panel.scrollHeight + "px";
    }
    });
  }
  //EOF ACCORDION PRODUCT DESCRIPTION
});

function initialimagelist(){
  let optwhitedisplay = "";
  let mobthumbisplay = "";
  const featuredimg = document.querySelectorAll(".product-gallery__featured img");
  const imglist = document.querySelectorAll(".product-gallery__grid div:not(.hide-img) img");

  featuredimg.forEach((element) => {
    let imgsrc = element.getAttribute("src");
    let imgid = element.getAttribute("data-id");
    optwhitedisplay += '<div class="item" data-id="'+imgid+'">';
    optwhitedisplay += '<img src="'+imgsrc+'">';
    optwhitedisplay += "</div>";

    mobthumbisplay += '<div  class="all_image_manage slider-item active" data-id="'+imgid+'">';
    mobthumbisplay += '<img src="'+imgsrc+'" class="prodimg owl-lazy">';
    mobthumbisplay += "</div>";
  });

  imglist.forEach((element) => {
    let imgsrc = element.getAttribute("src");
    let imgid = element.getAttribute("data-id");
    optwhitedisplay += '<div class="item" data-id="'+imgid+'">';
    optwhitedisplay += '<img src="'+imgsrc+'">';
    optwhitedisplay += "</div>";

    mobthumbisplay += '<div  class="all_image_manage slider-item active" data-id="'+imgid+'">';
    mobthumbisplay += '<img src="'+imgsrc+'" class="prodimg owl-lazy">';
    mobthumbisplay += "</div>";
  });
  
  console.log("optwhitedisplay :: ", optwhitedisplay);
  
  document.getElementById('optowlimageitemlist').innerHTML = optwhitedisplay;
  document.getElementById('moboptowlimageitemlist').innerHTML = optwhitedisplay;
  document.getElementById('moboptowlimageitemlistthumb').innerHTML = mobthumbisplay;

  var optowlimageitemlist = $('#optowlimageitemlist');
  optowlimageitemlist.trigger('destroy.owl.carousel');
  optowlimageitemlist.html(optowlimageitemlist.find('.owl-stage-outer').html()).removeClass('owl-loaded');
  optowlimageitemlist.owlCarousel({
      loop: true,
      lazyLoad:true,
      nav: true,
      margin: 10,
      dots: true,
      singleItem: true,
      items: 1,
      responsiveClass:true,
      responsive:{
        0:{
          items:1,
          nav:false,
          smartSpeed : 150,
          dots:true,
        },
        500:{
          items:1,
          nav:true,
        }
      }
  });

  var moboptowlimageitemlist = $('#moboptowlimageitemlist');
  moboptowlimageitemlist.trigger('destroy.owl.carousel');
  moboptowlimageitemlist.html(moboptowlimageitemlist.find('.owl-stage-outer').html()).removeClass('owl-loaded');
  moboptowlimageitemlist.owlCarousel({
      loop: true,
      lazyLoad:true,
      nav: true,
      margin: 10,
      dots: true,
      singleItem: true,
      items: 1,
      responsiveClass:true,
      responsive:{
        0:{
          items:1,
          nav:false,
          smartSpeed : 150,
          dots:true,
        },
        500:{
          items:1,
          nav:true,
        }
      }
  });
  
  var $owlthumb = $('.mob-thumb-slider .slider-product-img-carousel');
  $owlthumb.trigger('destroy.owl.carousel');
  $owlthumb.html($owlthumb.find('.owl-stage-outer').html()).removeClass('owl-loaded');
  $owlthumb.owlCarousel({
    loop:true,
    center:true,
    lazyLoad:true,
    margin:0,
    nav:true,
    navText: ["",""],
    dots: false,
    items: 5,
    responsiveClass:true,
    mouseDrag : false,
    touchDrag : false,
    responsive:{
       0:{
          items:3,
          smartSpeed : 150,
          nav:true
       },
       992:{
          items:5,
          nav:true
       }
    }
  });

  renderowlbutton();

}

function renderowlbutton () {
  setTimeout(function(){
    $(".carouselsmall_2 .owl-nav button").click(function(){   
          setTimeout(function(){                        
          $(".slider-item").removeClass('active');
          var img_data_id ;
          var count = 0;
          $(".carouselsmall_2 .active .slider-item").each(function(){
              if(count == -imgindexglobal){ 
              img_data_id = $(this).attr('data-id')
                $(this).addClass("active");
                return false;
              } 
              count++;
          });
        
        var slider_active_id = $(".carouselsmall_2 .slider-item.active").attr('data-id');
          var imgindex1 = 0;
          $(".carousel_2 .owl-item:not(.cloned) .item").each(function(){
          var dataid = $(this).attr("data-id");
          if(slider_active_id == dataid){
              $(".carousel_2").trigger('to.owl.carousel', imgindex1);
              return false;
          } 
          imgindex1++;
          }); 

          }, 0);                     
    });
    $('.carousel_2').on('dragged.owl.carousel', function(event){
          setTimeout(function(){     
              $(".carouselsmall_2 .owl-item:not(.cloned) .slider-item").removeClass('active');
              var img_data_id = $('.carousel_2 .owl-item.active .item').attr('data-id');
              var imgindex1 = 0;
              $(".carouselsmall_2 .owl-item:not(.cloned) .slider-item").each(function(){
                if($(this).attr('data-id') == img_data_id){ 
                      $(this).addClass("active");
                      $(".carouselsmall_2").trigger('to.owl.carousel', imgindex1);
                      return false;                            
                } 
                imgindex1++;
              });
          }, 0);  
    });
    $(document).on('click','.carouselsmall_2 .slider-item',function(){
              setTimeout(function(){     
                $(".carouselsmall_2 .owl-item:not(.cloned) .slider-item").removeClass('active');
                var img_data_id = $('.carousel_2 .owl-item.active .item').attr('data-id');
                var imgindex1 = 0;
                $(".carouselsmall_2 .owl-item:not(.cloned) .slider-item").each(function(){
                    if($(this).attr('data-id') == img_data_id){ 
                          $(this).addClass("active");
                          $(".carouselsmall_2").trigger('to.owl.carousel', imgindex1);
                          return false;                            
                    } 
                    imgindex1++;
                });
              }, 0);  
        });
  }, 500);

  setTimeout(function(){
    $('.product-page-wrapper').removeAttr('style');
  }, 60);

  if($(window).width() < 991){
      $(".slider-product-img-carousel").addClass('owl-carousel owl-theme');
      $('#myBtn').click(function() {
        $(".optionproduct-wrapper").addClass('remove-section');
      });
  }
}
// EOF YWV PRODUCT IMAGE SLIDER SCRIPTS
