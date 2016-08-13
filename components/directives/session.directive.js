angular
    .module('ConnectifyWeb')
    .factory('Session', SessionManager);

    SessionManager.$inject = ['$q', 'QueryService'];

    function SessionManager($q, QueryService) {
        
        var Session = {
           new: function (_salt, login) {
              
              var session = this;

              var deferred = $q.defer();

              QueryService.query('POST', 'new-session', {}, { salt: _salt, login: login })
                  .then(function(ovocie) {
                    
                    self.ovocie = ovocie.data;
                    
                    var session_data = self.ovocie["session"];
                    
                    if(typeof session_data == "object") {

                        session.data = session_data;
                        return deferred.resolve(session_data);

                    } else if(typeof session_data == "string") {
                        
                        if(session_data == "error") {
                            
                            console.log("Oops ! Could not create a new session.");
                            return deferred.reject(null);

                        }
                    }
                  });
           },
           destroy: function (_salt) {
              
              var session = this;

              var deferred = $q.defer();
              
              QueryService.query('DELETE', 'destroy-session', {}, { session_id: session.data.session_id })
                  .then(function(ovocie) {
                    
                    self.ovocie = ovocie.data;
                    
                    var result = self.ovocie["result"];
                    
                    if(result == "deleted") {
                        
                        session.data = {};
                        return deferred.resolve(true);

                    } else if(result == "error") {
                        
                        console.log("Oops ! Could not delete the session.");
                        return deferred.reject(false);

                    }
                  });
           },
           exists: function (_salt) {
              QueryService.query('GET', 'check-session', {}, { salt: _salt })
                  .then(function(ovocie) {
                    
                    self.ovocie = ovocie.data;
                    
                    var result = self.ovocie["result"];

                    var deferred = $q.defer();
                    
                    if(result == "exists") {
                        
                        return deferred.resolve(true);

                    } else {
                        
                        return deferred.reject(false);

                    }
                  });
           }
        };
        return Session; 
    };