using App.Domain;
using Base.Contracts.DAL;

namespace App.DAL.EF;

public class DalDummyMapper : IDalMapper<Contest, Contest>
{
    /*
    Contest? IDalMapper<Contest, Contest>.Map(Contest? inObject)
    {
        return inObject;
    }*/

    public Contest? MapRL(Contest? inObject)
    {
        return inObject;
    }

    public Contest? MapLR(Contest? inObject)
    {
        return inObject;
    }
}