using System;

namespace Pawliner.Logic
{
    public class DocumentTransport
    {
        public int Id { get; set; }
        public string Path { get; set; }
        public string FileName { get; set; }
        public ExecutorTransport ExecutorTransport { get; set; }
    }
}
