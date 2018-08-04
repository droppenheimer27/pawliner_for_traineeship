namespace Pawliner.Model
{
    public class JuridicalExecutorViewModel
    {
        public int Id { get; set; }
        public string FullJuredicalName { get; set; }
        public string ShortJuredicalName { get; set; }
        public int PayerAccountNumber { get; set; }
        public ExecutorViewModel ExecutorViewModel { get; set; }
    }
}
