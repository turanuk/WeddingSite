/// <reference path='../Scripts/knockout-2.1.0.js'/>
var initialData = [{'Id':1,'InvitationId':957167,'LastName':'Wang','NumberInParty':2,'FirstName':'Jim','Responded':false},{'Id':2,'InvitationId':186143,'LastName':'Wang2','NumberInParty':2,'FirstName':'Jim','Responded':false}];

var ManageGuestsViewModel = function (guestInput) {
  var self = this;
  self.guests = ko.observableArray(guestInput);
  self.columns = [ ];
  self.sortByLastName = function () {
    this.guests.sort(function (a,b) {
      return a.LastName < b.LastName ? -1 : 1;
    });
  }

  self.deleteGuest = function (guest, event, viewmodel) {
    $.post('/admin/endpoints/delete', { InvitationId: guest.InvitationId }, function(data) {
      self.guests.remove(function (item) { return item.InvitationId ==  guest.InvitationId});
    })
  }
}

$(function() {
  $.getJSON('/admin/endpoints/guests', function(data) {
    ko.applyBindings(new ManageGuestsViewModel(data));
  });
});