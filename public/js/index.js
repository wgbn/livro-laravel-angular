'use strict';

/* config */
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {
            controller: 'mainController',
            templateUrl: 'template/main.html'
        }).
        when('/usuarios', {
            controller: 'userController',
            templateUrl: 'template/user.html'
        }).
        when('/comentarios', {
            controller: 'commentController',
            templateUrl: 'template/comment.html'
        }).
        when('/tags', {
            controller: 'tagController',
            templateUrl: 'template/tag.html'
        }).
        when('/login', {
            controller: 'loginController',
            templateUrl: 'template/login.html'
        }).
        when('/logout', {
            controller: 'logoutController',
            templateUrl: 'template/login.html'
        }).
        when('/new', {
            controller:'newUserController',
            templateUrl:'template/newuser.html'
        }).
        otherwise({redirectTo: '/'});
}]);

/* controllers */
app.controller('mainController',function ($scope, $http) {
    $scope.posts = [];

    $scope.$on('$viewContentLoaded', function(){
        $http.get('/posts/last/3')
            .then(function(res){
                console.log(res);
                $scope.posts = res.data;
            })
            .then(function(err){
                if (err)
                    notifyError(err);
            });
    })
});

app.controller('menuController',function ($scope, $http) {
    $scope.tags = [];
    $scope.comments = [];

    $http.get("/menuinfo").then(function(response){
        console.log(response);
        $scope.tags = response.data[0];
        $scope.comments = response.data[1];
    },function(err){
        if (err)
            notifyError(err);
    });
});

app.controller('userController',function ($scope, $http) {
    $scope.users = [];
    $scope.$on('$viewContentLoaded', function(){
        $http.get("/users/posts").then(function(response){
            $scope.users = response.data;
        },function(response){
            notifyError(response)
        });
    });
});

app.controller('commentController',function ($scope, $http) {
    $scope.comments = [];
    $scope.$on('$viewContentLoaded', function(){
        $http.get("/comments").then(function(response){
            $scope.comments = response.data;
        },function(response){
            notifyError(response)
        });
    });
});

app.controller('tagController',function ($scope, $http) {
    $scope.tags = [];
    $scope.$on('$viewContentLoaded', function(){
        $http.get("/tags/posts").then(function(response){
            $scope.tags = response.data;
        },function(response){
            notifyError(response)
        });
    });
});

app.controller('loginController', function ($scope, $http, $location, $rootScope) {
    $scope.user = {};
    $scope.doLogin = function () {
        if ($scope.form.$invalid) {
            console.warn("invalid form");
            return;
        }
        $http.post("/login", {
                'email': $scope.user.email,
                'password': $scope.user.password
            }).then(function (response) {
                //Login realizado,
                // redirecionar para pagina de posts
                $rootScope.authuser = response.data;
                $location.path('/');
            }, function (response) {
                notifyError(response);
            });
    }
});

app.controller('logoutController', function ($scope, $http, $location, $rootScope) {
    $http.get("/logout").then(function(response){
        notifyOk("Logout realizado.");
        $rootScope.authuser = null;
        $location.path('#/');
    },function(response){
        notifyError(response);
    });
});

app.controller('newUserController', function ($scope, $http, $location, $rootScope) {
    $scope.user = {};
    $scope.createUser = function(){
        if ($scope.form.$invalid) {
            console.warn("invalid form");
            return;
        }
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
    }
});