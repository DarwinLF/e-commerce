using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ProductManager.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        public AuthService(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }

        public async Task<(int, string, string)> Signup(UserDTO userDTO, string role)
        {
            IdentityUser userExists = await _userManager.FindByNameAsync(userDTO.Username);
            if (userExists != null)
            {
                return (0, "User Alredy exists", "");
            }

            IdentityUser user = new IdentityUser()
            {
                UserName = userDTO.Username,
            };

            IdentityResult createUserResult = await _userManager.CreateAsync(user, userDTO.Password);
            if (!createUserResult.Succeeded)
            {
                return (0, "User creation failed! Please check user details and try again.", "");
            }

            if (!await _roleManager.RoleExistsAsync(role))
            {
                await _roleManager.CreateAsync(new IdentityRole(role));
            }

            if (await _roleManager.RoleExistsAsync(UserRoles.User))
            {
                await _userManager.AddToRoleAsync(user, role);
            }

            return await GetToken(user);
        }

        public async Task<(int, string, string)> Login(UserDTO userDTO)
        {
            IdentityUser? user = await _userManager.FindByNameAsync(userDTO.Username);
            if (user == null)
            {
                return (0, "Invalid Username", "");
            }
            if (!await _userManager.CheckPasswordAsync(user, userDTO.Password))
            {
                return (0, "Invalid password", "");
            }

            return await GetToken(user);
        }

        private async Task<(int, string, string)> GetToken(IdentityUser user)
        {
            IList<string> userRoles = await _userManager.GetRolesAsync(user);

            List<Claim> authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            foreach (string userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            string token = GenerateToken(authClaims);

            return (1, token, userRoles[0]);
        }

        private string GenerateToken(IEnumerable<Claim> claims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _configuration["JWT:ValidIssuer"],
                Audience = _configuration["JWT:ValidAudience"],
                Expires = DateTime.UtcNow.AddHours(3),
                SigningCredentials = new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256),
                Subject = new ClaimsIdentity(claims)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
