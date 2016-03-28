app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {
            controller: 'adminController',
            templateUrl: 'template/admin/admin.html'
        }).
        when('/post', {
            controller: 'postController',
            templateUrl: 'template/admin/post.html'
        }).
        when('/tag', {
            controller: 'tagController',
            templateUrl: 'template/admin/tag.html'
        }).
        when('/comment', {
            controller: 'commentController',
            templateUrl: 'template/admin/comment.html'
        }).
        when('/user', {
            controller: 'userController',
            templateUrl: 'template/admin/user.html'
        }).
        when('/profile', {
            controller: 'profileController',
            templateUrl: 'template/admin/profile.html'
        }).
        when('/logout', {
            controller: 'logoutController',
            templateUrl: 'template/login.html'
        }).
        otherwise({redirectTo: '/'});
}]);

/* controllers */
app.controller('adminController', function ($scope, $http, $rootScope, $location) {
    $scope.$on('$viewContentLoaded', function () {
        //Verifica se usuário está logado.
        $http.get("/login").then(function (response) {
            if (response.data.id) {
                $rootScope.authuser = response.data;
            } else {
                window.location.assign('index.html');
            }
        }, function (response) {
            notifyError(response);
        });
    });
});

app.controller('postController', function ($scope, Post, login) {
    login.check();

    //Título da página
    $scope.title = "Posts";
    //Array de objetos
    $scope.rows = null;
    //Um objeto
    $scope.row = null;

    $scope.$on('$viewContentLoaded', function(){
        $scope.loadAll();
    });

    $scope.loadAll = function(){
        $scope.row = null;
        $scope.title = "Posts";
        Post.query(function(data){
            $scope.rows = data;
        },function(response){
            notifyError(response);
        });
    };

    $scope.getById = function($id){
        Post.get({id:$id},function(data){
            $scope.title = "Post: " + data.title;
            $scope.row = data;
        },function(data){
            notifyError(data);
        });
    };

    $scope.createNew = function(){
        $scope.row = {title:"",active:0};
    };

    $scope.save = function(){
        if ($scope.form.$invalid) {
            notifyError("Valores inválidos");
            return;
        }
        Post.save($scope.row,function(data){
            notifyOk(data.title + " salvo com sucesso");
            $scope.loadAll();
        },function(data){
            notifyError(data);
        });
    };
});

app.controller('tagController', function ($scope, Tag, login) {
    login.check();

    //Título da página
    $scope.title = "Tags";
    //Array de objetos
    $scope.rows = null;
    //Um objeto
    $scope.row = null;

    $scope.$on('$viewContentLoaded', function(){
        $scope.loadAll();
    });

    $scope.loadAll = function(){
        $scope.row = null;
        $scope.title = "Tags";
        Tag.query(function(data){
            $scope.rows = data;
        },function(response){
            notifyError(response);
        });
    };

    $scope.getById = function($id){
        Tag.get({id:$id}, function(data){
            $scope.title = "Tag: " + data.title;
            $scope.row = data;
        },function(data){
            notifyError(data);
        });
    };

    $scope.createNew = function(){
        $scope.row = {title: ""};
    };

    $scope.save = function(){
        if ($scope.form.$invalid) {
            notifyError("Valores inválidos");
            return;
        }
        Tag.save($scope.row, function(data){
            notifyOk(data.title + " salvo com sucesso");
            $scope.loadAll();
        },function(data){
            notifyError(data);
        });
    };
});

app.controller('commentController', function ($scope, Comment, Post, login) {
    login.check();

    //Array de posts
    $scope.posts = null;
    //post selecionado
    $scope.post = null;
    //Array de objetos
    $scope.rows = null;
    //Um objeto
    $scope.row = null;

    $scope.$on('$viewContentLoaded', function(){
        $scope.loadAllPosts();
    });
    $scope.loadAllPosts = function(){
        Post.getTitles(function(data){
            $scope.posts = data;
        });
    };
    $scope.selectPost = function($post){
        $scope.post = $post;
        $scope.row = null;
        Comment.getByPost({id:$post.id},function(data){
            $scope.rows = data;
        });
    };
    $scope.selectComment = function($comment){
        $scope.row = $comment;
    };
    $scope.save = function(){
        if ($scope.form.$invalid) {
            notifyError("Valores inválidos");
            return;
        }
        Comment.save($scope.row,function(data){
            notifyOk("Comentário salvo com sucesso");
            $scope.selectPost($scope.post);
        },function(data){
            notifyError(data);
        });
    };
});

app.controller('userController', function ($scope, User, login) {
    login.check();

    //Título da página
    $scope.title = "Users";
    //Array de objetos
    $scope.rows = null;
    //Um objeto
    $scope.row = null;

    $scope.$on('$viewContentLoaded', function(){
        $scope.loadAll();
    });
    $scope.loadAll = function(){
        $scope.row = null;
        $scope.title = "Users";
        User.query(function(data){
            $scope.rows = data;
        },function(response){
            notifyError(response);
        });
    };
    $scope.getById = function($id){
        User.get({id:$id},function(data){
            $scope.title = "User: " + data.name;
            $scope.row = data;
        },function(data){
            notifyError(data);
        });
    };
    $scope.createNew = function(){
        $scope.row = {name:""};
    };
    $scope.save = function(){
        if ($scope.form.$invalid) {
            notifyError("Valores inválidos");
            return;
        }
        User.save($scope.row,function(data){
            notifyOk(data.title + " salvo com sucesso");
            $scope.loadAll();
        },function(data){
            notifyError(data);
        });
    };
});

app.controller('profileController', function ($scope, login, User, $rootScope) {
    login.check();
    //Título da página
    $scope.title = "Perfil";
    //Um objeto
    $scope.row = null;

    $scope.$on('$viewContentLoaded', function(){
        $scope.getById($rootScope.authuser.id);
    });

    $scope.getById = function($id){
        User.get({id:$id},function(data){
            $scope.row = data;
        },function(data){
            notifyError(data);
        });
    };

    $scope.save = function(){
        if ($scope.form.$invalid) {
            notifyError("Valores inválidos");
            return;
        }
        User.save($scope.row,function(data){
            notifyOk(data.name + " salvo com sucesso");
            $scope.getById($rootScope.authuser.id);
        },function(data){
            notifyError(data);
        });
    };
});

app.controller('logoutController', function ($scope, $http, $location, $rootScope) {
    $http.get("/logout").then(function(response){
        notifyOk("Logout realizado.");
        $rootScope.authuser = null;
        window.location.assign('/index.html');
    },function(response){
        notifyError(response);
    });
});