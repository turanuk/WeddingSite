/// <reference path='../Scripts/knockout-2.1.0.js'/>

var ManageGuestsViewModel = function (guestInput) {
  var self = this;
  self.guests = ko.observableArray(guestInput);
  self.filter = ko.observable('');
  self.filteredGuests = ko.dependentObservable(function() {
    var localFilter = self.filter().toLowerCase();
    if (!localFilter) {
      return self.guests();
    } else {
      return ko.utils.arrayFilter(self.guests(), function (item) {
        if (item.LastName.toLowerCase().search(localFilter) != -1) {
          return true;
        }
      });
    }
  });
  self.columns = [];
  self.sortByLastName = function () {
    this.guests.sort(function (a, b) {
      return a.LastName < b.LastName ? -1 : 1;
    });
  }

  self.totalGuests = ko.computed(function() {
    var total = 0;
    $.each(self.guests(), function () { total += this.NumberInParty });
    return total;
  });

  self.totalRSVPs = ko.computed(function () {
    var total = 0;
    $.each(self.guests(), function () { if (this.Responded) { total += 1 } });
    return total;
  });

  self.RSVPRate = ko.computed(function () {
    var totalYes = 0;
    var total = 0;
    $.each(self.guests(), function () {
      total += 1;
      if (this.Responded) {
        totalYes += 1
      }
    });
    return (totalYes/total*100).toFixed(1);
  });

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

  self.clearFilter = function () {
    self.filter('');
  }
}

$(function () {
  $.getJSON('/admin/endpoints/guests', function (data) {
    ko.applyBindings(new ManageGuestsViewModel(data));
  });
});