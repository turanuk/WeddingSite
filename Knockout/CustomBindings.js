/// <reference path="../Scripts/knockout-2.1.0.js" />
/// <reference path="../Scripts/jquery-1.7.2.js" />

ko.bindingHandlers.deletePrompt = {
  init: function (element, valueAccessor, allBindingsAccessor, model) {
    $(element).click(function () {
      var viewModel = valueAccessor();
      var deleteFunction, objectType, objectName;
      if (model.RankingId) {
        objectType = 'ranking';
        objectName = model.Name();
        deleteFunction = viewModel.deleteRanking;
      } else if (model.PersonId) {
        objectType = 'person';
        objectName = model.Name();
        deleteFunction = viewModel.removePersonFromRanking;
      } else if (model.TeamId) {
        objectType = 'team';
        objectName = model.Name;
        deleteFunction = viewModel.deleteTeam;
      }
      $('.dialog-delete-element').html('<p>Are you sure you want to delete ' + objectType +  ' \"' + objectName + '\"?</p>');
      $('.dialog-delete-element').dialog({
        height: 200,
        modal: true,
        buttons: {
          'Yes': function () {
            $(this).dialog('close');
            deleteFunction(model, element);
          },
          'No': function () {
            $(this).dialog('close');
          }
        }
      });
    });
  }
}