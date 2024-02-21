namespace ProductManager.Services
{
    public interface IAuthService
    {
        Task<(int, string, string)> Signup(UserDTO userDTO, string role);
        Task<(int, string, string)> Login(UserDTO userDTO);
    }
}
