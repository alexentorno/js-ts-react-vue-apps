using Base.Contracts.Domain;
using Base.Domain;
using Base.Domain.Identity;

namespace App.Domain;

public class Contest : BaseEntityId, IDomainAppUser<AppUser>
{
    public string ContestName { get; set; }
    
    public Guid AppUserId { get; set; }
    public AppUser? AppUser { get; set; }
}