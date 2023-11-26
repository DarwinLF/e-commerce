using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductManager.DTO;
using ProductManager.Interfaces;
using System.Net;
using System.Text;

namespace ProductManager.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly Context _context;
        private readonly ITokenService _tokenService;

        public UserController(Context context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        // POST: ProductController/Create
        [HttpPost("Signup")]
        //[ValidateAntiForgeryToken]
        public async Task<ActionResult<UserDto>> Signup(string username, string password)
        {
            if(_context.Users.Any(u => u.UserName == username))
            {
                return BadRequest("UserName alredy exist");
            }
            else
            {
                User user = new User(username, EncodePassword(password));
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return new UserDto
                {
                    Username = user.UserName,
                    Token = _tokenService.CreateToken(user)
                };
            }
        }

        // POST: ProductController/Create
        [HttpPost("Login")]
        //[ValidateAntiForgeryToken]
        public async Task<ActionResult<UserDto>> Login(string username, string password)
        {
            User user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == username);

            if(user == null)
            {
                return Unauthorized("Invalid userName");
            }

            if(DecodePassword(user.Password) != password)
            {
                return Unauthorized("Invalid password");
            }

            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        private string EncodePassword(string password)
        {
            try
            {
                byte[] encData_byte = new byte[password.Length];
                encData_byte = Encoding.UTF8.GetBytes(password);
                string encodedData = Convert.ToBase64String(encData_byte);
                return encodedData;
            }
            catch (Exception ex) {
                throw new Exception("Error in base64Encode" + ex.Message);
            }
        }

        private string DecodePassword(string encodedData)
        {
            UTF8Encoding encoder = new UTF8Encoding();
            Decoder utf8Decode = encoder.GetDecoder();
            byte[] todecode_byte = Convert.FromBase64String(encodedData);
            int charCount = utf8Decode.GetCharCount(todecode_byte, 0, todecode_byte.Length);
            char[] decoded_char = new char[charCount];
            utf8Decode.GetChars(todecode_byte, 0, todecode_byte.Length, decoded_char, 0);
            string result = new String(decoded_char);
            return result;
        }
    }
}
