;(function() {


	/**
	 * Place to store API URL or any other constants
	 * Usage:
	 *
	 * Inject CONSTANTS service as a dependency and then use like this:
	 * CONSTANTS.API_URL
	 */
  angular
  	.module('ConnectifyWeb')
    .constant('CONSTANTS', {
      'API_URL': 'http://192.168.0.22:3000/connectifyapi/'
    });


})();
