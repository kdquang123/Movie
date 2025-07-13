using System;
using System.Text;

namespace Movie.Core.Utils;

public class PasswordGenerator
{
    public static string GeneratePassword(int length = 8)
    {
        const string upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const string lower = "abcdefghijklmnopqrstuvwxyz";
        const string digits = "0123456789";
        const string symbols = "!@#$%^&*()_-+=<>?";

        string allChars = upper + lower + digits + symbols;
        var random = new Random();

        var password = new StringBuilder();
        password.Append(upper[random.Next(upper.Length)]);
        password.Append(lower[random.Next(lower.Length)]);
        password.Append(digits[random.Next(digits.Length)]);
        password.Append(symbols[random.Next(symbols.Length)]);

        for (int i = 4; i < length; i++)
        {
            password.Append(allChars[random.Next(allChars.Length)]);
        }

        // Trộn ký tự để tránh vị trí cố định
        return new string(password.ToString().OrderBy(_ => random.Next()).ToArray());
    }
}
