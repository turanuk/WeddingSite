/// <reference path="../Scripts/knockout-2.1.0.js" />
/// <reference path="../Scripts/jquery-1.7.2.js" />

ko.bindingHandlers.deletePrompt = {
  init: function (element, valueAccessor, allBindingsAccessor, model) {
    var viewModel = valueAccessor();
    $(element).click(function () {
      $('.dialog-delete-element').html('<p>Are you sure you want to delete ' + model.FirstName +  ' ' + model.LastName + '?</p>');
      $('.dialog-delete-element').dialog({
        height: 200,
        modal: true,
        buttons: {
          'Yes': function () {
            $(this).dialog('close');
            viewModel.deleteGuest(model);
          },
          'No': function () {
            $(this).dialog('close');
          }
        }
      });
    });
  }
}

ko.bindingHandlers.comingText = {
  init: function (element, valueAccessor, allBindingsAccessor, model) {
    if (valueAccessor()) {
      $(element).html('Yes');
    } else {
      $(element).html('No');
    }
  }
}