using System;
using Microsoft.AspNetCore.Http;

namespace Movie.Business.Services;

public interface IFileService
{
    Task<string> UploadFileAsync(IFormFile file, string prefix = "poster");
    Task<bool> DeleteFileAsync(string fileUrl);
}
