using System;

namespace Movie.Core.Exceptions;

public class ChangePasswordException : Exception
{
    public ChangePasswordException(string message) : base(message)
    {
    }
}