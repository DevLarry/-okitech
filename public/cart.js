$(function () {
	var goToCartIcon = function ($addTocartBtn) {
		// var $cartIcon = $(".my-cart-icon");
		// var $image = $(
		//   '<img width="30px" height="30px" src="' +
		//     $addTocartBtn.data("image") +
		//     '"/>'
		// ).css({ position: "fixed", "z-index": "999" });
		// $addTocartBtn.prepend($image);
		// var position = $cartIcon.position();
		// $image.animate(
		//   {
		//     top: position.top,
		//     left: position.left,
		//   },
		//   500,
		//   "linear",
		//   function () {
		//     $image.remove();
		//   }
		// );
	};

	$(".my-cart-btn").myCart({
		currencySymbol: "N",
		classCartIcon: "my-cart-icon",
		classCartBadge: "my-cart-badge",
		classProductQuantity: "my-product-quantity",
		classProductRemove: "my-product-remove",
		classCheckoutCart: "my-cart-checkout",
		affixCartIcon: true,
		showCheckoutModal: true,
		numberOfDecimals: 2,
		cartItems: [],
		clickOnAddToCart: function ($addTocart) {
			goToCartIcon($addTocart);
		},
		afterAddOnCart: function (products, totalPrice, totalQuantity) {
			//   console.log("afterAddOnCart", products, totalPrice, totalQuantity);
		},
		clickOnCartIcon: function ($cartIcon, products, totalPrice, totalQuantity) {
			//   console.log(
			//     "cart icon clicked",
			//     $cartIcon,
			//     products,
			//     totalPrice,
			//     totalQuantity
			//   );
		},
		checkoutCart: function (products, totalPrice, totalQuantity) {
			makePayment(
				"Tiamiyu Samad Olanrewaju",
				"olasadisam@mall.com",
				"2348105847723",
				totalPrice
			);

			//   console.log("checking out", products, totalPrice, totalQuantity);
		},
		getDiscountPrice: function (products, totalPrice, totalQuantity) {
			//   console.log("calculating discount", products, totalPrice, totalQuantity);
			return totalPrice * 1;
		},
	});

	$("#addNewProduct").click(function (event) {
		var currentElementNo = $(".row").children().length + 1;
		$(".row").append(
			'<div class="col-md-3 text-center"><img src="images/img_empty.png" width="150px" height="150px"><br>product ' +
				currentElementNo +
				" - <strong>$" +
				currentElementNo +
				'</strong><br><button class="btn btn-danger my-cart-btn" data-id="' +
				currentElementNo +
				'" data-name="product ' +
				currentElementNo +
				'" data-summary="summary ' +
				currentElementNo +
				'" data-price="' +
				currentElementNo +
				'" data-quantity="1" data-image="images/img_empty.png">Add to Cart</button><a href="#" class="btn btn-info">Details</a></div>'
		);
	});
});

function makePayment(name, email, num, price) {
	FlutterwaveCheckout({
		public_key: "FLWPUBK-a948bd7059a9d0f25b89dccb6f398f04-X",
		tx_ref: "RX1",
		amount: price,
		currency: "NGN",
		country: "NG",
		payment_options: "card, banktransfer, ussd",
		meta: {
			consumer_id: 0,
			consumer_mac: "",
		},
		customer: {
			email: email,
			phone_number: num,
			name,
		},
		callback: function (data) {
			// var res = JSON.parse(data);
			return (window.location =
				"http://" + window.location.host + "/verify?id=" + data.transaction_id);
		},
		onclose: () => {
			alert("Payment Cancelled!");
			document.write("Transaction terminated!");
		},
		customizations: {
			title: "Eazy Access",
			description: "Transport booking fee",
			logo: "https://transport.eazyaccess.com.ng/favicon.ico",
		},
	});
}
// makePayment();
