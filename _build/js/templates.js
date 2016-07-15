angular.module("ConnectifyWeb").run(["$templateCache", function($templateCache) {$templateCache.put("index.html","<!doctype html><html lang=en ng-csp ng-app=ConnectifyWeb><head><base href=#><meta charset=utf-8><meta http-equiv=x-ua-compatible content=\"ie=edge\"><title>Connectify</title><meta name=description content=\"Social Networking app - Connectify\"><meta name=HandheldFriendly content=True><meta name=MobileOptimized content=320><meta name=viewport content=\"width=device-width, initial-scale=1.0\"><link rel=\"shortcut icon\" type=image/x-icon href=images/favicon.ico><meta name=msapplication-TileColor content=#f01d4f><link href=styles/bootstrap.min.css rel=stylesheet><link href=styles/main.min.css rel=stylesheet><link href=styles/font-awesome.min.css rel=stylesheet></head><body><main-nav></main-nav><div data-ng-view></div><div id=fb-root></div><main-footer></main-footer></body><script type=text/javascript src=js/nonangular/jquery-1.11.2.min.js></script><script type=text/javascript src=js/nonangular/lodash.min.js></script><script type=text/javascript src=js/nonangular/smoothscroll.js></script><script type=text/javascript src=js/nonangular/Chart.js></script><script type=text/javascript src=js/nonangular/bootstrap.js></script><script type=text/javascript src=js/nonangular/js.cookie.js></script><script type=text/javascript src=bower_components/angular/angular.js></script><script type=text/javascript src=bower_components/angular-route/angular-route.js></script><script type=text/javascript src=bower_components/angular-sanitize/angular-sanitize.js></script><script type=text/javascript src=js/scripts.js></script><script type=text/javascript src=app/app.js></script><script type=text/javascript src=app/config.js></script><script type=text/javascript src=app/factory.js></script><script type=text/javascript src=app/controller.js></script><script type=text/javascript src=components/services/LocalStorage.service.js></script><script type=text/javascript src=components/services/queryService.service.js></script><script type=text/javascript src=components/directives/main.nav.directive.js></script><script type=text/javascript src=components/directives/responsive.nav.directive.js></script><script type=text/javascript src=components/directives/code.verify.directive.js></script><script type=text/javascript src=components/directives/main.footer.directive.js></script></html>");
$templateCache.put("views/404.html","<div class=text-center><h4>Page Not Found</h4><h1>404</h1></div>");
$templateCache.put("views/login.html","<div class=container-fuild><div class=row><div class=col-lg-4></div><div class=col-lg-4><div class=row><div class=col-lg-2></div><div class=col-lg-8><form><div class=form-group><label for=phone-number>Phone Number</label> <input type=tel class=form-control id=phone-number placeholder=\"Enter your phone number\"></div><div class=form-group><label for=password>Password</label> <input type=password class=form-control id=password placeholder=\"Enter your password\"></div><div class=form-group><label for=register><p class=help-block>Don\'t have an account ?</p></label> <a href=#/register>Register</a></div><div class=form-group><button type=submit class=\"btn btn-primary btn-login\">login</button></div></form></div><div class=col-lg-2></div></div><div class=row><div class=col-lg-2></div><div class=col-lg-8><hr></div><div class=col-lg-2></div></div><div class=row><div class=col-lg-2></div><div class=col-lg-8><div class=row><div class=col-lg-6><div id=fb-login class=custom-fb-login-img>Facebook Login</div></div><div class=col-lg-6></div></div></div><div class=col-lg-2></div></div></div><div class=col-lg-4></div></div></div>");
$templateCache.put("views/profile.html","<section><div class=container-fluid><div class=row><div class=col-lg-4></div><div class=col-lg-4><div class=page-header><h3>Manage Profile</h3></div></div><div class=col-lg-4></div></div><div class=row><div class=col-lg-4></div><div class=col-lg-4><div class=row><div class=col-lg-6><form><div class=form-group><a href=# class=thumbnail><img src=../images/blank.png alt=Avatar class=\"img-thumbnail img-responsive\"></a></div><div class=form-group><div class=\"btn-group center-block\"><button type=button class=\"btn btn-default\"><span class=\"glyphicon glyphicon-remove\"></span></button> <button type=button class=\"btn btn-default\"><span class=\"glyphicon glyphicon-folder-open\"></span></button></div></div></form></div><div class=col-lg-6><form><div class=form-group><label for=display-name>Display Name</label> <input type=text class=form-control id=display-name placeholder=\"Eg. Pikachu\"></div><div class=form-group><label for=first-name>First Name</label> <input type=text class=form-control id=first-name placeholder=Elon></div><div class=form-group><label for=first-name>Last Name</label> <input type=text class=form-control id=last-name placeholder=Musk></div></form></div></div></div><div class=col-lg-4></div></div></div></section><section><div class=container-fluid><div class=row><div class=col-lg-4></div><div class=col-lg-4><div class=page-header><h4>Social Accounts</h4></div></div><div class=col-lg-4></div></div><div class=row><div class=col-lg-4></div><div class=col-lg-4><table class=\"table table-borderless\"><tbody><tr><td><label>Synchronize with Facebook account</label></td><td><button class=\"btn btn-default\" id=facebook-sync>Link</button></td></tr><tr><td><label>Synchronize with Google account</label></td><td><button class=\"btn btn-default\" id=google-sync>Link</button></td></tr></tbody></table></div><div class=col-lg-4></div></div></div></section><section><div class=container-fluid><div class=row><div class=col-lg-4></div><div class=col-lg-4><div class=page-header><h4>Email</h4></div></div><div class=col-lg-4></div></div><div class=row><div class=col-lg-4></div><div class=col-lg-4><form><div class=form-group><table class=\"table table-borderless\"><tbody><tr><td><input type=email class=form-control id=primary-email placeholder=\"Enter email address\"></td><td><button class=\"btn btn-default\" id=primary-email-default>Set Default</button></td></tr><tr><td><input type=email class=form-control id=secondary-email placeholder=\"Enter email address\"></td><td><button class=\"btn btn-default\" id=secondary-email-default>Set Default</button></td></tr></tbody></table></div></form></div><div class=col-lg-4></div></div></div></section><section><div class=container-fluid><div class=row><div class=col-lg-4></div><div class=col-lg-4><div class=page-header><h4>Personal Contact Number</h4></div></div><div class=col-lg-4></div></div><div class=row><div class=col-lg-4></div><div class=col-lg-4><form data-toggle=validator role=form autocomplete=off><div class=form-group><code-verify></code-verify></div></form></div><div class=col-lg-4></div></div></div></section><section><div class=container-fluid><div class=row><div class=col-lg-4></div><div class=col-lg-4><div class=page-header><h4>Notifications</h4></div></div><div class=col-lg-4></div></div><div class=row><div class=col-lg-4></div><div class=col-lg-4><form><div class=form-group><table class=\"table table-borderless\"><thead><tr><td>&nbsp;</td><td><label><span class=\"glyphicon glyphicon-phone gi-2x\"></span></label></td><td><label><span class=\"glyphicon glyphicon-envelope gi-2x\"></span></label></td></tr></thead><tbody><tr><td><label>When someone send you a request</label></td><td><input type=checkbox></td><td><input type=checkbox></td></tr><tr><td><label>When someone sends you a message</label></td><td><input type=checkbox></td><td><input type=checkbox></td></tr></tbody></table></div></form></div><div class=col-lg-4></div></div></div></section><section><div class=container-fluid><div class=row><div class=col-lg-4></div><div class=col-lg-4><div class=page-header><h4>Account Deletion</h4></div></div><div class=col-lg-4></div></div><div class=row><div class=col-lg-4></div><div class=col-lg-4><form><div class=form-group><label for=phone-number>To permanently delete your account type your phone number and click delete.</label> <input type=text class=form-control id=phone-number placeholder=\"Enter your phone number\"></div><button id=delete-account class=\"btn btn-danger\">Delete</button></form></div><div class=col-lg-4></div></div></div></section>");
$templateCache.put("views/register.html","<section id=registration ng-controller=\"RegisterController as registerController\"><div class=container-fluid><div class=row><div class=col-lg-4></div><div class=col-lg-4><form data-toggle=validator role=form autocomplete=off><div class=form-group><code-verify></code-verify></div><div class=form-group><label for=password>Password</label> <input type=password data-minlength=6 class=form-control id=password placeholder=\"Enter your password\" required ng-model=user.password ng-change=checkMatch()><div class=help-block>Minimum of 6 characters</div></div><div class=form-group><input type=password class=form-control id=password-confirm placeholder=Confirm required ng-model=user.passwordConfirm ng-change=checkMatch()><div class=\"help-block with-errors\" id=password-error ng-bind-html=\"passwordError | to_trusted\"></div></div><button type=submit class=\"btn btn-primary\" id=register-user ng-click=registerUser() ng-model=canRegister ng-disabled=canRegister>Register</button><div class=help-block id=registration-status ng-bind-html=\"registrationStatus | to_trusted\"></div></form></div><div class=col-lg-4></div></div></div></section>");
$templateCache.put("components/directives/code-verify.html","<div class=form-group ng-controller=PhoneNumberController><label for=phone-number>Phone Number</label><div class=container-fluid><div class=row><div class=col-lg-4><input type=text placeholder=\"Area Code\" pattern=^([1-9][0-9]*)$ maxlength=3 class=form-control id=area-code required ng-model=phoneNumber.areaCode ng-change=change() ng-blur=checkNumber()></div><div class=col-lg-4><input type=text placeholder=Prefix pattern=^([1-9][0-9]*)$ maxlength=3 class=form-control id=prefix required ng-model=phoneNumber.prefix ng-change=change() ng-blur=checkNumber()></div><div class=col-lg-4><input type=text placeholder=\"Line Number\" pattern=^([1-9][0-9]*)$ maxlength=4 class=form-control id=line-number required ng-model=phoneNumber.lineNumber ng-change=change() ng-blur=checkNumber()></div></div><div class=row><div class=col-lg-12><div class=\"help-block with-errors\" id=phone-number-error ng-bind-html=\"phoneNumberError | to_trusted\"></div></div></div></div></div><div class=form-group ng-controller=CodeVerificationController><div class=container-fluid><div class=row><div class=col-lg-12><label>Verification</label><form class=form-inline><div class=form-group><label class=sr-only for=enter-code>Enter Code</label> <input type=text class=form-control maxlength=5 pattern=^([1-9][0-9]*)$ placeholder=\"Enter Code\" id=enter-code ng-model=code><div class=help-block id=verified-status ng-bind-html=\"verifiedStatus | to_trusted\"></div></div><div class=form-group><div class=btn-group role=group><button id=send-code class=\"btn btn-default\" ng-click=sendCode()>Send Code</button> <button id=verify class=\"btn btn-primary\" ng-click=verifyCode()>Verify Code</button></div></div></form></div></div></div></div>");
$templateCache.put("components/directives/main-footer.html","<footer class=bs-docs-footer><div class=container><p>Designed and built with all the love in the world by Team Connectify.</p><p>Code licensed Connectify.</p><p></p></div></footer>");
$templateCache.put("components/directives/main-nav.html","<nav class=\"navbar navbar-default\"><div class=container-fluid><div class=navbar-header><button type=button class=\"navbar-toggle collapsed\" data-toggle=collapse aria-expanded=false></button> <a class=navbar-brand href=#>Connectify</a></div><div class=\"collapse navbar-collapse\"></div></div></nav>");
$templateCache.put("components/directives/responsive-nav.html","<a href=# class=hamburger></a>");}]);