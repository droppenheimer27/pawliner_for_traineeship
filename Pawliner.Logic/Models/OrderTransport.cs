﻿using Pawliner.DataProvider;
using System;
using System.Collections.Generic;

namespace Pawliner.Logic
{
    public class OrderTransport
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string ServiceDescription { get; set; }
        public string ServiceClassiferDescription { get; set; }
        public string Header { get; set; }
        public string Description { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public int Price { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string CompletedOn { get; set; }
        public string CreatedAt { get; set; }
        public string UpdatedAt { get; set; }
    }
}