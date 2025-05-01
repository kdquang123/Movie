using System;
using AutoMapper;
using MediatR;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class FimlDeleteCommandHandler : BaseHandler, IRequestHandler<FilmDeleteCommand, bool>
{
    public FimlDeleteCommandHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public Task<bool> Handle(FilmDeleteCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
