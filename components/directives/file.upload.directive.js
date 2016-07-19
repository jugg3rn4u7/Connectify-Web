angular
    .module('ConnectifyWeb')
    .directive('fileUpload', function () {
        return {
            scope: true,        //create a new scope
            link: function (scope, el, attrs) {
                el.bind('change', function (event) {
                    var file = event.target.files[0];
                    if(!!file) {
                        console.log("File Exists: ", file);
                    } else {
                        console.log("Doesnt exist");
                    }
                    //emit event upward
                    scope.$emit("fileSelected", { file: file });                                    
                });
            }
    };
});