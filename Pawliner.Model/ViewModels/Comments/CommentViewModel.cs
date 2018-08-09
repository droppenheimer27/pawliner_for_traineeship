namespace Pawliner.Model
{
    public class CommentViewModel
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string CreatedAt { get; set; }
        public string UserId { get; set; }
        public virtual UserViewModel User { get; set; }
        public int? ExecutorId { get; set; }
        public virtual ExecutorViewModel Executor { get; set; }
    }
}
