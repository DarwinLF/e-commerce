namespace ProductManager.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }

        public User(string userName,string password)
        {
            Id = 0;
            UserName = userName;
            Password = password;
        }
    }
}
