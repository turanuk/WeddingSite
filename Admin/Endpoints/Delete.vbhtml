@Code
  Layout = Nothing
  Dim invitationCode = Request("InvitationId").AsInt()
  Dim db = Database.Open("WeddingSite")
  If invitationCode = Nothing
    Response.SetStatus(500)
  Else
    Try
      db.Execute("DELETE FROM RSVP WHERE InvitationId = @0", invitationCode)
      db.Execute("DELETE FROM Person WHERE InvitationId=@0", invitationCode)
    Catch ex As Exception
      Response.SetStatus(500)
    End Try
  End If
End Code