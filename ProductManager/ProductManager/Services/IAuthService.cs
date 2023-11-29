namespace ProductManager.Services
{
    public interface IAuthService
    {
        Task<(int, string)> Signup(UserDTO userDTO, string role);
        Task<(int, string)> Login(UserDTO userDTO);
    }
}
