namespace Pawliner.Logic
{
    public class CommentTransport
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string CreatedAt { get; set; }
        public string UserId { get; set; }
        public virtual UserTransport User { get; set; }
        public int? ExecutorId { get; set; }
        public virtual ExecutorTransport Executor { get; set; }
    }
}
