!function(){function e(e,o,t,r){o.html5Mode(!1),e.when("/",{templateUrl:"views/login.html",controller:"LoginController",controllerAs:"login"}).when("/register",{templateUrl:"views/register.html",controller:"RegisterController",controllerAs:"register"}).when("/manage-profile",{templateUrl:"views/profile.html",controller:"ManageProfileController",controllerAs:"manage_profile"}).otherwise({redirectTo:"/"}),t.interceptors.push("authInterceptor")}function o(e,o,t,r){return{request:function(e){return e.headers=e.headers||{},e},responseError:function(e){return 404===e.status?(r.path("/"),o.reject(e)):o.reject(e)}}}function t(e,o){!function(e,o,t){var r,n=e.getElementsByTagName(o)[0];e.getElementById(t)||(r=e.createElement(o),r.id=t,r.src="//connect.facebook.net/en_US/sdk.js",n.parentNode.insertBefore(r,n))}(document,"script","facebook-jssdk")}angular.module("ConnectifyWeb",["ngRoute"]).config(e),e.$inject=["$routeProvider","$locationProvider","$httpProvider","$compileProvider"],angular.module("ConnectifyWeb").factory("authInterceptor",o),o.$inject=["$rootScope","$q","LocalStorage","$location"],angular.module("ConnectifyWeb").filter("to_trusted",["$sce",function(e){return function(o){return e.trustAsHtml(o)}}]),angular.module("ConnectifyWeb").run(t),t.$inject=["$rootScope","$location"]}(),function(){angular.module("ConnectifyWeb").constant("CONSTANTS",{API_URL:"http://192.168.0.14:3000/connectifyapi/"})}(),function(){function e(e,o,t){var r=this;return r.getUserInfo=function(){var e=t.defer();return FB.api("/me",function(o){!o||o.error?e.reject("Error occured"):e.resolve(o)}),e.promise},r.watchLoginChange=function(){FB.Event.subscribe("auth.authResponseChange",function(e){"connected"===e.status?console.log("User is connected."):o.url("/login")})},r.logout=function(){FB.logout(function(o){e.$apply(function(){e.user={}})})},r}angular.module("ConnectifyWeb").factory("FacebookService",e),e.$inject=["$rootScope","$location","$q"]}(),function(){function e(e,o){var t=this,r=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var o=16*Math.random()|0,t="x"==e?o:3&o|8;return t.toString(16)})},n=null,i=0,c=null;e.exists()?(n=e.get("visitor_id"),i=e.get("visit_count"),c=e.get("user_rating"),n?(e.update("visit_count",++i),navigator.geolocation.getCurrentPosition(function(o){e.update("latitude",o.coords.latitude),e.update("longitude",o.coords.longitude)})):(e.set("visitor_id",r()),e.set("visit_count",1),navigator.geolocation.getCurrentPosition(function(o){e.set("latitude",o.coords.latitude),e.set("longitude",o.coords.longitude)}))):(n=Cookies.get("visitor_id"),i=Cookies.get("visit_count"),c=Cookies.get("user_rating"),n||Cookies.set("visitor_id",r(),{expires:365}),Cookies.set("visit_count",++i,{expires:365}),navigator.geolocation.getCurrentPosition(function(e){Cookies.set("latitude",e.coords.latitude,{expires:365}),Cookies.set("longitude",e.coords.longitude,{expires:365})})),o.query("GET","hello",{},{}).then(function(e){t.ovocie=e.data,console.log("Hello response: ",t.ovocie)})}function o(e,o,t){o.user={},t.fbAsyncInit=function(){FB.init({appId:"1628447944135801",status:!0,cookie:!0,xfbml:!0,version:"v2.6"}),e.watchLoginChange()}}function t(e,o,t,r){o.passwordError="",o.user={password:"",passwordConfirm:""},o.canRegister="",o.checkMatch=function(){o.user.password!=o.user.passwordConfirm?o.passwordError="Passwords don't match...":(o.passwordError="Passwords match !",e.userVerified?o.canRegister="checked":(o.canRegister="",e.verifiedStatus="Your phone number has not been verified. Please click 'Send Code' to send verification code your number !"))},o.registerUser=function(){var t=e.fullNumber,n=o.user.password;r.query("POST","register",{},{phoneNumber:t,password:n}).then(function(e){self.ovocie=e.data;var t=self.ovocie.result;"ok"==t?o.registrationStatus="You have been registered !":o.registrationStatus="Oops ! We were not able to register you. Please try again..."})}}function r(e,o){}angular.module("ConnectifyWeb").controller("MainController",e),e.$inject=["LocalStorage","QueryService"],angular.module("ConnectifyWeb").controller("LoginController",o),o.$inject=["FacebookService","$rootScope","$window"],angular.module("ConnectifyWeb").controller("RegisterController",t),t.$inject=["$rootScope","$scope","$window","QueryService"],angular.module("ConnectifyWeb").controller("ManageProfileController",r),r.$inject=["$rootScope","$window"]}();