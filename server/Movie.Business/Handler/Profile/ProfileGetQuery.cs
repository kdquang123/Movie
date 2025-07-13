using System;
using Amazon.Runtime.Internal;
using MediatR;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class ProfileGetQuery : IRequest<ProfileViewModel>
{

}
