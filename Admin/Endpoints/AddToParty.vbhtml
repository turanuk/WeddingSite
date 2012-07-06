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
      If count < 8 Then
        count = count + 1
      End If
      db.Execute("UPDATE RSVP SET NumberInParty = @0 WHERE InvitationId = @1", count, invitationCode)
      db.Execute("INSERT INTO Person (InvitationId) VALUES (@0)", invitationCode)
    Catch ex As Exception
      Response.SetStatus(500)
    End Try
  End If
End Code