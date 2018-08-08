namespace Pawliner.Logic
{
    public class RespondTransport
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string CreatedAt { get; set; }
        public RespondStatusTransport Status { get; set; }
        public int? OrderId { get; set; }
        public OrderTransport Order { get; set; }
        public int? ExecutorId { get; set; }
        public ExecutorTransport Executor { get; set; }
    }
}
