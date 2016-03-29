(function() {
angular
  .module('museumPassport.questions', [])
  .controller('QuestionController', function($scope, $http){

  $http.get('http://localhost:3000/museums/1/exhibits/1/questions').success(function(data){
    $scope.questions = data;
    $scope.status();
  });

  $scope.status = function() {
    if($scope.questions[0].question.answer) {
      return 'edit';
    } else {
      return 'new'
    }
  }

  $scope.collectResponses = function() {
    var collection = [];
    if($scope.status() === 'new') {
      $scope.questions.forEach(function(item) {
        $scope.recordAnswer(item.question.id, item.question.answer);
        collection.push(item.question.answer);
      });
    } else {
      $scope.questions.forEach(function(item) {
        $scope.updateAnswer(item.question.id, item.question.answer_id, item.question.answer);
        collection.push(item.question.answer);
      });
    }
    console.log(collection);
  };

  $scope.recordAnswer = function(questionID, answer) {
        var data = $scope.formatJson(answer);

        $http({
          method: 'POST',
          url:    'http://localhost:3000/museums/1/exhibits/1/questions/'+questionID+'/answers.json',
          data:   data,
          headers: { 'Content-Type': 'application/json'}
        })
          .success(function ( data, status, header, JSON ) {
          })
          .error(function ( data, status, header, JSON ) {
          });
        console.log(data);
      };

  $scope.formatJson = function(answer) {
    var data = JSON.stringify({"entry": answer, "user_id": window.localStorage['userId']});
    return data;
  };

  $scope.updateAnswer = function(questionID, answerID, answer) {
        var data = $scope.formatUpdate(answerID, answer);

        $http({
          method: 'PUT',
          url:    'http://localhost:3000/museums/1/exhibits/1/questions/'+questionID+'/answers/'+answerID+'.json',
          data:   data,
          headers: { 'Content-Type': 'application/json'}
        })
          .success(function ( data, status, header, JSON ) {
          })
          .error(function ( data, status, header, JSON ) {
          });
        console.log(data);
      };

  $scope.formatUpdate = function(answer_id, answer) {
    var data = JSON.stringify({"answer_id": answer_id, "entry": answer, "user_id": window.localStorage['userId']});
    return data;
  };

 //  $scope.savedAlert = function() {
 //   var alertPopup = $ionicPopup.alert({
 //     title: "Your responses have been saved",
 //    //  template: "Where to next?"
 //   });
 // };

});
})();
