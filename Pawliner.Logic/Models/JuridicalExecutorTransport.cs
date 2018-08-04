namespace Pawliner.Logic
{
    public class JuridicalExecutorTransport
    {
        public int Id { get; set; }
        public string FullJuredicalName { get; set; }
        public string ShortJuredicalName { get; set; }
        public int PayerAccountNumber { get; set; }
        public ExecutorTransport Executor { get; set; }
    }
}
