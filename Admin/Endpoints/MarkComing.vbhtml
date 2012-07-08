@Code
  Layout = Nothing
  Dim invitationCode = Request("InvitationId").AsInt()
  Dim db = Database.Open("WeddingSite")
  If invitationCode = Nothing
    Response.SetStatus(500)
  Else
    Try
      db.Execute("UPDATE RSVP SET Coming = @0 WHERE InvitationId = @1", True, invitationCode)
    Catch ex As Exception
      Response.SetStatus(500)
    End Try
  End If
End Code