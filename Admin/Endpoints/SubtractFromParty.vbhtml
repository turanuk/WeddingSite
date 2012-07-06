@Code
  Layout = Nothing
  Dim invitationCode = Request("InvitationId").AsInt()
  Dim db = Database.Open("WeddingSite")
  If invitationCode = Nothing
    Response.SetStatus(500)
  Else
    Try
      Dim guest = db.QuerySingle("SELECT * FROM RSVP WHERE InvitationId = @0", invitationCode)
      Dim count = guest.NumberInParty
      If count > 1 Then
        count = count - 1
        db.Execute("UPDATE RSVP SET NumberInParty = @0 WHERE InvitationId = @1", count, invitationCode)
        Dim people = db.Query("SELECT * FROM Person WHERE (InvitationId = @0)", invitationCode)
        Dim deleteId = people.Last().Id
        db.Execute("DELETE FROM Person WHERE Id=@0", deleteId)
      End If
    Catch ex As Exception
      Response.SetStatus(500)
    End Try
  End If
End Code