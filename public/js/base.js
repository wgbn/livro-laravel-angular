'use strict';
var app = angular.module('app', ['ngRoute', 'ngResource']);

//Notificacoes
function notifyOk(message){
    $('.bottom-right').notify({
        message: { text: message}
    }).show();
}

function notifyError(error) {
    var message = "";

    if (error.data && error.data.message) {
        console.log('error: error.data.message');
        message = error.data.message;
    } else if (message == "" && error.statusText) {
        message = "Error: " + error.statusText;
    } else if (message == "" && typeof error == "string"){
        message = error;
    }

    $('.bottom-right').notify({
        message: { text: message},
        type: 'danger',
    }).show();
    $('#loading').css('display','none');
}

/* config */
app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push(
        function ($q, $rootScope) {
            return {
                'request': function (config) {
                    $rootScope.$broadcast('loading-started');
                    return config || $q.when(config);
                },
                'response': function (response) {
                    $rootScope.$broadcast('loading-complete');
                    return response || $q.when(response);
                }
            };
        });
}]);

/* diretivas */
app.directive("loadingIndicator", function() {
    return {
        restrict : "A",
        template: '<div id="loading"><img src="imgs/ajax-loader.gif"/>Loading...</div>',
        link : function(scope, element, attrs) {
            element.css({"display" : "none"});
            scope.$on("loading-started", function(e) {
                element.css({"display" : ""});
            });
            scope.$on("loading-complete", function(e) {
                element.css({"display" : "none"});
            });
        }
    };
});

app.directive("compareTo",function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {
            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };
            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
});

/* services */
app.service('login', function($rootScope){
    this.check = function(){
        if ($rootScope.authuser == null){
            window.location.assign('/index.html');
        }
    }
});

app.service('Post', ['$resource', function($resource) {
    return $resource("posts/:id", {}, {
        getTitles: {
            url: '/posts/getTitles',
            method: 'GET',
            isArray: true
        }
    });
}]);

app.service('Comment', ['$resource', function($resource) {
    return $resource("comments/:id", {}, {
        getByPost: {
            url: '/comments/post/:id',
            method: 'GET',
            isArray: true
        }
    });
}]);

app.service('User', ['$resource', function($resource, $http) {
    this.createUser = function(user){
        $http.post("/users/newlogin",
            {
                'email': $scope.user.email,
                'password': $scope.user.password,
                'name': $scope.user.name
            }).then(function(response){
                //Login+criar conta realizado,
                // redirecionar para pagina de posts
                $rootScope.authuser = response.data;
                $location.path('/');
            },function(response){
                notifyError(response);
            });
    };
    this.rest = function(){
        return $resource("users/:id");
    }
}]);

app.service('Tag', ['$resource', function($resource) {
    return $resource("tags/:id");
}]);