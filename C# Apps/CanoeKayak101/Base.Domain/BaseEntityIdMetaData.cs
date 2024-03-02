using Base.Contracts.Domain;

namespace Base.Domain;

public class BaseEntityIdMetaData : BaseEntityIdMetaData<Guid>
{
    
}

public abstract class BaseEntityIdMetaData<TKey> : BaseEntityId<TKey>
    where TKey : IEquatable<TKey>
{
    public string CreatedBy { get; set; }
    public DateTime CreatedAt { get; set; }
    public string UpdatedBy { get; set; }
    public DateTime UpdatedAt { get; set; }
}