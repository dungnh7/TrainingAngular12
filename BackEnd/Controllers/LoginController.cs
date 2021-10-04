using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using RestSharp;
using sd2376_workshop_backend.Core.IRepositories;
using sd2376_workshop_backend.Core.IUnitOfWork;
using sd2376_workshop_backend.Extentions;
using sd2376_workshop_backend.Models;
using sd2376_workshop_backend.ViewModels.Login;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace sd2376_workshop_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly UserManager<Member> _userManager;
        private readonly SignInManager<Member> _signInManager;
        private readonly IUnitOfWork unitOfWork;
        private readonly IGenericRepository<Models.Member> repository;
        public DisplayOptions Options { get; }
        public IConfiguration Configuration { get; }

        public LoginController(IUnitOfWork unitOfWork, IOptions<DisplayOptions> optionsAccessor, IConfiguration configuration, UserManager<Member> userManager, SignInManager<Member> signInManager)
        {
            this.unitOfWork = unitOfWork;
            repository = unitOfWork.Repository<Models.Member>();
            Options = optionsAccessor.Value;
            Configuration = configuration;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel LoginModel)
        {
            IActionResult responseUserAccess = Unauthorized();
            if (ModelState.IsValid)
            {
                try
                {
                    Member member = await _userManager.FindByEmailAsync(LoginModel.Email);
                    if (member == null)
                    {
                        return NotFound("Username or password is incorrect");
                    }
                    var roles = await _userManager.GetRolesAsync(member);
                    var result = await _signInManager.PasswordSignInAsync(member, LoginModel.Password, false, lockoutOnFailure: false);
                    var isSucceeded = result.Succeeded;
                    if (isSucceeded)
                    {
                        var claims = new[]
                        {
                        new Claim(JwtRegisteredClaimNames.Sub, member.Id.ToString()),
                        new Claim(ClaimTypes.Role, string.Join(",", roles.ToArray())),
                        new Claim(JwtRegisteredClaimNames.Email, LoginModel.Email),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                        };

                        var token = new JwtSecurityToken
                        (
                                issuer: Configuration.GetSection("AppSettings:TokenAuthentication:Issuer").Value,
                                audience: Configuration.GetSection("AppSettings:TokenAuthentication:Audience").Value,
                                claims: claims,
                                expires: DateTime.UtcNow.AddMinutes(60),
                                notBefore: DateTime.UtcNow,
                                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetSection("AppSettings:TokenAuthentication:SecretKey").Value)),
                                     SecurityAlgorithms.HmacSha256)
                        );
                        responseUserAccess = Ok(new LoginFormResponse()
                        {
                            Id = member.Id,
                            Name = member.Name,
                            Email = member.Email,
                            token = new JwtSecurityTokenHandler().WriteToken(token)
                        });
                    }
                    else
                    {
                        responseUserAccess = NotFound("Username or password is incorrect");
                    }
                }
                catch
                {
                    responseUserAccess = BadRequest("Something went wrong");
                }
            }
            return responseUserAccess;
        }

        [HttpPost]
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var EmailName = model.Email.Trim();
                    var isExistUser = unitOfWork.Members.QueryMember().Any(x => x.Email.ToLower() == EmailName.ToLower());
                    if (isExistUser)
                    {
                        return BadRequest("Email already exists");
                    }

                    string passgen = model.Password;
                    Member member = new Member
                    {
                        Name = model.Name.Trim(),
                        Email = model.Email.Trim(),
                        EmailConfirmed = true,
                        IsActive = true,
                        UserName = model.Email.Trim(),
                    };

                    model.RoleIds.Add(1);//hard role at the momment
                    foreach (var id in model.RoleIds)
                    {
                        var userRole = new MemberRole
                        {
                            Member = member,
                            RoleId = id
                        };

                        member.Roles.Add(userRole);
                    }

                    var result = await _userManager.CreateAsync(member, passgen);
                    if (result.Succeeded)
                    {
                        return Ok(model);
                    }
                    return BadRequest(result.Errors.FirstOrDefault()?.Description);
                }
                catch(Exception ex)
                {
                    string Issuer = Configuration.GetSection("AppSettings:TokenAuthentication:Issuer")?.Value;
                    string connectionst = Configuration.GetConnectionString("DefaultConnection");
                    string connection = Configuration.GetSection("ConnectionStrings:DefaultConnection")?.Value;
                    string DefaultConnection = Configuration.GetSection("DefaultConnection")?.Value;
                    return BadRequest($"Issuer:{Issuer},ConST:{connectionst},connection:{connection},DefaultConnection:{DefaultConnection},ex:{ex}");
                }
            }

            return BadRequest("Invalid input");
        }

        //[AllowAnonymous]
        //[HttpPost]
        //public IActionResult CreateToken([FromBody] LoginModel login)
        //{
        //    var client = new RestClient("https://dev-alot9vrc.us.auth0.com/oauth/token");
        //    var request = new RestRequest(Method.POST);
        //    request.AddHeader("content-type", "application/json");
        //    request.AddParameter("application/json", "{\"client_id\":\"2STiFHhxhfT9q9dAtcOO2a7QEXxdmree\",\"client_secret\":\"8zyKV-q_Wn2psRE3VxTMpvnW3_G_cmGWfwUSVgGyqfq-zPeMXcoKWsPylhrAozk1\",\"audience\":\"https://sd2376-workshop-api\",\"grant_type\":\"client_credentials\"}", ParameterType.RequestBody);
        //    IRestResponse response = client.Execute(request);
        //    dynamic resp = JObject.Parse(response.Content);
        //    String token = resp.access_token;

        //    IActionResult responseUserAccess = Unauthorized();
        //    var user = Authenticate(login);

        //    if (user != null)
        //    {
        //        var tokenString = BuildToken(user);
        //        responseUserAccess = Ok(new LoginFormResponse
        //        {
        //            Id = 1,
        //            Name = "eddy",
        //            Address = "HCM",
        //            Position = "DEV",
        //            token = token
        //        });
        //    }
        //    else
        //    {
        //        responseUserAccess = NotFound("Username or password is incorrect");
        //    }

        //    return responseUserAccess;
        //}
    }
}
