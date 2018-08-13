using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Pawliner.Common
{
    public static class Pawmapper<T>
    {
        public static T Map(NameValueCollection nameValueCollection, T model)
        {
            foreach (string keyValue in nameValueCollection.AllKeys)
            {
                PropertyInfo property = model.GetType().GetProperty(keyValue, BindingFlags.Public | BindingFlags.Instance);
                if (property != null)
                {
                    property.SetValue(model, nameValueCollection[keyValue], null);
                }
            }

            return model;
        }
    }
}
