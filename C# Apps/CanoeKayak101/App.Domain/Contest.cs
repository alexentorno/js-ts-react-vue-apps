using System.ComponentModel.DataAnnotations;
using Base.Contracts.Domain;
using Base.Domain;
using Base.Domain.Identity;

namespace App.Domain;

public class Contest : BaseEntityId, IDomainAppUser<AppUser>
{
    [MaxLength(128)] public string ContestName { get; set; } = default!;
    
    public Guid AppUserId { get; set; }
    public AppUser? AppUser { get; set; }
}