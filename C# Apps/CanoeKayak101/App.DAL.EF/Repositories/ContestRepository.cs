using App.Contracts.DAL.Repositories;
using App.Domain;
using AppDAL.EF;
using Base.Contracts.DAL;
using Base.DAL.EF;

namespace App.DAL.EF.Repositories;

public class ContestRepository : BaseEntityRepository<Contest, Contest, AppDbContext>,  IContestRepository
{
    public ContestRepository(AppDbContext dbContext, IDalMapper<Contest, Contest> mapper) : base(dbContext, mapper)
    {
    }
}