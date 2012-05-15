/// <reference path='../Scripts/knockout-2.1.0.js'/>

var ManageGuestsViewModel = function (guestInput) {
  var self = this;
  self.guests = ko.observableArray(guestInput);
  self.columns = [];
  self.sortByLastName = function () {
    this.guests.sort(function (a, b) {
      return a.LastName < b.LastName ? -1 : 1;
    });
  }

  self.refresh = function () {
    $.getJSON('/admin/endpoints/guests', function (data) {
      self.guests(data);
    });
  }

  self.deleteGuest = function (guest) {
    $.post('/admin/endpoints/delete', { InvitationId: guest.InvitationId }, function (data) {
      self.guests.remove(function (item) { return item.InvitationId == guest.InvitationId });
    });
  }

  self.addToParty = function (guest) {
    $.post('/admin/endpoints/addtoparty', { InvitationId: guest.InvitationId }, function (data) {
      self.refresh();
    });
  }

  self.subtractFromParty = function (guest) {
    $.post('/admin/endpoints/subtractfromparty', { InvitationId: guest.InvitationId }, function (data) {
      self.refresh();
    });
  }

  self.markNotResponded = function (guest) {
    $.post('/admin/endpoints/marknotresponded', { InvitationId: guest.InvitationId }, function (data) {
      self.refresh();
    });
  }

  self.markResponded = function (guest) {
    $.post('/admin/endpoints/markresponded', { InvitationId: guest.InvitationId }, function (data) {
      self.refresh();
    });
  }
}

$(function () {
  $.getJSON('/admin/endpoints/guests', function (data) {
    ko.applyBindings(new ManageGuestsViewModel(data));
  });
});