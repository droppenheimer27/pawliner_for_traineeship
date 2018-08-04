using System;

namespace Pawliner.Model
{
    public class DocumentViewModel
    {
        public int Id { get; set; }
        public string Path { get; set; }
        public ExecutorViewModel ExecutorViewModel { get; set; }
    }
}
