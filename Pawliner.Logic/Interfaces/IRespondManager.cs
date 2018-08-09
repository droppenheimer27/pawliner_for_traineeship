using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pawliner.Logic
{
    public interface IRespondManager
    {
        void CreateRespond(RespondTransport respond);
        void UpdateRespond(EditRespondTransport respond);
        void UpdateStatusRespond(StatusRespondTransport respond);
        void DeleteRespond(int id);
        RespondTransport GetRespond(int id);
        IEnumerable<RespondTransport> GetResponds();
    }
}
