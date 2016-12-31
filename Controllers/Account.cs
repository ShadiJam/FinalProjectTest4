using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Session;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

[Authorize]
[Route("/account")]
public class AccountController : Controller
{
    private readonly IAuthService auth;
    public AccountController(IAuthService auth){
        this.auth = auth;
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register([FromBody] UserView user)
    {
        if(!ModelState.IsValid)
            return BadRequest(ModelState.ToErrorObject());

        var errors = await auth.Register(user.Email, user.Password);
        if((errors ?? new List<string>()).Count() == 0)
            return Redirect("/account");
        
        foreach(var e in errors) ModelState.AddModelError("", e);
        return Ok(new {});
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] UserView user)
    {
        Console.WriteLine("hello this is the login");
        if(!ModelState.IsValid)
            return BadRequest(ModelState.ToErrorObject());

        string result = await auth.Login(user.Email, user.Password);
        Console.WriteLine(result);
        if(result == null){
            return Unauthorized();
        }

        return Ok(new {});
    }

}

public class UserView {
    [Required]
    [EmailAddress]
    public string Email {get;set;}
    [Required]
    [DataType(DataType.Password)]
    public string Password {get;set;}
}