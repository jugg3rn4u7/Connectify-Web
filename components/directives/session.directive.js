angular
    .module('ConnectifyWeb')
    .factory('Session', SessionManager);

    SessionManager.$inject = ['QueryService'];

    function SessionManager(QueryService) {
        
        var Session = {
           new: function (_salt) {
              var session = this;
              QueryService.query('POST', 'new-session', {}, { salt: _salt })
                  .then(function(ovocie) {
                    self.ovocie = ovocie.data;
                    var session_data = self.ovocie["session"];
                    if(typeof session_data == "object") {
                        session.data = session_data;
                        console.log("sessoion", session.data);
                        return true;
                    } else if(typeof session_data == "string") {
                        if(session_data == "error") {
                            console.log("Oops ! Could not create a new session.");
                            return false;
                        }
                    }
                  });
           },
           destroy: function (_salt) {
              var session = this;
              QueryService.query('DELETE', 'destroy-session', {}, { session_id: session.data.session_id })
                  .then(function(ovocie) {
                    self.ovocie = ovocie.data;
                    var result = self.ovocie["result"];
                    if(result == "deleted") {
                        session.data = {};
                        return true;
                    } else if(result == "error") {
                        console.log("Oops ! Could not delete the session.");
                        return false;
                    }
                  });
           },
           exists: function (_salt) {
              QueryService.query('GET', 'check-session', {}, { salt: _salt })
                  .then(function(ovocie) {
                    self.ovocie = ovocie.data;
                    var result = self.ovocie["result"];
                    if(result == "exists") {
                        return true;
                    } else {
                        return false;
                    }
                  });
           },
           getCurrentSession: function () {
              return this.data;
           },
           data: {} 
        };
        return Session; 
    };