;(function( $ ){

	/**
	 * In genereal you should avoid to use jQuery code in AngularJS
	 * apps, if you need any jQuery functionality create a directive
	 * 
	 */
  $(document).ready(function() {

  	$("#fb-login").on("click", function () {
		FB.login(function(response) {
			if (response.authResponse) {
				console.log("FB Login");
			}
		});
	});
    
  });


})( jQuery );