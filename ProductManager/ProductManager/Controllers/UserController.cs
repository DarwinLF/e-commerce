using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ProductManager.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace ProductManager.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ILogger<UserController> _logger;

        public UserController(IAuthService authService, ILogger<UserController> logger)
        {
            _authService = authService;
            _logger = logger;
        }

        // POST: ProductController/Create
        [HttpPost("Signup")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Signup(UserDTO userDTO)
        {
            try
            {
                if(!ModelState.IsValid)
                {
                    return BadRequest("Invalid payload");
                }

                var (status, message, role) = await _authService.Signup(userDTO, UserRoles.User);
                if(status == 0)
                {
                    return BadRequest(message);
                }

                return Ok(new {message, role});
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // POST: ProductController/Create
        [HttpPost("Login")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(UserDTO userDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid payload");
                }

                var (status, message, role) = await _authService.Login(userDTO);
                if (status == 0)
                {
                    return BadRequest(message);
                }

                return Ok(new { message, role });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
