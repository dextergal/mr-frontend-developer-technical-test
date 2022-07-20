
$(document).ready(function(){
    $('.mycart-btn').click( function(){
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
        }   
    });
    $(document).on("click", ".color-option input", function () {
        $('.color-option input').removeClass('selected-option');
        $(this).addClass('selected-option');
    });
    $('.add-cart').click( function(){
        if (!$("input[name='size']:checked").val()) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please select size!',
            })
         }
    });
    displayData();
});

function displayData(){
    $.getJSON( "https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product", function( data ) {
        $('.img-holder img').attr('src',data.imageURL);
        $('.img-holder').prepend('<img id="fimg" src="'+ data.imageURL +'" alt="++" />')
        $('.prod-title').text(data.title);
        $('.price span').text(data.price.toFixed(2));
        $('.des').text(data.description);

        var items = [];
        $.each( data.sizeOptions, function( key, val ) { 
          items.push( "<label><input name='size' id='option-" + key + "' class=' size' type='radio' value='" + val.label + "'><span>" + val.label + "</span></label>" );
        });
        $(".color-option").append(items);
    });
}


let addToCartButtons = document.getElementsByClassName('add-cart')
let cartContainer = document.getElementsByClassName('item-holder')[0]

for(let i = 0; i < addToCartButtons.length; i++){
    addToCartButtons[i].addEventListener('click', addToCart)
    
}

function addToCart(event){
    let itemContainer = document.createElement('div')
    let btn = event.target
    let prodDetails = btn.parentElement.parentElement
    let title = prodDetails.getElementsByClassName('prod-title')[0].innerText
    let price = prodDetails.getElementsByClassName('price')[0].innerText
    let imgSrc = prodDetails.getElementsByClassName('f-img')[0].src
    let size = prodDetails.getElementsByClassName('selected-option')[0].value
    var count_prod = $('.cart-items .qty').val();
    $('.mycart-btn .counter').text(count_prod);
    var total_qty = 1;
    $('.cart-items .qty').each(function() {
        total_qty += Number($(this).text());
    });
    $('.mycart-btn .counter').text(total_qty);

    itemContainer.innerHTML = `
    <div >
        <img src="${imgSrc}" class="classic-tee" alt="classic-tee">
    </div>
    <div>
        <div class="prod-name">${title}</div>
        <div><span class="qty">1</span>X<span class="price">${price}</span></div>
        <div class="size">Size: <span class="option">${size}</span></div>
    </div>`

    cartContainer.append(itemContainer)
   
}
