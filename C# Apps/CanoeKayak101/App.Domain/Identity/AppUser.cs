using App.Domain;
using Microsoft.AspNetCore.Identity;

namespace Base.Domain.Identity;

public class AppUser : IdentityUser<Guid>
{
    public ICollection<Contest>? Contests { get; set; }
}