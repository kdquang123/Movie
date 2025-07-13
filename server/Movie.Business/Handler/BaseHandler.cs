using System;
using AutoMapper;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class BaseHandler(IUnitOfWork unitOfWork, IMapper mapper)
{
    protected readonly IUnitOfWork _unitOfWork = unitOfWork;

    protected readonly IMapper _mapper = mapper;
}
