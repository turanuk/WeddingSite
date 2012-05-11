using System;
using System.Collections.Generic;
using System.Web;
using System.Linq;
using System.Text;
using System.Security.Cryptography;

namespace MyExtensions {
  public static class MyExtensions
  {
    //First 6 digits of the MD5 hash of your last name plus a random integer from 0 to 399
    public static int InvitationCode(this string lastName)
    {
      var md5 = MD5.Create();
      var random = new Random();
      var data = md5.ComputeHash(Encoding.UTF8.GetBytes(lastName));
      StringBuilder sBuilder = new StringBuilder();
      for (int i = 0; i < data.Length; i++)
      {
        sBuilder.Append(data[i].ToString("x2"));
      }
      var hash = sBuilder.ToString();
      var hashdigits = new string(hash.Where( h => char.IsDigit(h)).ToArray());
      return Int32.Parse(hashdigits.Substring(0,6)) + random.Next(0,399);
    }
  }
}