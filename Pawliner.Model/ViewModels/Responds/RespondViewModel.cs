namespace Pawliner.Model
{
    public class RespondViewModel
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string CreatedAt { get; set; }
        public RespondStatusViewModel Status { get; set; }
        public int? OrderId { get; set; }
        public OrderViewModel Order { get; set; }
        public int? ExecutorId { get; set; }
        public ExecutorViewModel Executor { get; set; }
    }
}
